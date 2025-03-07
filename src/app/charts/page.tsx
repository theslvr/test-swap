'use client';

import { TradingViewChart } from '@/components/TradingViewChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import Link from 'next/link';

const SYMBOLS = [
  { name: 'Bitcoin', symbol: 'BINANCE:BTCUSDT' },
  { name: 'Ethereum', symbol: 'BINANCE:ETHUSDT' },
  { name: 'Solana', symbol: 'BINANCE:SOLUSDT' },
  { name: 'Cardano', symbol: 'BINANCE:ADAUSDT' },
];

export default function ChartsPage() {
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0].symbol);

  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 bg-cover bg-center opacity-30 z-0" style={{ backgroundImage: "url('/images/spot-background.png')" }} />
      
      <div className="relative z-10 h-screen flex flex-col">
        <div className="flex items-center justify-between p-4">
          <Link href="/">
            <Button variant="outline">← Back to Exchange</Button>
          </Link>
        </div>

        <Card className="flex-1 p-4 mx-4 mb-4">
          <div className="flex gap-4 mb-4 overflow-x-auto">
            {SYMBOLS.map((item) => (
              <Button
                key={item.symbol}
                variant={selectedSymbol === item.symbol ? "default" : "outline"}
                onClick={() => setSelectedSymbol(item.symbol)}
              >
                {item.name}
              </Button>
            ))}
          </div>
          
          <div className="h-[calc(100%-4rem)]">
            <TradingViewChart symbol={selectedSymbol} />
          </div>
        </Card>
      </div>
    </main>
  );
} 