"use client"

import { Info, Edit, Trash2, Plus, Check } from "lucide-react"
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

const languagesData = [
  { flag: "GB", code: "EN", name: "English", nativeName: "English", direction: "LTR", isDefault: true, status: "ACTIVE" },
  { flag: "ID", code: "ID", name: "Indonesian", nativeName: "Bahasa Indonesia", direction: "LTR", isDefault: false, status: "ACTIVE" },
  { flag: "ES", code: "ES", name: "Spanish", nativeName: "Español", direction: "LTR", isDefault: false, status: "ACTIVE" },
  { flag: "BR", code: "PT", name: "Portuguese", nativeName: "Português", direction: "LTR", isDefault: false, status: "ACTIVE" },
  { flag: "RU", code: "RU", name: "Russian", nativeName: "Русский", direction: "LTR", isDefault: false, status: "ACTIVE" },
  { flag: "IN", code: "HI", name: "Hindi", nativeName: "हिन्दी", direction: "LTR", isDefault: false, status: "ACTIVE" },
]

export default function LanguagesPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-0">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.2rem] font-medium text-[#475f7b]">Language Management</h2>
            <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-4 h-10 font-medium rounded-sm-[4px] shadow-sm border-0 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Language
            </Button>
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
              <Table className="min-w-[1000px] whitespace-nowrap">
                <TableHeader className="min-w-[1000px] whitespace-nowrap">
                  <TableRow className="border-b border-gray-200 bg-transparent hover:bg-transparent min-w-[1000px] whitespace-nowrap">
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Flag</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Code</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Name</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Native Name</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Direction</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Default</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Status</TableHead>
                    <TableHead className="font-bold text-[#475f7b] text-[12px] uppercase min-w-[1000px] whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="min-w-[1000px] whitespace-nowrap">
                  {languagesData.map((item, index) => (
                    <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors min-w-[1000px] whitespace-nowrap">
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="font-bold text-[14px] text-gray-800 tracking-wide">{item.flag}</span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="font-bold text-[13px] text-gray-800">{item.code}</span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="text-[13px] text-[#475f7b]">{item.name}</span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="text-[13px] text-[#475f7b]">{item.nativeName}</span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="inline-flex items-center justify-center bg-gray-100 text-gray-500 px-3 py-1 rounded-[4px] text-[11px] font-bold tracking-wider">
                          {item.direction}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        {item.isDefault ? (
                          <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider gap-1">
                            <Check className="w-3.5 h-3.5" />
                            DEFAULT
                          </span>
                        ) : (
                          <button className="inline-flex items-center justify-center bg-transparent border border-[#5A8DEE]/40 text-[#5A8DEE] hover:bg-[#5A8DEE]/10 px-3 py-1.5 rounded-sm-[4px] text-[11px] font-medium transition-colors">
                            Set Default
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <span className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1.5 rounded-[4px] text-[11px] font-bold tracking-wider">
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 min-w-[1000px] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#5A8DEE] hover:bg-[#4778d9] border-0 shadow-none">
                            <Edit className="w-4 h-4 text-white" />
                          </Button>
                          {!item.isDefault && (
                            <Button size="icon" className="w-8 h-8 rounded-sm-[4px] bg-[#ff5b5c] hover:bg-[#e04e4f] border-0 shadow-none">
                              <Trash2 className="w-4 h-4 text-white" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
