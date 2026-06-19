"use client"

import { useState } from "react"
import { HeadphonesIcon, Settings2, Check, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const ValidatedInput = ({ label, value, requiredNote, subText, icon: Icon }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-[13px] font-medium text-[#475f7b]">{label}</label>
    <div className="relative">
      <Input 
        defaultValue={value}
        className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 pr-10 text-gray-700"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <Check className="w-5 h-5 text-blue-600" />
      </div>
    </div>
    {requiredNote && (
      <p className="text-[11px] text-blue-600 mt-1">○ Note: This is filed is required</p>
    )}
    {subText && (
      <p className="text-[11px] text-gray-400 mt-1">{subText}</p>
    )}
  </div>
)

const RichTextEditor = ({ label, defaultValue }) => (
  <div className="flex flex-col space-y-1 h-full">
    <label className="text-[13px] font-medium text-[#475f7b]">{label}</label>
    <div className="border border-gray-200 rounded-sm flex-1 flex flex-col">
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex flex-wrap gap-2 items-center text-gray-500 text-sm">
        <span className="font-bold px-1 cursor-pointer">B</span>
        <span className="italic px-1 cursor-pointer">I</span>
        <span className="underline px-1 cursor-pointer">U</span>
        <span className="line-through px-1 cursor-pointer">S</span>
        <div className="w-px h-4 bg-gray-300 mx-1"></div>
        <span className="text-xs px-1 cursor-pointer">Font Size...</span>
        <span className="text-xs px-1 cursor-pointer">Font Family</span>
      </div>
      <Textarea 
        className="border-0 focus-visible:ring-0 resize-none rounded-none flex-1 min-h-[120px] p-4 text-[13px] text-gray-600 leading-relaxed"
        defaultValue={defaultValue}
      />
    </div>
    <p className="text-[11px] text-blue-600 mt-1">○ Note: This is filed is optional</p>
  </div>
)

export default function BasicSettingsPage() {
  const [autoWithdraw, setAutoWithdraw] = useState(false)

  return (
    <div className="space-y-6 pb-10">
      
      {/* Section 1: Update Settings */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          <h2 className="text-[1.2rem] font-medium text-[#475f7b] mb-6">Update Settings</h2>
          
          {/* Logo Upload Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1">
              <label className="text-[13px] font-medium text-[#475f7b] flex items-center gap-1 mb-1">
                Platform Logo <span className="text-[11px] font-normal text-gray-400">(For header display)</span>
              </label>
              <div className="border border-gray-200 rounded-sm flex items-center h-10 w-full overflow-hidden">
                <button className="bg-gray-100 border-r border-gray-200 px-4 h-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                  Choose file
                </button>
                <span className="px-4 text-sm text-gray-400">No file chosen</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Suggested size: 48x48px (Square image)</p>
            </div>
            <div className="flex-1">
              <div className="w-24 h-24 bg-[#0a3161] rounded-md flex items-center justify-center p-2">
                <div className="w-full h-full border border-dashed border-blue-300/30 flex items-center justify-center relative">
                  {/* Mock logo representing the Eon Assets logo in screenshot */}
                  <div className="text-white flex flex-col items-center">
                    <div className="text-2xl font-bold">E</div>
                    <div className="text-[8px] tracking-widest mt-1">ASSETS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <ValidatedInput label="Site Name" value="EonAssets" requiredNote={true} />
            <ValidatedInput label="Site Title" value="Earn crypto on Eon Assets" requiredNote={true} />
            
            <ValidatedInput label="Currency Name" value="USD" requiredNote={true} />
            <ValidatedInput label="Currency Symbol" value="$" requiredNote={true} />
            
            <div className="flex flex-col space-y-1">
              <label className="text-[13px] font-medium text-[#475f7b]">Timezone</label>
              <Select defaultValue="utc">
                <SelectTrigger className="border-blue-500 focus:ring-0 h-10">
                  <SelectValue placeholder="Select Timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-blue-600 mt-1">○ Note: This is filed is required</p>
            </div>

            <ValidatedInput label="Registration Bonus" value="5.00" requiredNote={false} />

            <div className="flex flex-col space-y-1">
              <label className="text-[13px] font-medium text-[#475f7b]">Welcome Bonus Balance Destination</label>
              <Select defaultValue="gift">
                <SelectTrigger className="border-blue-500 focus:ring-0 h-10">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gift">Gift Balance</SelectItem>
                  <SelectItem value="main">Main Balance</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-gray-400 mt-1">Choose which balance the welcome bonus will be credited to</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Contact & Support Links */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-[1.2rem] font-medium text-[#5A8DEE] flex items-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              Contact & Support Links
            </h2>
            <p className="text-[12px] text-gray-400 mt-1">Configure support contact links displayed on the Help page</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <ValidatedInput 
              label="Telegram Support (Customer Service)" 
              value="https://t.me/" 
              subText="Direct link to your Telegram support account for customer inquiries" 
            />
            <ValidatedInput 
              label="WhatsApp Support" 
              value="https://t.me/" 
              subText="WhatsApp link for customer support (format: https://wa.me/phonenumber)" 
            />
            <ValidatedInput 
              label="Telegram Community Channel" 
              value="https://t.me/" 
              subText="Public Telegram channel for announcements and community updates" 
            />
            <ValidatedInput 
              label="Telegram Group Chat" 
              value="https://t.me/" 
              subText="Telegram group for community discussions and member interactions" 
            />
            
            <div className="mt-2 h-full">
              <RichTextEditor 
                label="Recharge Notice"
                defaultValue="1. Select the Network you wish to deposit.

2. Then go straight into your crypto wallet and transfer the amount you wish to deposit

3. Wait for the transfer to be successful and kindly refresh to receive your deposit straight into your balance automatically."
              />
            </div>

            <div className="mt-2 h-full">
              <RichTextEditor 
                label="Withdraw Notice"
                defaultValue="1. Fllow the below steps to make your withdrawal in the correct manner

2. Enter your wallet address to withdraw correctly

3. You can make minimum withdrawal of $5

4. Withdrawal may take 5 - 10 minutes with a 1.5% charges"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Deposit & Withdrawal Settings */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          <div className="mb-6">
            <h2 className="text-[1.2rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-4">
              <Settings2 className="w-5 h-5" />
              Deposit & Withdrawal Settings
            </h2>
            
            <div className="flex items-start gap-3">
              <Switch 
                checked={autoWithdraw} 
                onCheckedChange={setAutoWithdraw}
                className="mt-1"
              />
              <div>
                <label className="text-[13px] font-bold text-[#475f7b] block mb-0.5">Auto Withdrawal</label>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  If enabled, withdrawals will be automatically processed using the configured automatic gateway for the user's country. When disabled, all withdrawals will be queued for manual admin approval.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-8">
            <ValidatedInput 
              label="Deposit Bonus (%)" 
              value="2.00" 
              subText="Percentage bonus added to user deposits (0 = disabled)" 
            />
            <ValidatedInput 
              label="Daily Withdrawal Limit (times)" 
              value="4" 
              subText="How many times a user can withdraw per day" 
            />
            <ValidatedInput 
              label="Withdrawal Opening Time" 
              value="09:00 AM" 
              icon={Clock}
              subText="Time when withdrawals open (24-hour format)" 
            />
            <ValidatedInput 
              label="Withdrawal Closing Time" 
              value="10:00 PM" 
              icon={Clock}
              subText="Time when withdrawals close (24-hour format)" 
            />
            
            <div className="flex flex-col space-y-1">
              <label className="text-[13px] font-medium text-[#475f7b]">Require Investment to Withdraw</label>
              <Select defaultValue="yes">
                <SelectTrigger className="border-blue-500 focus:ring-0 h-10">
                  <SelectValue placeholder="Select Requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes - Users must have active investment</SelectItem>
                  <SelectItem value="no">No - Anyone can withdraw</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[11px] text-gray-400 mt-1">If enabled, users must have at least 1 active mining plan to withdraw</p>
            </div>

            <ValidatedInput 
              label="Minimum Investments Required" 
              value="1" 
              subText="Minimum number of active investments required to withdraw" 
            />
          </div>

          <div className="mt-10">
            <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-8 py-2 h-10 font-medium rounded-sm-sm shadow-sm border-0">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
