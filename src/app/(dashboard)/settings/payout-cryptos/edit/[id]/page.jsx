"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { ArrowLeft, Check, Banknote, FileText, Settings, Image as ImageIcon, Plus, Loader2, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFetchData, usePut } from "@/hooks/useApi"
import { toast } from "sonner"

export default function EditPayoutCryptoPage({ params }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const router = useRouter()
  const [iconPreview, setIconPreview] = useState(null)
  
  const { data: crypto, isLoading } = useFetchData(id ? `/admin/settings/payout-cryptos/${id}` : null)
  const updateCryptoMutation = usePut((id) => `/admin/settings/payout-cryptos/${id}`, "/admin/settings/payout-cryptos")

  const { register, handleSubmit, control, formState: { errors }, setValue, watch, reset } = useForm({
    defaultValues: {
      name: "",
      symbol: "",
      network: "",
      network_name: "",
      min_amount: 10,
      max_amount: 100000,
      fee_percentage: 0,
      fixed_fee: 0,
      sort_order: 0,
      status: true
    }
  })

  useEffect(() => {
    if (crypto) {
      reset({
        name: crypto.name,
        symbol: crypto.symbol,
        network: crypto.network,
        network_name: crypto.network_name || "",
        min_amount: crypto.min_amount,
        max_amount: crypto.max_amount,
        fee_percentage: crypto.fee_percentage,
        fixed_fee: crypto.fixed_fee,
        sort_order: crypto.sort_order,
        status: String(crypto.status) === 'true'
      })
      if (crypto.icon) {
        setIconPreview(crypto.icon)
        setValue("icon", crypto.icon)
      }
    }
  }, [crypto, reset, setValue])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result)
        setValue("icon", reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      await updateCryptoMutation.mutateAsync({
        id,
        data: {
          ...data,
          symbol: data.symbol.toUpperCase(),
          network: data.network.toUpperCase(),
          min_amount: parseFloat(data.min_amount),
          max_amount: parseFloat(data.max_amount),
          fee_percentage: parseFloat(data.fee_percentage),
          fixed_fee: parseFloat(data.fixed_fee),
          sort_order: parseInt(data.sort_order),
          status: String(data.status) === 'true'
        }
      })
      router.push("/settings/payout-cryptos")
    } catch (error) {}
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
        <CardContent className="p-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Edit Payout Crypto</h2>
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
              <div className="flex flex-col space-y-1">
                <label className="text-[12px] font-bold text-[#475f7b]">
                  Crypto Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  {...register("name", { required: true })}
                  placeholder="e.g. Tether"
                  className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                />
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-blue-600">Full name of the cryptocurrency</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[12px] font-bold text-[#475f7b]">
                  Symbol <span className="text-red-500">*</span>
                </label>
                <Input 
                  {...register("symbol", { required: true })}
                  placeholder="e.g. USDT"
                  className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                />
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-blue-600">Ticker symbol (will be uppercased)</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[12px] font-bold text-[#475f7b]">
                  Network <span className="text-red-500">*</span>
                </label>
                <Input 
                  {...register("network", { required: true })}
                  placeholder="e.g. TRC20, ERC20, BEP20"
                  className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                />
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-blue-600">Blockchain network (will be uppercased)</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[12px] font-bold text-[#475f7b]">
                  Network Name
                </label>
                <Input 
                  {...register("network_name")}
                  placeholder="e.g. Tron Network, Ethereum"
                  className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                />
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-blue-600">Full name of the network (optional)</p>
                </div>
              </div>
              
              {/* Upload Icon */}
              <div className="flex flex-col space-y-1">
                <label className="text-[12px] font-bold text-[#475f7b]">
                  Upload Icon <span className="text-gray-400 font-normal">(Optional - 64x64px)</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 border border-blue-500 rounded-sm flex items-center h-10 overflow-hidden relative">
                    <Input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    <span className="px-3 text-[13px] text-gray-400 flex-1 truncate bg-white h-full flex items-center">
                      Choose file
                    </span>
                    <button type="button" className="bg-gray-100 border-l border-gray-200 px-4 h-full text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors shrink-0">
                      Browse
                    </button>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {iconPreview ? (
                      <img src={iconPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-gray-300" />
                    )}
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
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">
                    Minimum Amount <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="number"
                    step="any"
                    {...register("min_amount", { required: true })}
                    className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-blue-600">Minimum withdrawal amount</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">
                    Maximum Amount <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="number"
                    step="any"
                    {...register("max_amount", { required: true })}
                    className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-blue-600">Maximum withdrawal amount</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Settings */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <FileText className="w-5 h-5 text-[#5A8DEE]" />
                <h3 className="text-[1.1rem] font-medium text-[#5A8DEE]">Fee Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">
                    Fee Percentage <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="number"
                    step="any"
                    {...register("fee_percentage", { required: true })}
                    className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-blue-600">Percentage fee (0-100)</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">
                    Fixed Fee <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="number"
                    step="any"
                    {...register("fixed_fee", { required: true })}
                    className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-blue-600">Fixed fee amount added to percentage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <Settings className="w-5 h-5 text-[#5A8DEE]" />
                <h3 className="text-[1.1rem] font-medium text-[#5A8DEE]">Display Settings</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">Sort Order</label>
                  <Input 
                    type="number"
                    {...register("sort_order")}
                    className="border-blue-500 focus-visible:ring-0 focus-visible:border-blue-500 h-10 text-gray-700 text-[13px]"
                  />
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-blue-500 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-[11px] text-blue-600">Lower numbers appear first</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[12px] font-bold text-[#475f7b]">Status</label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select value={String(field.value)} onValueChange={(val) => field.onChange(val === 'true')}>
                        <SelectTrigger className="border-gray-200 h-10 w-full text-[13px] focus:ring-0">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Active</SelectItem>
                          <SelectItem value="false">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
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
          <Button 
            onClick={handleSubmit(onSubmit)}
            disabled={updateCryptoMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-10 font-medium rounded-sm shadow-sm border-0 flex items-center gap-2"
          >
            {updateCryptoMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Update
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
