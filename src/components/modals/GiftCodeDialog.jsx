"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Gift, Tag, Key, DollarSign, UserCheck, Save, Check } from "lucide-react";

const giftCodeSchema = z.object({
  codeName: z.string().min(2, "Code name is required"),
  giftCode: z.string().min(4, "Gift code is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  maxUses: z.coerce.number().min(1, "Max uses must be at least 1"),
});

export default function GiftCodeDialog({ open, setOpen, initialData }) {
  const isEdit = !!initialData?.id;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(giftCodeSchema),
    defaultValues: {
      codeName: "",
      giftCode: "",
      amount: "",
      maxUses: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        codeName: initialData.codeName || "",
        giftCode: initialData.giftCode || "",
        amount: initialData.amount || "",
        maxUses: initialData.maxUses || "",
      });
    } else {
      reset({
        codeName: "",
        giftCode: "",
        amount: "",
        maxUses: "",
      });
    }
  }, [initialData, reset]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setOpen(false);
    reset();
  };

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setValue("giftCode", code, { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-[#f8fafc]">
        {/* Header */}
        <div className="bg-white px-8 py-5 flex items-center justify-between border-b">
          <div className="flex items-center gap-2 text-[#5A8DEE]">
            <Gift className="w-5 h-5" />
            <DialogTitle className="text-xl font-medium text-gray-700">
              {isEdit ? "Edit Gift Code" : "Create New Gift Code"}
            </DialogTitle>
          </div>
          <DialogClose asChild>
            <Button variant="default" className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white flex items-center gap-2 px-4 py-2 h-auto">
              <ArrowLeft className="w-4 h-4" />
              Back To List
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border shadow-sm">
            
            {/* Code Name */}
            <div>
              <Label className="text-[#5A8DEE] text-sm mb-1.5 flex items-center gap-1.5 font-medium">
                <Tag className="w-4 h-4" />
                Code Name <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("codeName")}
                placeholder="e.g., Welcome Bonus, Holiday Gift"
                className="border-gray-200 h-11 focus-visible:ring-blue-400"
              />
              <p className="text-[12px] text-gray-400 mt-1.5">A friendly name to identify this gift code</p>
              {errors.codeName && <p className="text-red-500 text-xs mt-1">{errors.codeName.message}</p>}
            </div>

            {/* Gift Code */}
            <div>
              <Label className="text-[#5A8DEE] text-sm mb-1.5 flex items-center gap-1.5 font-medium">
                <Key className="w-4 h-4" />
                Gift Code <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center">
                <Input
                  {...register("giftCode")}
                  placeholder="e.g., WELCOME2024"
                  className="border-gray-200 h-11 rounded-r-none focus-visible:ring-blue-400"
                />
                <Button 
                  type="button" 
                  onClick={generateCode}
                  className="h-11 rounded-l-none bg-blue-50 text-[#5A8DEE] border border-l-0 border-gray-200 hover:bg-blue-100"
                >
                  Generate
                </Button>
              </div>
              <p className="text-[12px] text-gray-400 mt-1.5">The code users will enter to claim the reward</p>
              {errors.giftCode && <p className="text-red-500 text-xs mt-1">{errors.giftCode.message}</p>}
            </div>

            {/* Reward Amount */}
            <div>
              <Label className="text-[#39DA8A] text-sm mb-1.5 flex items-center gap-1.5 font-medium">
                <DollarSign className="w-4 h-4" />
                Reward Amount ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                step="0.01"
                {...register("amount")}
                placeholder="e.g., 10.00"
                className="border-gray-200 h-11 focus-visible:ring-green-400"
              />
              <p className="text-[12px] text-gray-400 mt-1.5">Amount credited to user's balance when code is redeemed</p>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
            </div>

            {/* Maximum Uses */}
            <div>
              <Label className="text-[#00CFDD] text-sm mb-1.5 flex items-center gap-1.5 font-medium">
                <UserCheck className="w-4 h-4" />
                Maximum Uses <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                {...register("maxUses")}
                placeholder="e.g., 100"
                className="border-gray-200 h-11 focus-visible:ring-cyan-400"
              />
              <p className="text-[12px] text-gray-400 mt-1.5">How many times this code can be used in total</p>
              {errors.maxUses && <p className="text-red-500 text-xs mt-1">{errors.maxUses.message}</p>}
            </div>
          </div>

          {/* Footer Area inside form */}
          <div className="bg-white p-6 rounded-lg border shadow-sm flex items-center justify-between mt-6">
            <div className="flex items-center gap-2 text-[#475f7b]">
              <Save className="w-5 h-5 text-[#39DA8A]" />
              <h3 className="text-[16px] font-medium">Save Gift Code</h3>
            </div>
            <Button
              type="submit"
              className="bg-[#39DA8A] hover:bg-[#2bbd74] text-white px-6 py-2 h-10 text-[15px] font-medium rounded-md shadow-sm border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-1.5" />
                  {isEdit ? "Update Code" : "Create Code"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
