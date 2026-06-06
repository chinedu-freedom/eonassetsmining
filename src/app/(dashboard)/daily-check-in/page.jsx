"use client"

import { useState } from "react"
import { Save, ChevronLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function DailyCheckInPage() {
  const router = useRouter()
  const [isSystemEnabled, setIsSystemEnabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [rewards, setRewards] = useState([
    { day: 1, amount: "0.10", description: "First check-in reward" },
    { day: 2, amount: "0.20", description: "Day 2 reward" },
    { day: 3, amount: "0.30", description: "Day 3 reward" },
    { day: 4, amount: "0.40", description: "Day 4 reward" },
    { day: 5, amount: "0.50", description: "Day 5 reward" },
    { day: 6, amount: "0.60", description: "Day 6 reward" },
    { day: 7, amount: "1.00", description: "Maximum reward - Complete 7 days!" },
  ])

  const handleAmountChange = (index, value) => {
    const newRewards = [...rewards]
    newRewards[index].amount = value
    setRewards(newRewards)
  }

  const handleSave = async () => {
    setIsSubmitting(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Top Section - Settings */}
      <Card className="border-none shadow-sm bg-card rounded-xl overflow-hidden">
        <CardHeader className="bg-white border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-[#475f7b]">Daily Check-In Settings</CardTitle>
            </div>
            <CardDescription className="text-sm font-medium">Configure Rewards For 7-Day Check-In System</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-[#8b9eb3] p-8 text-white">
            <div className="flex items-start gap-4">
              <Switch 
                checked={isSystemEnabled}
                onCheckedChange={setIsSystemEnabled}
                className="mt-1 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-400"
              />
              <div>
                <Label className="text-base font-semibold block mb-2 cursor-pointer" onClick={() => setIsSystemEnabled(!isSystemEnabled)}>
                  Daily Check-In System
                </Label>
                <div className="text-sm text-blue-50/90 space-y-1 mt-3">
                  <p className="font-medium opacity-90 mb-2">When disabled:</p>
                  <ul className="list-disc pl-5 space-y-1.5 opacity-90">
                    <li>Check-in card will be hidden from home page</li>
                    <li>Check-in popup will not appear on login</li>
                    <li>Users cannot claim daily rewards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Table */}
      <Card className="border-none shadow-sm bg-card rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 font-bold tracking-wider uppercase border-b bg-gray-50/50">
              <tr>
                <th scope="col" className="px-6 py-4 w-[20%]">DAY</th>
                <th scope="col" className="px-6 py-4 w-[40%]">REWARD AMOUNT</th>
                <th scope="col" className="px-6 py-4 w-[40%]">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward, index) => (
                <tr key={reward.day} className="border-b last:border-0 hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">Day {reward.day}</span>
                      {reward.day === 7 && (
                        <Badge className="bg-[#39DA8A] hover:bg-[#2bbd74] text-white border-0 text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold">
                          Final Reward
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="relative max-w-[280px]">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <Input
                        type="number"
                        step="0.01"
                        value={reward.amount}
                        onChange={(e) => handleAmountChange(index, e.target.value)}
                        className="pl-8 border-gray-200 focus-visible:ring-blue-500 bg-white"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[#00cfdd] font-medium">{reward.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button 
          onClick={handleSave} 
          disabled={isSubmitting}
          className="bg-[#39DA8A] hover:bg-[#2bbd74] text-white font-medium px-6 shadow-sm"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
        
        <Button 
          onClick={() => router.push('/dashboard')}
          className="bg-[#475f7b] hover:bg-[#34465b] text-white font-medium px-6 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
