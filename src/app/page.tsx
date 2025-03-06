"use client"

import { SwapModal } from '@/components/SwapModal'
import { TokenInfo } from '@/components/TokenInfo'
import { ArrowUpRight, BarChart3, History, Info, Settings, Star } from 'lucide-react'
import { useRef } from 'react'
import ConnectWalletButton from '@/components/ConnectWalletButton'

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null)

  const handleScrollDown = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative h-screen overflow-auto scroll-smooth">
      <div className="fixed inset-0 bg-cover bg-center opacity-30 z-0" style={{ backgroundImage: "url('/images/spot-background.png')" }} />

      <div className="flex flex-col min-h-screen relative z-10">
        <header className="w-full px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
              <h1 className="text-xl font-bold gradient-text">SWAP</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <ConnectWalletButton />
          </div>
        </header>

        <div ref={mainContentRef} className="flex-1 p-4 md:p-8 flex flex-col items-center">
          <div className="w-full max-w-[510px] flex flex-col items-center gap-6">
            <SwapModal />

            <div className="w-full shadow-lg overflow-hidden flex gap-x-4">
              <div className="flex-1">
                <TokenInfo 
                  symbol="USDC"
                  name="USDC"
                  price="$0.9999"
                  change24h={0}
                  volume24h="$4.8B"
                  marketCap="$9.62B"
                  rank={7}
                  logo="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                />
              </div>
              <div className="flex-1">
                <TokenInfo 
                  symbol="SOL"
                  name="Solana"
                  price="$146.82"
                  change24h={2.5}
                  volume24h="$1.2B"
                  marketCap="$64.3B"
                  rank={6}
                  logo="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
                />
              </div>
            </div>

            <div className="w-full bg-card border border-border rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-medium text-foreground">Transaction History</h2>
                <button className="text-primary hover:text-[var(--primary-hover)] text-sm flex items-center transition-colors">
                  View All <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="text-center py-6 text-muted-foreground text-sm flex flex-col items-center">
                    <History className="w-10 h-10 mb-2 opacity-50" />
                    <span>No recent transactions</span>
                    <span className="text-xs mt-1">Connect wallet to view your history</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[200px]"></div>

      </div>
    </main>
  )
}
