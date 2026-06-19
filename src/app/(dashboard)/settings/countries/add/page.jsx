"use client"

import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddCountryPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Add New Country</h2>
            <Link href="/settings/countries">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-9 text-[13px] font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" />
                , it 
              </Button>
            </Link>
          </div>

          <div className="p-8 space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Row 1 */}
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Country Code (ISO)</label>
                <Input placeholder="e.g. NG, IN, US" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
                <p className="text-[11px] text-gray-400 mt-1.5">2-letter ISO country code</p>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Country Name</label>
                <Input placeholder="e.g. Nigeria, India" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
              </div>

              {/* Row 2 */}
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Currency Symbol</label>
                <Input placeholder="e.g. ₦, $, ₹" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Currency Code</label>
                <Input placeholder="e.g. NGN, USD, INR" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
              </div>

              {/* Row 3 */}
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Exchange Rate</label>
                <Input defaultValue="1" className="border-gray-200 h-10 text-[13px]" />
                <p className="text-[11px] text-gray-400 mt-1.5">How much 1 unit of local currency equals in site currency</p>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Status</label>
                <Select defaultValue="active">
                  <SelectTrigger className="border-gray-200 h-10 w-full text-[13px] focus:ring-0">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Auto Rate Update Section */}
            <div className="pt-2">
              <label className="text-[13px] font-medium text-[#475f7b] block mb-3">Auto Rate Update</label>
              <div className="flex items-start gap-2">
                <Checkbox id="auto-rate" className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:border-[#5A8DEE]" />
                <div className="grid gap-1">
                  <label htmlFor="auto-rate" className="text-[13px] font-bold text-[#475f7b] leading-none cursor-pointer">
                    Enable automatic exchange rate updates
                  </label>
                  <p className="text-[11px] text-gray-400">
                    When enabled, exchange rate will be fetched automatically from live APIs
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Country
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
