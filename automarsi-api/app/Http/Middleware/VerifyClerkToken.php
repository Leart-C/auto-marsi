<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class VerifyClerkToken
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if(! $token){
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $stage = 'load_signing_keys';

        try {
            $jwks = Cache::remember('clerk_jwks', now()->addHour(), function () {
                return Http::get(config('clerk.jwks_url'))->json();
            });

            $stage = 'verify_token';
            $payload = JWT::decode($token, JWK::parseKeySet($jwks));

            $stage = 'sync_user';
            $user = User::updateOrCreate(
                ['clerk_id' => $payload->sub],
                [
                    'email' => $payload->email ?? null,
                    'name' => $payload->name ?? 'Clerk User',
                ]
            );

            $stage = 'assign_admin_role';
            $adminEmails = collect(explode(',', config('automarsi.admin_emails', '')))
                ->map(fn ($email) => strtolower(trim($email)))
                ->filter();

            $adminClerkIds = collect(explode(',', config('automarsi.admin_clerk_ids', '')))
                ->map(fn ($id) => trim($id))
                ->filter();

            if (
                ($user->email && $adminEmails->contains(strtolower($user->email))) ||
                $adminClerkIds->contains($user->clerk_id)
            ) {
                $user->forceFill(['role' => 'admin'])->save();
            }

            $stage = 'set_authenticated_user';
            Auth::setUser($user);
        } catch (Throwable $exception) {
            // Exception messages and traces can contain tokens or database values.
            Log::warning('Clerk authentication failed', [
                'stage' => $stage,
                'exception_type' => $exception::class,
                'error_code' => $exception->getCode(),
            ]);

            return response()->json(['message' => 'Invalid token.'], 401);
        }

        return $next($request);
    }
}
