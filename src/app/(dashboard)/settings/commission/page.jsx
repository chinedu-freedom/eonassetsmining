"use client"

import { Info, User, Users, Check, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ValidatedInput = ({ label, value, subText, icon: Icon, iconColor }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-[12px] font-bold text-[#475f7b] flex items-center gap-1.5 mb-1">
      {Icon && <Icon className={`w-4 h-4 ${iconColor}`} />}
      {label}
    </label>
    <div className="relative">
      <Input 
        defaultValue={value}
        className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 pr-10 text-gray-700 text-[13px]"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <Check className="w-5 h-5 text-blue-600" />
      </div>
    </div>
    {subText && (
      <p className="text-[11px] text-gray-400 mt-1">{subText}</p>
    )}
  </div>
)

export default function CommissionSettingsPage() {
  return (
    <div className="space-y-6 pb-10">
      {/* Update Commission Card */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          <h2 className="text-[1.1rem] font-medium text-[#475f7b] mb-6">Update Commission</h2>

          {/* Info Alert */}
          <div className="bg-[#00CFDD] text-white p-3.5 rounded-sm mb-8 flex items-center gap-3">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="text-[13px] font-medium">
              Configure referral commission percentages for 3 levels. Commission is calculated as a percentage of the referred user's investment earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValidatedInput 
              label="Level 1 Commission (%)" 
              value="10" 
              subText="Direct referrals" 
              icon={User}
              iconColor="text-[#5A8DEE]"
            />
            <ValidatedInput 
              label="Level 2 Commission (%)" 
              value="2" 
              subText="Referrals of referrals" 
              icon={Users}
              iconColor="text-blue-600"
            />
            <ValidatedInput 
              label="Level 3 Commission (%)" 
              value="1" 
              subText="Third level referrals" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Information Card */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-[1.1rem] font-medium text-[#475f7b]">Submit Your Information</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-10 font-medium rounded-sm-sm shadow-sm border-0 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
