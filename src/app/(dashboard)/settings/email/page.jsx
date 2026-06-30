"use client"

import { useEffect } from "react"
import { Bell, Save, ArrowDownToLine, ArrowUpFromLine, Activity, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useFetchData, usePut } from "@/hooks/useApi"

const emailSettingsSchema = z.object({
  smtp_host: z.string().optional(),
  smtp_port: z.string().optional(),
  smtp_user: z.string().optional(),
  smtp_pass_encrypted: z.string().optional(),
  from_email: z.string().optional(),
  from_name: z.string().optional(),
  
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
  const { data: settingsData, isLoading: isLoadingSettings } = useFetchData("/admin/settings/email", "email-settings")
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
      }
      if (payload.smtp_port) {
        payload.smtp_port = parseInt(payload.smtp_port, 10)
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
            Manage your notification preferences
          </p>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          {isLoadingSettings ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              
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
    </div>
  )
}
