"use client"

import Link from "next/link"
import { Info, Edit, Trash2, RefreshCw, Plus, Loader2 } from "lucide-react"
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
import { useFetchData, useDelete } from "@/hooks/useApi"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CountriesRatesPage() {
  const router = useRouter()
  const { data: countries, isLoading } = useFetchData("/admin/countries")
  const deleteCountryMutation = useDelete((id) => `/admin/countries/${id}`, "/admin/countries")

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this country? This action cannot be undone.")) {
      try {
        await deleteCountryMutation.mutateAsync(id)
      } catch (error) {
        // Handled by useApi
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

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
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase w-[80px]">Code</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Country</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Currency</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Exchange Rate</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Auto Update</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Status</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countries?.map((item) => (
                    <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
                      <TableCell className="py-4">
                        <span className="font-bold text-[13px] text-[#475f7b]">{item.country_code}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-[14px] text-[#475f7b]">{item.country_name}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center justify-center bg-[#e6f2ff] text-[#5A8DEE] px-3 py-1 rounded-md text-[12px] font-medium min-w-[80px]">
                          {item.currency_symbol} ({item.currency_code})
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[13px] text-[#475f7b]">
                            1{item.currency_symbol} = <span className="text-black">${Number(item.exchange_rate).toFixed(6)}</span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {item.auto_update ? (
                          <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider">
                            AUTO
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center bg-[#475f7b] text-white px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider">
                            MANUAL
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center justify-center text-white px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider ${item.status ? 'bg-[#00CFDD]' : 'bg-[#ff5b5c]'}`}>
                          {item.status ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link href={`/settings/countries/edit/${item.id}`}>
                            <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#5A8DEE] hover:bg-[#4778d9] border-0 shadow-none">
                              <Edit className="w-4 h-4 text-white" />
                            </Button>
                          </Link>
                          <Button disabled={deleteCountryMutation.isPending} onClick={() => handleDelete(item.id)} size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none">
                            <Trash2 className="w-4 h-4 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!countries || countries.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-10 text-center text-gray-500">
                        No countries found. Add a new country.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
