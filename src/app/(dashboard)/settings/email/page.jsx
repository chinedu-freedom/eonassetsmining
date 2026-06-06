"use client"

import { useState } from "react"
import { Mail, Server, Settings2, User, Bell, Save, ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

export default function EmailSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)

  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          
          {/* Section 1: Email Configuration */}
          <div className="mb-8">
            <h2 className="text-[1.1rem] font-medium text-[#475f7b] flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-[#475f7b]" />
              Email Configuration
            </h2>
            
            <div className="flex items-start gap-3">
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
                className="mt-1"
              />
              <div>
                <label className="text-[13px] font-bold text-[#475f7b] block mb-0.5">Email Notifications</label>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  When enabled, the system will send email notifications to users.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-8"></div>

          {/* Section 2: Email Service Provider */}
          <div className="mb-8">
            <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-6">
              <Server className="w-5 h-5" />
              Email Service Provider
            </h2>
            
            <div className="w-full md:w-1/2">
              <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Email Driver</label>
              <Select defaultValue="smtp">
                <SelectTrigger className="border-gray-200 h-10 w-full focus:ring-0">
                  <SelectValue placeholder="Select Driver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP (Gmail, Custom Domain, etc.)</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 3: SMTP Configuration */}
          <div className="mb-8 mt-12">
            <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5" />
              SMTP Configuration
            </h2>
            
            <div className="bg-[#00CFDD] text-white p-4 rounded-md mb-6 text-[13px] leading-relaxed">
              <p>
                <span className="font-bold">Gmail Users:</span> Use <span className="bg-white/20 px-1 py-0.5 rounded text-pink-100 font-mono">smtp.gmail.com</span> as host, port <span className="bg-white/20 px-1 py-0.5 rounded text-pink-100 font-mono">587</span>, and enable "Less secure app access" or use an App Password.
              </p>
              <p className="mt-1">
                <span className="font-bold">Custom Domain:</span> Use your hosting provider's SMTP settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">SMTP Host</label>
                <Input defaultValue="smtp.gmail.com" className="border-gray-200 h-10 text-[13px]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Port</label>
                <Input defaultValue="587" className="border-gray-200 h-10 text-[13px]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Encryption</label>
                <Select defaultValue="tls">
                  <SelectTrigger className="border-gray-200 h-10 w-full text-[13px] focus:ring-0">
                    <SelectValue placeholder="Select Encryption" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Username / Email</label>
                <Input defaultValue="kokchima@gmail.com" className="border-gray-200 h-10 text-[13px]" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Password / App Password</label>
                <Input type="password" defaultValue="password123" className="border-gray-200 h-10 text-[13px]" />
                <p className="text-[11px] text-gray-400 mt-1">Leave blank to keep existing password</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-8"></div>

          {/* Section 4: Sender Information */}
          <div className="mb-8">
            <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-6">
              <User className="w-5 h-5" />
              Sender Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">From Email Address</label>
                <Input defaultValue="mr.lucas341@gmail.com" className="border-gray-200 h-10 text-[13px]" />
                <p className="text-[11px] text-gray-400 mt-1">Leave blank to use SMTP username</p>
              </div>
              <div>
                <label className="text-[12px] font-medium text-[#475f7b] block mb-1">From Name</label>
                <Input defaultValue="mr.lucas341@gmail.com" className="border-gray-200 h-10 text-[13px]" />
                <p className="text-[11px] text-gray-400 mt-1">Leave blank to use site name</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-8"></div>

          {/* Section 5: Notification Preferences */}
          <div className="mb-10">
            <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h2>
            <p className="text-[13px] text-gray-500 mb-8">Select which events should trigger email notifications to users.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Deposit */}
              <div className="space-y-4">
                <h3 className="text-[13px] font-bold text-[#39DA8A] flex items-center gap-2 mb-4">
                  <ArrowDownToLine className="w-4 h-4" />
                  Deposit Notifications
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dep-proc" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="dep-proc" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Processing</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dep-appr" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="dep-appr" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Approved</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="dep-rej" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="dep-rej" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Rejected</label>
                </div>
              </div>

              {/* Withdrawal */}
              <div className="space-y-4">
                <h3 className="text-[13px] font-bold text-[#ff5b5c] flex items-center gap-2 mb-4">
                  <ArrowUpFromLine className="w-4 h-4" />
                  Withdrawal Notifications
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="with-proc" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="with-proc" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Processing</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="with-appr" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="with-appr" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Approved</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="with-rej" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="with-rej" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Rejected</label>
                </div>
              </div>

              {/* Other */}
              <div className="space-y-4">
                <h3 className="text-[13px] font-bold text-[#00CFDD] flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4" />
                  Other Notifications
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="oth-prof" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="oth-prof" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Profit Return</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="oth-cap" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="oth-cap" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Capital Return</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="oth-news" defaultChecked className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                  <label htmlFor="oth-news" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">News Updates</label>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-6 mt-8"></div>

          <div>
            <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-6 py-2 h-10 font-medium rounded-md shadow-sm border-0 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
