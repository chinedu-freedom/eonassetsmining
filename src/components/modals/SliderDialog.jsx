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
import { Loader2, Camera, ArrowLeft } from "lucide-react";

const sliderSchema = z.object({
  pageView: z.string().min(1, "Page view is required"),
});

export default function SliderDialog({ open, setOpen, initialData }) {
  const isEdit = !!initialData?.id;

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      pageView: "home_page",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        pageView: initialData.pageView || "home_page",
      });
    } else {
      reset({
        pageView: "home_page",
      });
    }
  }, [initialData, reset]);

  const pageView = watch("pageView");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-[#f8fafc]">
        {/* Header */}
        <div className="bg-white px-8 py-5 flex items-center justify-between border-b">
          <DialogTitle className="text-xl font-medium text-gray-700">
            {isEdit ? "Edit Slider" : "Create New Slider"}
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="default" className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white flex items-center gap-2 px-4 py-2 h-auto">
              <ArrowLeft className="w-4 h-4" />
              Vip Slider List
            </Button>
          </DialogClose>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg border shadow-sm">
            {/* Upload Section */}
            <div>
              <Label className="text-gray-600 text-sm mb-1.5 block font-bold">
                Upload Photo <span className="text-gray-400 font-normal">{"{Suggestion: size 600x600(px)}"}</span>
              </Label>
              <div className="flex items-center border border-green-300 rounded-md overflow-hidden bg-white mb-2">
                <Input type="text" placeholder="Choose file" disabled className="border-0 bg-transparent rounded-none flex-1 text-gray-500" />
                <Button type="button" variant="secondary" className="rounded-none border-l border-green-300 h-10 px-6 bg-gray-50 hover:bg-gray-100 text-gray-600 font-normal">
                  Browse
                </Button>
              </div>
              <p className="text-[12px] text-[#39DA8A] mb-4">○ Note: Vip Slider image mandatory</p>
              
              <div className="w-[120px] h-[120px] bg-gray-100 rounded-md flex flex-col items-center justify-center text-gray-400 border border-gray-200">
                <Camera className="w-8 h-8 mb-1" />
                <span className="text-[10px]">Image not found!</span>
              </div>
            </div>

            {/* Select Section */}
            <div>
              <Label className="text-transparent text-sm mb-1.5 block select-none">Page View</Label>
              <Select value={pageView} onValueChange={(val) => setValue("pageView", val)}>
                <SelectTrigger className="border-green-300 focus:ring-green-400 text-gray-600 h-10">
                  <SelectValue placeholder="Select page view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home_page">Home Page</SelectItem>
                  <SelectItem value="about_page">About Page</SelectItem>
                  <SelectItem value="services_page">Services Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Area inside form */}
          <div className="bg-white p-6 rounded-lg border shadow-sm flex items-center justify-between mt-6">
            <h3 className="text-[16px] text-[#475f7b] font-medium">Submit Your Vip Slider Information</h3>
            <Button
              type="submit"
              className="bg-[#39DA8A] hover:bg-[#2bbd74] text-white px-6 py-2 h-10 text-[15px] font-medium rounded-md shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "+ Submit"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
