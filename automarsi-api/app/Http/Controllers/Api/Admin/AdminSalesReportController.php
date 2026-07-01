<?php

namespace App\Http\Controllers\Api\Admin;

use App\Actions\Reports\BuildSalesReport;
use App\Http\Controllers\Controller;
use App\Services\SalesReportPdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdminSalesReportController extends Controller
{
    public function __invoke(
        Request $request,
        BuildSalesReport $buildSalesReport,
        SalesReportPdf $salesReportPdf
    ): Response {
        $report = $buildSalesReport->handle(
            $request->query('sales_range', 'month')
        );

        $filename = 'automarsi-sales-'.$report['range'].'-'.$report['starts_at'].'-'.$report['ends_at'].'.pdf';

        return response($salesReportPdf->make($report), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }
}
