"use client"

import Link from "next/link"
import { Info, Edit, Trash2, Plus, Check, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetchData, useDelete, usePatch } from "@/hooks/useApi"
import { toast } from "sonner"

export default function LanguagesPage() {
  const { data: languages, isLoading } = useFetchData("/admin/languages")
  const deleteLanguageMutation = useDelete((id) => `/admin/languages/${id}`, "/admin/languages")
  const setAsDefaultMutation = usePatch((id) => `/admin/languages/${id}/default`, "/admin/languages")

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this language?")) {
      try {
        await deleteLanguageMutation.mutateAsync(id)
      } catch (error) {}
    }
  }

  const handleSetDefault = async (id) => {
    try {
      await setAsDefaultMutation.mutateAsync({ id })
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
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Language Management</h2>
            <Link href="/settings/languages/add">
              <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Language
              </Button>
            </Link>
          </div>

          <div className="p-6">
            {/* Info Alert */}
            <div className="bg-[#00CFDD] text-white p-4 rounded-md mb-6 flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-[13px] leading-relaxed">
                <p>
                  <span className="font-bold">Default Language:</span> The default language is used for new visitors who haven't selected a language preference.
                </p>
                <p>
                  Click "Set Default" to change the default language for your site.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table className="whitespace-nowrap">
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Flag</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Code</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Name</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Native Name</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Direction</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Default</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Status</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages?.map((item) => (
                    <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4">
                        <span className="font-bold text-[14px] text-gray-800 tracking-wide">{item.flag_emoji || item.language_code.toUpperCase()}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-bold text-[13px] text-gray-800 uppercase">{item.language_code}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-[13px] text-[#475f7b]">{item.language_name}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-[13px] text-[#475f7b]">{item.native_name}</span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center justify-center bg-gray-100 text-gray-500 px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider uppercase">
                          {item.text_direction}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        {item.is_default ? (
                          <span className="inline-flex items-center justify-center bg-[#00CFDD] text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider gap-1">
                            <Check className="w-3.5 h-3.5" />
                            DEFAULT
                          </span>
                        ) : (
                          <button disabled={setAsDefaultMutation.isPending} onClick={() => handleSetDefault(item.id)} className="inline-flex items-center justify-center bg-transparent border border-[#5A8DEE]/40 text-[#5A8DEE] hover:bg-[#5A8DEE]/10 px-3 py-1.5 rounded-[4px] text-[11px] font-medium transition-colors">
                            Set Default
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center justify-center text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider ${item.status ? 'bg-[#00CFDD]' : 'bg-[#ff5b5c]'}`}>
                          {item.status ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1.5">
                          <Link href={`/settings/languages/edit/${item.id}`}>
                            <Button size="icon" className="w-8 h-8 rounded-[4px] bg-[#5A8DEE] hover:bg-[#4778d9] border-0 shadow-none">
                              <Edit className="w-4 h-4 text-white" />
                            </Button>
                          </Link>
                          {!item.is_default && (
                            <Button disabled={deleteLanguageMutation.isPending} onClick={() => handleDelete(item.id)} size="icon" className="w-8 h-8 rounded-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none">
                              <Trash2 className="w-4 h-4 text-white" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!languages || languages.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-10 text-center text-gray-500">
                        No languages found. Add a new language.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
