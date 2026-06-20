"use client"

import { useState, useEffect } from "react"
import { Image as ImageIcon, Users, Save, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFetchData, usePut } from "@/hooks/useApi"
import { toast } from "sonner"

export default function AboutUsSettingsPage() {
  const { data, isLoading } = useFetchData("/admin/about")
  const updateBannerMutation = usePut((id) => `/admin/about/banners/${id}`, "/admin/about", { showToast: false })
  const updateTeamMemberMutation = usePut((id) => `/admin/about/team-members/${id}`, "/admin/about", { showToast: false })

  const [banners, setBanners] = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setBanners(data.banners || [])
      setTeamMembers(data.teamMembers || [])
    }
  }, [data])

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const handleBannerFileChange = async (id, file) => {
    if (!file) return
    try {
      const base64 = await toBase64(file)
      setBanners(prev => prev.map(b => b.id === id ? { ...b, image: base64, hasChanged: true } : b))
    } catch (error) {
      toast.error("Failed to read file")
    }
  }

  const handleTeamMemberFileChange = async (id, file) => {
    if (!file) return
    try {
      const base64 = await toBase64(file)
      setTeamMembers(prev => prev.map(t => t.id === id ? { ...t, image: base64, hasChanged: true } : t))
    } catch (error) {
      toast.error("Failed to read file")
    }
  }

  const handleTeamMemberChange = (id, field, value) => {
    setTeamMembers(prev => prev.map(t => t.id === id ? { ...t, [field]: value, hasChanged: true } : t))
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      const promises = []
      
      for (const banner of banners) {
        if (banner.hasChanged) {
          promises.push(updateBannerMutation.mutateAsync({ 
            id: banner.id, 
            data: { image: banner.image } 
          }))
        }
      }

      for (const member of teamMembers) {
        if (member.hasChanged) {
          promises.push(updateTeamMemberMutation.mutateAsync({ 
            id: member.id, 
            data: { image: member.image, name: member.name, position: member.position } 
          }))
        }
      }

      await Promise.all(promises)
      // toast.success("About Us settings saved successfully")
      
      // Reset changed state
      setBanners(prev => prev.map(b => ({ ...b, hasChanged: false })))
      setTeamMembers(prev => prev.map(t => ({ ...t, hasChanged: false })))
      
    } catch (error) {
      console.error(error)
      toast.error("Failed to save some settings")
    } finally {
      setIsSaving(false)
    }
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
          
          <h2 className="text-[1.2rem] font-medium text-[#475f7b] mb-8">About Us Management</h2>

          {/* About Page Banners Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <ImageIcon className="w-5 h-5 text-[#5A8DEE]" />
              <h3 className="text-[1.1rem] font-medium text-[#475f7b]">About Page Banners</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="border border-gray-100 rounded-sm p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-[12px] font-medium text-[#475f7b] mb-3">{banner.title}</h4>
                  
                  {/* Image Preview */}
                  <div className="w-full h-36 bg-gray-50 rounded-md mb-6 overflow-hidden flex items-center justify-center border border-gray-100 relative">
                    {banner.image ? (
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center text-gray-400">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-[10px]">No image uploaded</span>
                      </div>
                    )}
                  </div>

                  {/* File Input */}
                  <div className="relative border border-gray-200 rounded-sm flex items-center h-8 w-full overflow-hidden bg-gray-50">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleBannerFileChange(banner.id, e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="bg-gray-100 border-r border-gray-200 px-3 flex items-center h-full text-xs font-medium text-gray-700 pointer-events-none">
                      Choose file
                    </div>
                    <span className="px-3 text-xs text-gray-400 pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis">
                      {banner.image && banner.hasChanged ? "Image selected" : "No new file chosen"}
                    </span>
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
              {teamMembers.map((member, index) => (
                <div key={member.id} className="border border-gray-100 rounded-sm p-4 hover:shadow-sm transition-shadow">
                  <h4 className="text-[12px] font-medium text-[#475f7b] mb-6">Team Member {index + 1}</h4>
                  
                  {/* Image Preview */}
                  <div className="w-full flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-gray-400 bg-gray-50 border border-gray-200 overflow-hidden">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-8 h-8 opacity-50" />
                      )}
                    </div>
                  </div>

                  {/* File Input */}
                  <div className="relative border border-gray-200 rounded-sm flex items-center h-8 w-full overflow-hidden bg-gray-50 mb-6">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleTeamMemberFileChange(member.id, e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="bg-gray-100 border-r border-gray-200 px-3 flex items-center h-full text-xs font-medium text-gray-700 pointer-events-none">
                      Choose file
                    </div>
                    <span className="px-3 text-xs text-gray-400 pointer-events-none whitespace-nowrap overflow-hidden text-ellipsis">
                      {member.image && member.hasChanged ? "Image selected" : "No new file chosen"}
                    </span>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Name</label>
                      <Input 
                        value={member.name || ""} 
                        onChange={(e) => handleTeamMemberChange(member.id, "name", e.target.value)}
                        className="border-gray-200 h-10 text-[13px]" 
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-medium text-[#475f7b] block mb-1">Role/Position</label>
                      <Input 
                        value={member.position || ""} 
                        onChange={(e) => handleTeamMemberChange(member.id, "position", e.target.value)}
                        className="border-gray-200 h-10 text-[13px]" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <Button 
              onClick={handleSaveAll}
              disabled={isSaving}
              className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white px-6 h-10 font-medium rounded-[4px] shadow-sm border-0 flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
