"use client"

import { SwapModal } from '@/components/SwapModal'
import { TokenInfo } from '@/components/TokenInfo'
import { ArrowUpRight, History} from 'lucide-react'
import { useRef } from 'react'
import ConnectWalletButton from '@/components/ConnectWalletButton'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null)

  return (
    <main className="relative h-screen overflow-auto scroll-smooth">
      <div className="fixed inset-0 bg-cover bg-center opacity-30 z-0" style={{ backgroundImage: "url('/images/spot-background.png')" }} />

      <div className="flex flex-col min-h-screen relative z-10">
        <header className="w-full px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8" priority />
              <h1 className="text-xl font-bold gradient-text">SWAP</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/charts" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                Charts
              </Link>
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
                  symbol="solana"
                  name="solana"
                />
              </div>
              <div className="flex-1">
                <TokenInfo 
                  symbol="bitcoin"
                  name="bitcoin"
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
