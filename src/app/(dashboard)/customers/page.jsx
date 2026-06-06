"use client"

import { useState } from "react"
import { Search, Edit, Lock, LogIn, Users, CheckCircle, Clock, Ban, UserCog, History, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const usersData = [
  { id: 1, email: "balleryoung88@gmail.com", username: "Young_tech", country: "NG", mainBalance: "0.00", giftBalance: "5.00", registered: "May 27, 2026", status: "ACTIVE" },
  { id: 2, email: "chinedufreedom10@gmail.com", username: "Spark", country: "NG", mainBalance: "0.60", giftBalance: "4.50", registered: "May 27, 2026", status: "ACTIVE" },
  { id: 3, email: "mdmujahidislam7080@gmail.com", username: "Mujahid", country: "BD", mainBalance: "0.10", giftBalance: "5.00", registered: "May 27, 2026", status: "ACTIVE" },
  { id: 4, email: "mdshorofuddin09@gmail.com", username: "Mahmud090", country: "BD", mainBalance: "0.00", giftBalance: "5.00", registered: "May 27, 2026", status: "ACTIVE" },
  { id: 5, email: "Fxlurd@gmail.com", username: "Lurdx", country: "ZA", mainBalance: "2.10", giftBalance: "5.00", registered: "May 18, 2026", status: "ACTIVE" },
  { id: 6, email: "imranaliiop2@gmail.com", username: "imranpk144", country: "BD", mainBalance: "0.00", giftBalance: "5.00", registered: "May 14, 2026", status: "ACTIVE" },
  { id: 7, email: "pkblackpro@gmail.com", username: "ktdev144", country: "BD", mainBalance: "0.90", giftBalance: "4.50", registered: "Dec 28, 2025", status: "ACTIVE" },
]

const stats = [
  { title: "Total Users", value: "7", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Active Users", value: "7", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  { title: "Unverified Users", value: "0", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  { title: "Banned Users", value: "0", icon: Ban, color: "text-red-600", bg: "bg-red-100" },
]

export default function CustomersManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all-status")
  const [countryFilter, setCountryFilter] = useState("all-countries")

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
      
    const matchesStatus = statusFilter === "all-status" || user.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCountry = countryFilter === "all-countries" || user.country.toLowerCase() === countryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCountry
  })

  return (
    <div className="space-y-6">
      
      {/* Stats Cards - Built using packages page format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-none shadow-sm bg-white rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-700">{stat.value}</h3>
                  <p className="text-[13px] font-medium text-gray-500 mt-1 tracking-wide">{stat.title}</p>
                </div>
                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Container */}
      <Card className="border-none shadow-sm bg-white rounded-md overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <UserCog className="w-5 h-5 text-gray-500" />
              <h2 className="text-[16px] font-semibold">User Management</h2>
            </div>
            <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 h-9 px-4 rounded-md">
              <History className="w-4 h-4 mr-2" />
              Activity
            </Button>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-200 h-10"
              />
            </div>
            <div className="w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 h-10 text-gray-600">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="border-gray-200 h-10 text-gray-600">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-countries">All Countries</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  <SelectItem value="bd">Bangladesh</SelectItem>
                  <SelectItem value="za">South Africa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50 border-b">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider w-[50px] py-4">#</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">USER</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">EMAIL</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">COUNTRY</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">MAIN BALANCE</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">GIFT BALANCE</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">REGISTERED</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">STATUS</TableHead>
                <TableHead className="font-bold text-gray-600 uppercase text-[11px] tracking-wider py-4">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50 border-b last:border-0">
                  <TableCell className="font-medium text-gray-700 text-[13px] py-4">
                    {user.id}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#5A8DEE] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-[13px] leading-tight">{user.email}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] text-gray-600 py-4">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-gray-400 hover:bg-gray-500 text-white border-0 px-2.5 py-0.5 rounded-[4px] font-medium text-[11px]">
                      {user.country}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-bold text-[#5A8DEE] text-[13px]">{user.mainBalance}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-bold text-[#39DA8A] text-[13px]">{user.giftBalance}</span>
                  </TableCell>
                  <TableCell className="text-[12px] text-gray-600 py-4">
                    {user.registered}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge className="bg-[#39DA8A] hover:bg-[#28c76f] text-white border-0 px-3 py-0.5 rounded-[4px] font-bold text-[10px] tracking-wide uppercase">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1.5">
                      <Button variant="outline" size="icon" className="h-7 w-7 text-blue-500 border-gray-200 hover:bg-blue-50" title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7 text-cyan-500 border-gray-200 hover:bg-cyan-50" title="Login As">
                        <LogIn className="w-3.5 h-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-7 w-7 text-orange-400 border-gray-200 hover:bg-orange-50" title="Lock">
                        <Lock className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
      </Card>
    </div>
  )
}
