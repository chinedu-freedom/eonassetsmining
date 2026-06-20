"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, ArrowLeft, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useFetchData, usePut } from "@/hooks/useApi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.enum(["BANK", "CRYPTO", "OTHER"], { required_error: "Type is required" }),
  min_amount: z.coerce.number().min(0, "Minimum amount must be positive"),
  max_amount: z.coerce.number().min(0, "Maximum amount must be positive"),
  charges: z.coerce.number().min(0, "Charges must be positive"),
  status: z.boolean().default(true),
  instructions: z.string().optional().nullable()
}).refine(data => data.max_amount > data.min_amount, {
  message: "Max amount must be greater than min amount",
  path: ["max_amount"]
})

export default function EditPayoutMethodPage({ params }) {
  const router = useRouter()
  const id = params.id
  const { data: method, isLoading: isFetching } = useFetchData(id ? `/admin/settings/payment-methods/${id}` : null)
  const updateMethodMutation = usePut(`/admin/settings/payment-methods/${id}`, "/admin/settings/payment-methods")

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "BANK",
      min_amount: 10,
      max_amount: 10000,
      charges: 0,
      status: true,
      instructions: ""
    }
  })

  useEffect(() => {
    if (method) {
      reset({
        name: method.name,
        type: method.type,
        min_amount: method.min_amount,
        max_amount: method.max_amount,
        charges: method.charges,
        status: String(method.status) === 'true',
        instructions: method.instructions || ""
      })
    }
  }, [method, reset])

  const onSubmit = async (data) => {
    try {
      await updateMethodMutation.mutateAsync(data)
      router.push("/settings/payout-methods")
    } catch (error) {
      // Error handled by usePut
    }
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          <h2 className="text-[1.2rem] font-medium text-[#475f7b] mb-8">Edit Payout Method</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Name <span className="text-red-500">*</span></label>
                <Input 
                  {...register("name")}
                  placeholder="e.g. Bank Transfer" 
                  className="h-10 text-[13px] border-gray-200 focus-visible:ring-0"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Type <span className="text-red-500">*</span></label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="border-gray-200 h-10 w-full text-[13px] focus:ring-0">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BANK">Bank</SelectItem>
                        <SelectItem value="CRYPTO">Crypto</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && <span className="text-red-500 text-xs">{errors.type.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Minimum Amount <span className="text-red-500">*</span></label>
                <Input 
                  {...register("min_amount")}
                  type="number"
                  step="0.01"
                  className="h-10 text-[13px] border-gray-200 focus-visible:ring-0"
                />
                {errors.min_amount && <span className="text-red-500 text-xs">{errors.min_amount.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Maximum Amount <span className="text-red-500">*</span></label>
                <Input 
                  {...register("max_amount")}
                  type="number"
                  step="0.01"
                  className="h-10 text-[13px] border-gray-200 focus-visible:ring-0"
                />
                {errors.max_amount && <span className="text-red-500 text-xs">{errors.max_amount.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Charges (%) <span className="text-red-500">*</span></label>
                <Input 
                  {...register("charges")}
                  type="number"
                  step="0.01"
                  className="h-10 text-[13px] border-gray-200 focus-visible:ring-0"
                />
                {errors.charges && <span className="text-red-500 text-xs">{errors.charges.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Instructions</label>
                <Textarea 
                  {...register("instructions")}
                  placeholder="Provide any instructions to the user regarding this payout method..."
                  className="min-h-[100px] text-[13px] border-gray-200 focus-visible:ring-0"
                />
                {errors.instructions && <span className="text-red-500 text-xs">{errors.instructions.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[12px] font-bold text-[#475f7b]">Status <span className="text-red-500">*</span></label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={String(field.value)} onValueChange={(val) => field.onChange(val === 'true')}>
                      <SelectTrigger className="border-gray-200 h-10 w-full text-[13px] focus:ring-0">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && <span className="text-red-500 text-xs">{errors.status.message}</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-8 pb-4">
              <Button disabled={updateMethodMutation.isPending} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 font-medium rounded-sm-sm shadow-sm border-0 flex items-center gap-2">
                {updateMethodMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update Payout Method
              </Button>
              <Link href="/settings/payout-methods">
                <Button type="button" className="bg-[#475f7b] hover:bg-[#394c63] text-white px-6 h-10 font-medium rounded-sm-sm shadow-sm border-0 flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to List
                </Button>
              </Link>
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  )
}
