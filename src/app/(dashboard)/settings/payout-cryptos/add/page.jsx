"use client"

import Link from "next/link"
import { ArrowLeft, Check, Banknote, FileText, Settings, Image as ImageIcon, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ValidatedInput = ({ label, required, placeholder, defaultValue, helperText, type = "text" }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-[12px] font-bold text-[#475f7b]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <Input 
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="border-[#39DA8A] focus-visible:ring-0 focus-visible:border-[#39DA8A] h-10 pr-10 text-gray-700 text-[13px]"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <Check className="w-5 h-5 text-[#39DA8A]" />
      </div>
    </div>
    {helperText && (
      <div className="flex items-center gap-1 mt-1">
        <div className="w-1.5 h-1.5 rounded-full border border-[#39DA8A] flex items-center justify-center">
          <div className="w-0.5 h-0.5 bg-[#39DA8A] rounded-full"></div>
        </div>
        <p className="text-[11px] text-[#39DA8A]">{helperText}</p>
      </div>
    )}
  </div>
)

export default function AddPayoutCryptoPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Create New Payout Crypto</h2>
            <Link href="/settings/payout-cryptos">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm shadow-sm border-0 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Payout Crypto List
              </Button>
            </Link>
          </div>

          <div className="space-y-8">
            
            {/* General Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <ValidatedInput 
                label="Crypto Name" 
                required 
                placeholder="e.g. Tether"
                helperText="Full name of the cryptocurrency"
              />
              <ValidatedInput 
                label="Symbol" 
                required 
                placeholder="e.g. USDT"
                helperText="Ticker symbol (will be uppercased)"
              />
              <ValidatedInput 
                label="Network" 
                required 
                placeholder="e.g. TRC20, ERC20, BEP20"
                helperText="Blockchain network (will be uppercased)"
              />
              <ValidatedInput 
                label="Network Name" 
                placeholder="e.g. Tron Network, Ethereum"
                helperText="Full name of the network (optional)"
              />
              
              {/* Upload Icon */}
              <div className="flex flex-col space-y-1">
                <label className="text-[12px] font-bold text-[#475f7b]">
                  Upload Icon <span className="text-gray-400 font-normal">(Optional - 64x64px)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 border border-[#39DA8A] rounded-sm flex items-center h-10 overflow-hidden relative">
                    <span className="px-3 text-[13px] text-gray-400 flex-1 truncate bg-white h-full flex items-center">
                      Choose file
                    </span>
                    <button className="bg-gray-100 border-l border-gray-200 px-4 h-full text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors shrink-0">
                      Browse
                    </button>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Amount Limits */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Banknote className="w-5 h-5 text-[#5A8DEE]" />
                <h3 className="text-[1.1rem] font-medium text-[#5A8DEE]">Amount Limits</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <ValidatedInput 
                  label="Minimum Amount" 
                  required 
                  defaultValue="10"
                  helperText="Minimum withdrawal amount"
                />
                <ValidatedInput 
                  label="Maximum Amount" 
                  required 
                  defaultValue="100000"
                  helperText="Maximum withdrawal amount"
                />
              </div>
            </div>

            {/* Fee Settings */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <FileText className="w-5 h-5 text-[#5A8DEE]" />
                <h3 className="text-[1.1rem] font-medium text-[#5A8DEE]">Fee Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <ValidatedInput 
                  label="Fee Percentage" 
                  required 
                  defaultValue="0"
                />
                <ValidatedInput 
                  label="Fixed Fee" 
                  required 
                  defaultValue="0"
                />
              </div>
            </div>

            {/* Display Settings */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Settings className="w-5 h-5 text-[#5A8DEE]" />
                <h3 className="text-[1.1rem] font-medium text-[#5A8DEE]">Display Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <ValidatedInput 
                  label="Sort Order" 
                  defaultValue="0"
                  helperText="Lower numbers appear first"
                />
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">Status</label>
                  <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-[13px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A8DEE] text-gray-700 appearance-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Submit Card */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-[1.1rem] font-medium text-[#475f7b]">Submit Payout Crypto</h2>
          <Button className="bg-[#39DA8A] hover:bg-[#2ebd75] text-white px-5 h-10 font-medium rounded-sm shadow-sm border-0 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
