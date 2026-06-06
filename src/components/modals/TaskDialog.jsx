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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const taskSchema = z.object({
  name: z.string().min(3, "Name is required"),
  invitesRequired: z.coerce.number().min(1, "Number is required"),
  amount: z.coerce.number().min(0, "Amount is required"),
  description: z.string().min(3, "Description is required"),
  status: z.enum(["active", "inactive"]),
});

export default function TaskDialog({ open, setOpen, initialData }) {
  const isEdit = !!initialData?.id;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      invitesRequired: "",
      amount: "",
      description: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        invitesRequired: initialData.invitesRequired || "",
        amount: initialData.amount || "",
        description: initialData.description || "",
        status: initialData.status?.toLowerCase() === "inactive" ? "inactive" : "active",
      });
    } else {
      reset({
        name: "",
        invitesRequired: "",
        amount: "",
        description: "",
        status: "active",
      });
    }
  }, [initialData, reset, open]);

  const status = watch("status");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-[#f8fafc]">
        {/* Header */}
        <div className="bg-white px-8 py-5 flex items-center justify-between border-b">
          <DialogTitle className="text-xl font-medium text-gray-700">
            {isEdit ? "Edit Task" : "Create New Task"}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="default" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white flex items-center gap-2">
              <span className="text-lg leading-none">&lt;</span> Tasks List
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-8">
          
          {/* Main Task Information */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Task Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Name</Label>
                <Input
                  {...register("name")}
                  placeholder="Task Name"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Enter a descriptive name for this task</p>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Short Description</Label>
                <Input
                  {...register("description")}
                  placeholder="Short Description"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Briefly describe what the user needs to do</p>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Requirements & Reward */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Requirements & Reward</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Invitation Number Required</Label>
                <Input
                  type="number"
                  {...register("invitesRequired")}
                  placeholder="e.g. 10"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Number of successful referrals needed to complete the task</p>
                {errors.invitesRequired && <p className="text-red-500 text-sm mt-1">{errors.invitesRequired.message}</p>}
              </div>

              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Reward Amount ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("amount")}
                  placeholder="e.g. 5.00"
                  className="border-green-400 focus-visible:ring-green-400"
                />
                <p className="text-[11px] text-green-500 mt-1.5">● Amount to be credited upon task completion</p>
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h3 className="text-lg font-medium text-blue-500">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600 text-sm mb-1.5 block">Task Status</Label>
                <Select value={status} onValueChange={(val) => setValue("status", val)}>
                  <SelectTrigger className="border-green-400 focus:ring-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-green-500 mt-1.5">● Determine if this task is currently visible to users</p>
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
                isEdit ? "Update Task" : "Create Task"
              )}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}
