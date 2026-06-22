"use client"

import { useState, useEffect } from "react"
import { Mail, Server, Settings2, User, Bell, Save, ArrowDownToLine, ArrowUpFromLine, Activity, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useFetchData, usePut } from "@/hooks/useApi"
import { cn } from "@/lib/utils"

const emailSettingsSchema = z.object({
  smtp_host: z.string().min(1, "SMTP Host is required"),
  smtp_port: z.string().min(1, "Port is required"),
  smtp_user: z.string().min(1, "SMTP Username/Email is required"),
  smtp_pass_encrypted: z.string().optional(),
  from_email: z.string().email("Invalid email format").min(1, "From Email is required"),
  from_name: z.string().min(1, "From Name is required"),
  
  notify_deposit_processing: z.boolean(),
  notify_deposit_approved: z.boolean(),
  notify_deposit_rejected: z.boolean(),
  notify_withdrawal_processing: z.boolean(),
  notify_withdrawal_approved: z.boolean(),
  notify_withdrawal_rejected: z.boolean(),
  notify_news_update: z.boolean(),
  notify_profit_return: z.boolean(),
  notify_capital_return: z.boolean(),
})

export default function EmailSettingsPage() {
  const [activeTab, setActiveTab] = useState("settings")
  const { data: settingsData, isLoading: isLoadingSettings } = useFetchData("/admin/settings/email", "email-settings")
  const { data: logsData, isLoading: isLoadingLogs } = useFetchData("/admin/settings/email/logs", "email-logs")
  const updateSettingsMutation = usePut("/admin/settings/email", "email-settings")

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtp_host: "smtp.gmail.com",
      smtp_port: "587",
      smtp_user: "",
      smtp_pass_encrypted: "",
      from_email: "",
      from_name: "",
      notify_deposit_processing: true,
      notify_deposit_approved: true,
      notify_deposit_rejected: true,
      notify_withdrawal_processing: true,
      notify_withdrawal_approved: true,
      notify_withdrawal_rejected: true,
      notify_news_update: true,
      notify_profit_return: true,
      notify_capital_return: true,
    }
  })

  useEffect(() => {
    if (settingsData && settingsData.id) {
      reset({
        smtp_host: settingsData.smtp_host || "",
        smtp_port: settingsData.smtp_port ? String(settingsData.smtp_port) : "",
        smtp_user: settingsData.smtp_user || "",
        smtp_pass_encrypted: "", // keep blank unless updating
        from_email: settingsData.from_email || "",
        from_name: settingsData.from_name || "",
        notify_deposit_processing: settingsData.notify_deposit_processing ?? true,
        notify_deposit_approved: settingsData.notify_deposit_approved ?? true,
        notify_deposit_rejected: settingsData.notify_deposit_rejected ?? true,
        notify_withdrawal_processing: settingsData.notify_withdrawal_processing ?? true,
        notify_withdrawal_approved: settingsData.notify_withdrawal_approved ?? true,
        notify_withdrawal_rejected: settingsData.notify_withdrawal_rejected ?? true,
        notify_news_update: settingsData.notify_news_update ?? true,
        notify_profit_return: settingsData.notify_profit_return ?? true,
        notify_capital_return: settingsData.notify_capital_return ?? true,
      })
    }
  }, [settingsData, reset])

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        smtp_port: parseInt(data.smtp_port, 10),
      }
      if (!payload.smtp_pass_encrypted) {
        delete payload.smtp_pass_encrypted // Don't overwrite with empty string
      }
      await updateSettingsMutation.mutateAsync(payload)
    } catch (error) {
      // Handled by hook
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Email Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your SMTP settings and notification preferences
          </p>
        </div>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-md w-fit mb-4">
        <button
          onClick={() => setActiveTab("settings")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm transition-all",
            activeTab === "settings"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Settings2 className="w-4 h-4" />
          Settings
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-sm transition-all",
            activeTab === "logs"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Activity className="w-4 h-4" />
          Email Logs
        </button>
      </div>

      {activeTab === "settings" && (
        <Card className="border-none shadow-sm bg-white rounded-md">
          <CardContent className="p-8">
            {isLoadingSettings ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* SMTP Configuration */}
                <div className="mb-8">
                  <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-6">
                    <Server className="w-5 h-5" />
                    SMTP Configuration
                  </h2>
                  
                  <div className="bg-[#00CFDD] text-white p-4 rounded-md mb-6 text-[13px] leading-relaxed">
                    <p>
                      <span className="font-bold">Gmail Users:</span> Use <span className="bg-white/20 px-1 py-0.5 rounded text-pink-100 font-mono">smtp.gmail.com</span> as host, port <span className="bg-white/20 px-1 py-0.5 rounded text-pink-100 font-mono">587</span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">SMTP Host</label>
                      <Input {...register("smtp_host")} className="border-gray-200 h-10 text-[13px]" />
                      {errors.smtp_host && <span className="text-xs text-red-500">{errors.smtp_host.message}</span>}
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Port</label>
                      <Input {...register("smtp_port")} className="border-gray-200 h-10 text-[13px]" />
                      {errors.smtp_port && <span className="text-xs text-red-500">{errors.smtp_port.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Username / Email</label>
                      <Input {...register("smtp_user")} className="border-gray-200 h-10 text-[13px]" />
                      {errors.smtp_user && <span className="text-xs text-red-500">{errors.smtp_user.message}</span>}
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Password / App Password</label>
                      <Input type="password" {...register("smtp_pass_encrypted")} className="border-gray-200 h-10 text-[13px]" />
                      <p className="text-[11px] text-gray-400 mt-1">Leave blank to keep existing password</p>
                      {errors.smtp_pass_encrypted && <span className="text-xs text-red-500">{errors.smtp_pass_encrypted.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full mb-8"></div>

                {/* Sender Information */}
                <div className="mb-8">
                  <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-6">
                    <User className="w-5 h-5" />
                    Sender Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">From Email Address</label>
                      <Input {...register("from_email")} className="border-gray-200 h-10 text-[13px]" />
                      {errors.from_email && <span className="text-xs text-red-500">{errors.from_email.message}</span>}
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">From Name</label>
                      <Input {...register("from_name")} className="border-gray-200 h-10 text-[13px]" />
                      {errors.from_name && <span className="text-xs text-red-500">{errors.from_name.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full mb-8"></div>

                {/* Notification Preferences */}
                <div className="mb-10">
                  <h2 className="text-[1.1rem] font-medium text-[#5A8DEE] flex items-center gap-2 mb-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </h2>
                  <p className="text-[13px] text-gray-500 mb-8">Select which events should trigger email notifications to users.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Deposit */}
                    <div className="space-y-4">
                      <h3 className="text-[13px] font-bold text-blue-600 flex items-center gap-2 mb-4">
                        <ArrowDownToLine className="w-4 h-4" />
                        Deposit Notifications
                      </h3>
                      <Controller name="notify_deposit_processing" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="dep-proc" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="dep-proc" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Processing</label>
                        </div>
                      )} />
                      <Controller name="notify_deposit_approved" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="dep-appr" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="dep-appr" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Approved</label>
                        </div>
                      )} />
                      <Controller name="notify_deposit_rejected" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="dep-rej" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="dep-rej" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Rejected</label>
                        </div>
                      )} />
                    </div>

                    {/* Withdrawal */}
                    <div className="space-y-4">
                      <h3 className="text-[13px] font-bold text-[#ff5b5c] flex items-center gap-2 mb-4">
                        <ArrowUpFromLine className="w-4 h-4" />
                        Withdrawal Notifications
                      </h3>
                      <Controller name="notify_withdrawal_processing" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="with-proc" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="with-proc" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Processing</label>
                        </div>
                      )} />
                      <Controller name="notify_withdrawal_approved" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="with-appr" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="with-appr" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Approved</label>
                        </div>
                      )} />
                      <Controller name="notify_withdrawal_rejected" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="with-rej" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="with-rej" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Rejected</label>
                        </div>
                      )} />
                    </div>

                    {/* Other */}
                    <div className="space-y-4">
                      <h3 className="text-[13px] font-bold text-[#00CFDD] flex items-center gap-2 mb-4">
                        <Activity className="w-4 h-4" />
                        Other Notifications
                      </h3>
                      <Controller name="notify_profit_return" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="oth-prof" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="oth-prof" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Profit Return</label>
                        </div>
                      )} />
                      <Controller name="notify_capital_return" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="oth-cap" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="oth-cap" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">Capital Return</label>
                        </div>
                      )} />
                      <Controller name="notify_news_update" control={control} render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="oth-news" checked={field.value} onCheckedChange={field.onChange} className="border-[#5A8DEE] data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:text-white rounded-[4px]" />
                          <label htmlFor="oth-news" className="text-[13px] font-medium text-[#475f7b] cursor-pointer">News Updates</label>
                        </div>
                      )} />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-100 w-full mb-6 mt-8"></div>

                <div>
                  <Button type="submit" disabled={updateSettingsMutation.isPending} className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-6 py-2 h-10 font-medium rounded-sm shadow-sm border-0 flex items-center gap-2">
                    {updateSettingsMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Settings
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "logs" && (
        <Card className="border-none shadow-sm bg-white rounded-md">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Recent Email Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingLogs ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border border-gray-100">
                <Table>
                  <TableHeader className="bg-gray-50/50">
                    <TableRow>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipient</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logsData && logsData.length > 0 ? (
                      logsData.map((log) => (
                        <TableRow key={log.id} className="hover:bg-gray-50/50">
                          <TableCell className="text-[13px] text-gray-600">
                            {format(new Date(log.sent_at), "MMM dd, yyyy HH:mm")}
                          </TableCell>
                          <TableCell className="text-[13px] font-medium text-gray-800">
                            <div>{log.recipient}</div>
                            <div className="text-[11px] text-gray-500 font-normal">{log.user?.full_name}</div>
                          </TableCell>
                          <TableCell className="text-[13px] text-gray-700">
                            {log.subject}
                          </TableCell>
                          <TableCell className="text-[13px] text-gray-600">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded capitalize text-xs">{log.email_type.replace('_', ' ')}</span>
                          </TableCell>
                          <TableCell>
                            {log.status === "sent" || log.status === "success" ? (
                              <span className="inline-flex items-center justify-center bg-green-100 text-green-700 px-3 py-1 rounded-[4px] text-[11px] font-medium">Sent</span>
                            ) : (
                              <span className="inline-flex items-center justify-center bg-red-100 text-red-700 px-3 py-1 rounded-[4px] text-[11px] font-medium" title={log.error_msg}>Failed</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No email logs found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
