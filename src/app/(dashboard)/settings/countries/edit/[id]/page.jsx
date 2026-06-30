"use client"

import Link from "next/link"
import { ChevronLeft, Save, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, Controller } from "react-hook-form"
import { useFetchData, usePut } from "@/hooks/useApi"
import { toast } from "sonner"
import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"

export default function EditCountryPage() {
  const router = useRouter()
  const { id } = useParams()
  
  const { data: countryData, isLoading: isLoadingData } = useFetchData(`/admin/countries/${id}`)
  const updateCountryMutation = usePut(`/admin/countries/${id}`)
  
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      country_code: "",
      country_name: "",
      currency_symbol: "",
      currency_code: "",
      exchange_rate: 1,
      status: "active",
      auto_update: false
    }
  })

  useEffect(() => {
    if (countryData) {
      reset({
        country_code: countryData.country_code,
        country_name: countryData.country_name,
        currency_symbol: countryData.currency_symbol,
        currency_code: countryData.currency_code,
        exchange_rate: Number(countryData.exchange_rate),
        status: countryData.status ? "active" : "inactive",
        auto_update: countryData.auto_update
      })
    }
  }, [countryData, reset])

  const onSubmit = async (data) => {
    try {
      await updateCountryMutation.mutateAsync(data)
      // toast call removed per user
      router.push("/settings/countries")
    } catch (error) {
      // Handled by useApi
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Edit Country</h2>
            <Link href="/settings/countries">
              <Button type="button" className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-9 text-[13px] font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>

          <div className="p-8 space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Row 1 */}
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Country Code (ISO)</label>
                <Input {...register("country_code", { required: true })} placeholder="e.g. NG, IN, US" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
                <p className="text-[11px] text-gray-400 mt-1.5">2-letter ISO country code</p>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Country Name</label>
                <Input {...register("country_name", { required: true })} placeholder="e.g. Nigeria, India" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
              </div>

              {/* Row 2 */}
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Currency Symbol</label>
                <Input {...register("currency_symbol", { required: true })} placeholder="e.g. ₦, $, ₹" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Currency Code</label>
                <Input {...register("currency_code", { required: true })} placeholder="e.g. NGN, USD, INR" className="border-gray-200 h-10 text-[13px] placeholder:text-gray-400" />
              </div>

              {/* Row 3 */}
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Exchange Rate</label>
                <Input type="number" step="any" {...register("exchange_rate", { required: true, min: 0 })} className="border-gray-200 h-10 text-[13px]" />
                <p className="text-[11px] text-gray-400 mt-1.5">How much 1 unit of local currency equals in site currency</p>
              </div>
              <div>
                <label className="text-[13px] font-medium text-[#475f7b] block mb-1">Status</label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="border-gray-200 h-10 w-full text-[13px] focus:ring-0">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Auto Rate Update Section */}
            <div className="pt-2">
              <label className="text-[13px] font-medium text-[#475f7b] block mb-3">Auto Rate Update</label>
              <div className="flex items-start gap-2">
                <Controller
                  name="auto_update"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="auto-rate" 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#5A8DEE] data-[state=checked]:border-[#5A8DEE]" 
                    />
                  )}
                />
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
              <Button disabled={updateCountryMutation.isPending} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
                {updateCountryMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update Country
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>
      </form>
    </div>
  )
}
