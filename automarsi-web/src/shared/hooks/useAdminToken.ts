import { useAuth } from '@clerk/clerk-react'

export function useAdminToken() {
  const { getToken, isLoaded, isSignedIn } = useAuth()

  async function getAdminToken() {
    if (!isLoaded || !isSignedIn) {
      throw new Error('Please sign in before continuing.')
    }

    const token = await getToken()

    if (!token) {
      throw new Error('Please sign in again before continuing.')
    }

    return token
  }

  return {
    isAuthReady: isLoaded && isSignedIn,
    getAdminToken,
  }
}