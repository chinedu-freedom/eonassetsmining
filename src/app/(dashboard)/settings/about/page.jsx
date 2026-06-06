"use client"

import { Image as ImageIcon, Users, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const bannersData = [
  { id: 1, title: "Banner 1", preview: "banner1" },
  { id: 2, title: "Banner 2", preview: "banner2" },
  { id: 3, title: "Banner 3", preview: "banner3" },
  { id: 4, title: "Banner 4", preview: "banner2" }, // Reused for mock layout
  { id: 5, title: "Banner 5", preview: "banner3" }, // Reused for mock layout
]

const teamData = [
  { id: 1, title: "Team Member 1", preview: "bitcoin", name: "John Smith", role: "CEO & Founder" },
  { id: 2, title: "Team Member 2", preview: "xrp", name: "Sarah Johnson", role: "CTO" },
  { id: 3, title: "Team Member 3", preview: "binance", name: "Mike Williams", role: "Head of Operations" },
]

export default function AboutUsSettingsPage() {
  return (
    <div className="space-y-6 pb-10">
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-8">
          
          <h2 className="text-[1.2rem] font-medium text-[#475f7b] mb-8">About Us Management</h2>

          {/* About Page Banners Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <ImageIcon className="w-5 h-5 text-[#5A8DEE]" />
              <h3 className="text-[1.1rem] font-medium text-[#475f7b]">About Page Banners</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bannersData.map((banner) => (
                <div key={banner.id} className="border border-gray-100 rounded-sm p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-[12px] font-medium text-[#475f7b] mb-3">{banner.title}</h4>
                  
                  {/* Mock Image Preview */}
                  <div className="w-full h-36 bg-gray-100 rounded-md mb-6 overflow-hidden flex items-center justify-center">
                    {/* Placeholder for actual banner image based on mock id */}
                    {banner.preview === 'banner1' && (
                      <div className="w-full h-full bg-[#1a1209] flex flex-col justify-center items-center text-[#ffcc00] opacity-80">
                        <span className="text-[10px]">Fantasy Image Placeholder</span>
                      </div>
                    )}
                    {banner.preview === 'banner2' && (
                      <div className="w-full h-full bg-blue-50 flex flex-col justify-center items-center text-blue-500">
                        <span className="font-bold">EON ASSETS</span>
                        <span className="text-[10px]">Rocket Placeholder</span>
                      </div>
                    )}
                    {banner.preview === 'banner3' && (
                      <div className="w-full h-full bg-slate-800 flex flex-col justify-center items-center text-yellow-400">
                        <span className="font-bold italic">CRYPTO IS EXPLODING!</span>
                      </div>
                    )}
                  </div>

                  {/* File Input */}
                  <div className="border border-gray-200 rounded-sm flex items-center h-8 w-full overflow-hidden">
                    <button className="bg-gray-100 border-r border-gray-200 px-3 h-full text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                      Choose file
                    </button>
                    <span className="px-3 text-xs text-gray-400">No file chosen</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Users className="w-5 h-5 text-[#5A8DEE]" />
              <h3 className="text-[1.1rem] font-medium text-[#475f7b]">Team Members</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamData.map((member) => (
                <div key={member.id} className="border border-gray-100 rounded-sm p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-[12px] font-medium text-[#475f7b] mb-6">{member.title}</h4>
                  
                  {/* Mock Image Preview */}
                  <div className="w-full flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {member.preview === 'bitcoin' && (
                        <div className="w-full h-full rounded-full bg-[#f7931a] flex items-center justify-center">₿</div>
                      )}
                      {member.preview === 'xrp' && (
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">✕</div>
                      )}
                      {member.preview === 'binance' && (
                        <div className="w-full h-full rounded-full bg-[#f3ba2f] flex items-center justify-center text-black">◆</div>
                      )}
                    </div>
                  </div>

                  {/* File Input */}
                  <div className="border border-gray-200 rounded-sm flex items-center h-8 w-full overflow-hidden mb-6">
                    <button className="bg-gray-100 border-r border-gray-200 px-3 h-full text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                      Choose file
                    </button>
                    <span className="px-3 text-xs text-gray-400">No file chosen</span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Name</label>
                      <Input defaultValue={member.name} className="border-gray-200 h-10 text-[13px]" />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Role/Position</label>
                      <Input defaultValue={member.role} className="border-gray-200 h-10 text-[13px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-6 h-10 font-medium rounded-md shadow-sm border-0 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
