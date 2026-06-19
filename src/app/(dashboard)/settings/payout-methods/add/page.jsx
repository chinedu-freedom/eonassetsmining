"use client"

import Link from "next/link"
import { Info, Save, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const FormField = ({ label, required, placeholder, type = "text", helperText, defaultValue, className = "" }) => (
  <div className="flex flex-col space-y-1.5">
    <label className="text-[12px] font-bold text-[#475f7b]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Input 
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`h-10 text-[13px] border-gray-200 focus-visible:ring-[#5A8DEE] ${className}`}
    />
    {helperText && <p className="text-[11px] text-gray-400 mt-1">{helperText}</p>}
  </div>
)

const SelectField = ({ label, required, options, helperText }) => (
  <div className="flex flex-col space-y-1.5">
    <label className="text-[12px] font-bold text-[#475f7b]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[13px] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A8DEE] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-700 appearance-none">
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
    {helperText && <p className="text-[11px] text-gray-400 mt-1">{helperText}</p>}
  </div>
)

export default function AddPayoutMethodPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          <h2 className="text-[1.2rem] font-medium text-[#475f7b] mb-8">Create New Payout Method</h2>

          <div className="space-y-8">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Method Name" 
                required 
                placeholder="e.g. Bank Transfer" 
              />
              <FormField 
                label="Display Name" 
                defaultValue="eonassetsmining@gmail.com"
                className="bg-[#e9f2ff] border-blue-100 text-gray-700"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField 
                label="Gateway Type" 
                required 
                options={["Manual (Admin Approval)", "Automatic"]}
                helperText="Manual requires admin approval. Auto gateways process withdrawals automatically."
              />
              <SelectField 
                label="Method Type" 
                required 
                options={["Bank Transfer", "Cryptocurrency"]}
                helperText="Bank Transfer or Cryptocurrency withdrawal"
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField 
                label="Minimum Payout" 
                required 
                defaultValue="100" 
              />
              <FormField 
                label="Maximum Payout" 
                required 
                defaultValue="100000" 
              />
              <FormField 
                label="Payout Charge (%)" 
                required 
                defaultValue="0" 
              />
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Exchange Rate" 
                defaultValue="1" 
                helperText="Rate to convert site currency to local currency (e.g., 1 USD = 1500 NGN, enter 1500)"
              />
            </div>

            {/* Info Alert */}
            <div className="bg-[#00CFDD] text-white p-4 rounded-sm flex items-start gap-3 w-full md:w-[60%] lg:w-[50%]">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] font-medium leading-relaxed">
                If your site uses USD and you want to pay users in local currency (e.g., NGN), set the exchange rate here. The user will see "You will receive: X NGN" when withdrawing.
              </p>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                label="Currency Symbol" 
                defaultValue="$" 
              />
              <FormField 
                label="Currency Code" 
                defaultValue="USD" 
              />
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Method Icon</label>
                <div className="border border-gray-200 rounded-sm flex items-center h-10 w-full overflow-hidden">
                  <button className="bg-gray-100 border-r border-gray-200 px-3 h-full text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors shrink-0">
                    Choose file
                  </button>
                  <span className="px-3 text-[13px] text-gray-400 truncate">No file chosen</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Upload an icon for this payment method (PNG, JPG, SVG)</p>
              </div>

              <FormField 
                label="Tag" 
                placeholder="e.g. Popular" 
              />
            </div>

            {/* Available Countries Checkbox */}
            <div className="flex flex-col space-y-2 pt-2">
              <label className="text-[12px] font-bold text-[#475f7b]">Available Countries</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="allCountries" 
                  defaultChecked
                  className="w-4 h-4 text-[#5A8DEE] rounded border-gray-300 focus:ring-[#5A8DEE]"
                />
                <label htmlFor="allCountries" className="text-[13px] text-[#475f7b] font-medium cursor-pointer">
                  All Countries
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-8 pb-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 font-medium rounded-sm-sm shadow-sm border-0 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Create Payout Method
              </Button>
              <Link href="/settings/payout-methods">
                <Button className="bg-[#475f7b] hover:bg-[#394c63] text-white px-6 h-10 font-medium rounded-sm-sm shadow-sm border-0 flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to List
                </Button>
              </Link>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}
