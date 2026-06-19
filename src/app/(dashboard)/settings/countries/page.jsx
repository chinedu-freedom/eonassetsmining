"use client"

import Link from "next/link"
import { Info, Edit, Trash2, RefreshCw, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const countriesData = [
  { code: "AF", country: "Afghanistan", currency: "؋ (AFN)", rate: "1؋ = $0.015761", updated: "Updated: 1 second ago", auto: true, status: "ACTIVE" },
  { code: "AL", country: "Albania", currency: "L (ALL)", rate: "1L = $0.012177", updated: "Updated: 2 weeks ago", auto: true, status: "ACTIVE" },
  { code: "DZ", country: "Algeria", currency: "د.ج (DZD)", rate: "1د.ج = $0.007546", updated: "Updated: 2 weeks ago", auto: true, status: "ACTIVE" },
  { code: "AD", country: "Andorra", currency: "€ (EUR)", rate: "1€ = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "AO", country: "Angola", currency: "AOA (AOA)", rate: "1AOA = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "AR", country: "Argentina", currency: "$ (ARS)", rate: "1$ = $0.000717", updated: "Updated: 2 weeks ago", auto: true, status: "ACTIVE" },
  { code: "AM", country: "Armenia", currency: "֏ (AMD)", rate: "1֏ = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "AU", country: "Australia", currency: "A$ (AUD)", rate: "1A$ = $0.650000", updated: "", auto: false, status: "ACTIVE" },
  { code: "AT", country: "Austria", currency: "€ (EUR)", rate: "1€ = $1.080000", updated: "", auto: false, status: "ACTIVE" },
  { code: "AZ", country: "Azerbaijan", currency: "₼ (AZN)", rate: "1₼ = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "BS", country: "Bahamas", currency: "$ (BSD)", rate: "1$ = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "BH", country: "Bahrain", currency: ".د.ب (BHD)", rate: "1.د.ب = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "BD", country: "Bangladesh", currency: "৳ (BDT)", rate: "1৳ = $1.000000", updated: "Updated: 2 weeks ago", auto: false, status: "ACTIVE" },
  { code: "BY", country: "Belarus", currency: "BR (BYN)", rate: "1Br = $1.000000", updated: "", auto: false, status: "ACTIVE" },
  { code: "BE", country: "Belgium", currency: "€ (EUR)", rate: "1€ = $1.080000", updated: "", auto: false, status: "ACTIVE" },
  { code: "BZ", country: "Belize", currency: "BZ$ (BZD)", rate: "1BZ$ = $1.000000", updated: "", auto: false, status: "ACTIVE" },
]

export default function CountriesRatesPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Country & Currency Management</h2>
            <div className="flex items-center gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 font-medium rounded-sm-[4px] shadow-sm border-0">
                Update All Rates
              </Button>
              <Link href="/settings/countries/add">
                <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Country
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-6">
            {/* Info Alert */}
            <div className="bg-[#00CFDD] text-white p-4 rounded-md mb-6 flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-[13px] leading-relaxed">
                <p>
                  <span className="font-bold">Exchange Rate:</span> Set how much 1 unit of local currency equals in site currency.
                </p>
                <p>
                  <span className="font-bold">Example:</span> If 1 NGN = 0.00065 USD, enter 0.00065 as the exchange rate.
                </p>
                <p>
                  <span className="font-bold">Auto Update:</span> Enable to automatically fetch real-time rates from exchange rate APIs.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table className="min-w-[1000px] whitespace-nowrap">
                <TableHeader className="min-w-[1000px] whitespace-nowrap">
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent min-w-[1000px] whitespace-nowrap">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase w-[80px] min-w-[1000px] whitespace-nowrap">Code</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Country</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Currency</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Exchange Rate</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Auto Update</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Status</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase text-right min-w-[1000px] whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="min-w-[1000px] whitespace-nowrap">
                  {countriesData.map((item, index) => (
                    <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group min-w-[1000px] whitespace-nowrap">
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="font-bold text-[13px] text-[#475f7b]">{item.code}</span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="text-[14px] text-[#475f7b]">{item.country}</span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="inline-flex items-center justify-center bg-[#e6f2ff] text-[#5A8DEE] px-3 py-1 rounded-md text-[12px] font-medium min-w-[80px]">
                          {item.currency}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-[13px] text-[#475f7b]">
                            {item.rate.split('=')[0]}= <span className="text-black">{item.rate.split('=')[1]}</span>
                          </span>
                          {item.updated && (
                            <span className="text-[11px] text-gray-400 mt-0.5">{item.updated}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        {item.auto ? (
                          <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider">
                            AUTO
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center bg-[#475f7b] text-white px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider">
                            MANUAL
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right min-w-[1000px] whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#00CFDD] hover:bg-[#00b5c2] border-0 shadow-none">
                            <RefreshCw className="w-4 h-4 text-white" />
                          </Button>
                          <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#5A8DEE] hover:bg-[#4778d9] border-0 shadow-none">
                            <Edit className="w-4 h-4 text-white" />
                          </Button>
                          <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none">
                            <Trash2 className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
