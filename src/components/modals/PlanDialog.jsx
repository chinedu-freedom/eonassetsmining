"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Camera } from "lucide-react";
import { usePost, usePatch } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";

// ✅ Schema matching the image
const planSchema = z.object({
  title: z.string().min(3, "Plan name is required"),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day"),
  dailyReturn: z.coerce.number().min(0.01, "Daily return is required"),
  minInvestment: z.coerce.number().min(1, "Min investment is required"),
  maxInvestment: z.coerce.number().min(1, "Max investment is required"),
  returnCapital: z.enum(["yes", "no"]),
  status: z.enum(["active", "inactive"]),
});

export default function PlanDialog({ open, setOpen, initialData }) {
  const queryClient = useQueryClient();
  const isEdit = !!initialData?._id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(planSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      dailyReturn: 1.2,
      minInvestment: 10,
      maxInvestment: 10000,
      returnCapital: "yes",
      status: "active",
    },
  });

  // Calculate yield
  const duration = watch("duration") || 0;
  const dailyReturn = watch("dailyReturn") || 0;
  const totalYield = (duration * dailyReturn).toFixed(1);

  // ✅ Populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        duration: initialData.duration || initialData.contractDuration || 30,
        dailyReturn: initialData.dailyReturn || initialData.dailyProfit || 1.2,
        minInvestment: initialData.minInvestment || initialData.minDeposit || 10,
        maxInvestment: initialData.maxInvestment || initialData.maxDeposit || 10000,
        returnCapital: initialData.returnCapital || "yes",
        status: initialData.status?.toLowerCase() === "inactive" ? "inactive" : "active",
      });
    }
  }, [initialData, reset]);

  const returnCapital = watch("returnCapital");
  const status = watch("status");

  // Mocking API for now since we're using dummy data
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (data.maxInvestment < data.minInvestment) {
      setError("maxInvestment", {
        type: "manual",
        message: "Max investment must be ≥ min investment",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-[#f8fafc]">
        {/* Header */}
        <div className="bg-white px-8 py-5 flex items-center justify-between border-b">
          <DialogTitle className="text-xl font-medium text-gray-700">
            {isEdit ? "Edit Investment Plan" : "Create New Investment Plan"}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="default" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white flex items-center gap-2">
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border shadow-sm">
            <div>
              <Label className="text-gray-600 text-sm mb-1.5 block">Plan Name</Label>
              <Input
                {...register("title")}
                placeholder="e.g. USDT, BTC, ETH"
                className="border-green-400 focus-visible:ring-green-400"
              />
              <p className="text-[11px] text-green-500 mt-1.5">● This will be displayed as the plan title</p>
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label className="text-gray-600 text-sm mb-1.5 block">Description (Optional)</Label>
              <Input
                {...register("description")}
                placeholder="Short description"
                className="border-gray-200"
              />
            </div>
          </div>

          {/* Investment Settings */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Investment Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Duration (Days)</Label>
                <Input
                  type="number"
                  {...register("duration")}
                  placeholder="e.g. 30, 60, 90"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Investment period in days</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Daily Return (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("dailyReturn")}
                  placeholder="e.g. 0.5, 1.2"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Daily percentage return on investment</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Total Yield (%)</Label>
                <Input
                  disabled
                  value={`${totalYield}%`}
                  className="bg-gray-50 border-gray-200 text-gray-500"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">Auto-calculated: Daily % × Days</p>
              </div>
            </div>
          </div>

          {/* Amount Limits */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Amount Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Minimum Investment</Label>
                <Input
                  type="number"
                  {...register("minInvestment")}
                  placeholder="10"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Minimum amount user can invest</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Maximum Investment</Label>
                <Input
                  type="number"
                  {...register("maxInvestment")}
                  placeholder="10000"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Maximum amount user can invest</p>
                {errors.maxInvestment && <p className="text-red-500 text-sm mt-1">{errors.maxInvestment.message}</p>}
              </div>
            </div>
          </div>

          {/* Plan Image */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Plan Image</h3>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <Label className="text-gray-600 text-sm mb-1.5 block">
                  Upload Thumbnail <span className="text-gray-400 text-xs">(Recommended: 200x200px, circular)</span>
                </Label>
                <div className="flex items-center border rounded-md overflow-hidden bg-gray-50">
                  <Input type="text" placeholder="Choose file" disabled className="border-0 bg-transparent rounded-none flex-1" />
                  <Button type="button" variant="secondary" className="rounded-none border-l h-10 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700">
                    Browse
                  </Button>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-100 flex items-center justify-center shrink-0">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Capital & Status */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Capital & Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Return Capital After Completion?</Label>
                <Select value={returnCapital} onValueChange={(val) => setValue("returnCapital", val)}>
                  <SelectTrigger className="border-green-400 focus:ring-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Return invested capital</SelectItem>
                    <SelectItem value="no">No - Do not return capital</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-green-500 mt-1.5">● If Yes, user gets their invested amount back after plan ends</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Plan Status</Label>
                <Select value={status} onValueChange={(val) => setValue("status", val)}>
                  <SelectTrigger className="border-green-400 focus:ring-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2 pb-6">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 h-auto text-base rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                isEdit ? "Update Plan" : "Create Plan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}