"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Plus, Star, Newspaper, Eye, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const newsData = [
  { 
    id: "1", 
    sn: 1, 
    image: "https://via.placeholder.com/60x40/e2e8f0/94a3b8?text=News", 
    title: "Security Tips for Your Account", 
    category: "TIPS", 
    views: 12, 
    featured: true, 
    status: "ACTIVE", 
    date: "Dec 16, 2025" 
  },
  { 
    id: "2", 
    sn: 2, 
    image: "https://via.placeholder.com/60x40/e2e8f0/94a3b8?text=Update", 
    title: "Platform Upgrade Announcement", 
    category: "UPDATE", 
    views: 84, 
    featured: false, 
    status: "ACTIVE", 
    date: "Dec 12, 2025" 
  },
]

export default function NewsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Calculated Stats
  const totalNews = newsData.length
  const totalViews = newsData.reduce((acc, curr) => acc + curr.views, 0)
  const featuredNews = newsData.filter(n => n.featured).length

  const stats = [
    {
      title: "Total News",
      value: totalNews.toString(),
      icon: Newspaper,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Total Views",
      value: totalViews.toString(),
      icon: Eye,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Featured News",
      value: featuredNews.toString(),
      icon: Star,
      color: "text-orange-600",
      bg: "bg-orange-100",
    }
  ]

  const filteredNews = newsData.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.category.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">News Management</h1>
          <p className="text-muted-foreground text-sm">Manage system news, updates, and announcements</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add News
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-border shadow-sm bg-card rounded-xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</h3>
                  <p className="text-[13px] font-medium text-muted-foreground mt-1 tracking-wide">{stat.title}</p>
                </div>
                <div className={`w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400`}>
                  <stat.icon className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-6">
          <div className="flex justify-end">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card className="border-none shadow-sm bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-[60px] font-bold text-gray-500 uppercase text-xs">S.N</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs w-[100px]">IMAGE</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">TITLE</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">CATEGORY</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">VIEWS</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs text-center">FEATURED</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">DATE</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs text-right pr-6">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.length > 0 ? (
                  filteredNews.map((news) => (
                    <TableRow key={news.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-medium text-gray-700">{news.sn}</TableCell>
                      <TableCell>
                        <div className="w-[60px] h-[40px] rounded overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center">
                          <img src={news.image} alt="News thumbnail" className="w-full h-full object-cover" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-gray-800 text-[14px]">{news.title}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#e5edff] hover:bg-[#d4e0ff] text-[#5A8DEE] border-0 px-3 py-1 font-semibold rounded-[4px]">
                          {news.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 font-medium">{news.views}</TableCell>
                      <TableCell className="text-center">
                        {news.featured ? (
                          <div className="inline-flex w-7 h-7 bg-[#f59e0b] rounded items-center justify-center shadow-sm">
                            <Star className="w-4 h-4 text-white fill-white" />
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#39DA8A]/10 hover:bg-[#39DA8A]/20 text-[#39DA8A] border-0 text-[11px] tracking-wider uppercase px-3 py-1 rounded-[4px] font-bold">
                          {news.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 text-sm whitespace-nowrap">
                        {news.date}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#f59e0b] hover:bg-[#d97706] text-white border-0 rounded-[4px]"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="default" 
                            size="icon" 
                            className="h-8 w-8 bg-[#ff5b5c] hover:bg-red-500 text-white border-0 rounded-[4px]"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                      No news found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
