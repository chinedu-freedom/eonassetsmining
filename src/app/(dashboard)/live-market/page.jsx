"use client"

import { useState } from "react"
import { Eye, Edit, Plus, EyeOff, Activity, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const cryptoData = [
  { id: 1, logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029", symbol: "BTC", name: "Bitcoin", binanceSymbol: "BTCUSDT", status: "ACTIVE" },
  { id: 2, logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029", symbol: "ETH", name: "Ethereum", binanceSymbol: "ETHUSDT", status: "ACTIVE" },
  { id: 3, logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029", symbol: "BNB", name: "BNB", binanceSymbol: "BNBUSDT", status: "ACTIVE" },
  { id: 4, logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=029", symbol: "SOL", name: "Solana", binanceSymbol: "SOLUSDT", status: "ACTIVE" },
  { id: 5, logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=029", symbol: "XRP", name: "Ripple", binanceSymbol: "XRPUSDT", status: "ACTIVE" },
  { id: 6, logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=029", symbol: "DOGE", name: "Dogecoin", binanceSymbol: "DOGEUSDT", status: "ACTIVE" },
  { id: 7, logo: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=029", symbol: "ADA", name: "Cardano", binanceSymbol: "ADAUSDT", status: "ACTIVE" },
  { id: 8, logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png?v=029", symbol: "AVAX", name: "Avalanche", binanceSymbol: "AVAXUSDT", status: "ACTIVE" },
]

export default function LiveMarketPage() {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className="space-y-6">
      {/* Top Card: Live Market Visibility */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#5A8DEE]" />
              <h2 className="text-lg font-semibold text-gray-700">Live Market Visibility</h2>
            </div>
            <p className="text-[13px] text-gray-500">Enable or disable the live market section on homepage</p>
          </div>
          <Switch 
            checked={isVisible} 
            onCheckedChange={setIsVisible} 
            className="data-[state=checked]:bg-[#5A8DEE]"
          />
        </CardContent>
      </Card>

      {/* Bottom Card: Market Cryptocurrencies */}
      <Card className="border-none shadow-sm bg-white rounded-md">
        <CardContent className="p-6">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-6 gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-700">Market Cryptocurrencies</h2>
              <p className="text-[13px] text-gray-500">Manage cryptocurrencies displayed in the live market section. Prices are fetched live from Binance API.</p>
            </div>
            <Button className="bg-[#5A8DEE] hover:bg-[#4778d9] text-white h-9 px-4 shrink-0">
              <Plus className="w-4 h-4 mr-1.5" />
              Add Crypto
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-transparent border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-bold text-gray-500 uppercase text-xs w-[60px]">#</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs w-[80px]">LOGO</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">SYMBOL</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">NAME</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">BINANCE SYMBOL</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">STATUS</TableHead>
                  <TableHead className="font-bold text-gray-500 uppercase text-xs">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cryptoData.map((crypto) => (
                  <TableRow key={crypto.id} className="hover:bg-gray-50/50 border-b last:border-0">
                    <TableCell className="font-medium text-gray-700 text-sm">
                      {crypto.id}
                    </TableCell>
                    <TableCell>
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                        <img src={crypto.logo} alt={crypto.name} className="w-full h-full object-contain" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-gray-800 text-[14px]">{crypto.symbol}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 text-[14px]">{crypto.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#ff5b5c]/10 hover:bg-[#ff5b5c]/20 text-[#ff5b5c] border-0 px-2 py-0.5 rounded-[4px] text-[10px] font-bold tracking-wider uppercase">
                        {crypto.binanceSymbol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-[#39DA8A]/10 hover:bg-[#39DA8A]/20 text-[#39DA8A] border-0 px-3 py-1 rounded-[4px] text-[10px] font-bold tracking-widest uppercase">
                        {crypto.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="default" 
                          size="icon" 
                          className="h-8 w-8 bg-[#5A8DEE] hover:bg-[#4778d9] text-white border-0 rounded-[4px]"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button 
                          variant="default" 
                          className="h-8 px-3 bg-[#ff9f43] hover:bg-[#e68f3c] text-white border-0 rounded-[4px] text-[13px] font-medium"
                          title="Disable"
                        >
                          <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                          Disable
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}
