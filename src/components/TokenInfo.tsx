'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

interface TokenInfoProps {
  symbol: string;
  name: string;
  price: string;
  change24h: number;
  volume24h: string;
  marketCap: string;
  logo?: string;
  rank?: number;
}

export function TokenInfo({
  symbol,
  name,
  price,
  change24h,
  volume24h,
  marketCap,
  logo,
  rank
}: TokenInfoProps) {
  return (
    <Card className="bg-card border border-border shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          {logo ? (
            <Image src={logo} alt={symbol} width={24} height={24} className="rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-400"></div>
          )}
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{symbol}</CardTitle>
            <p className="text-xs text-muted-foreground">{name}</p>
          </div>
        </div>
        <a href="#" className="text-primary hover:text-primary-hover text-sm flex items-center transition-colors">
          View <ArrowUpRight className="w-3 h-3 ml-1" />
        </a>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-semibold text-foreground">{price}</p>
            <div className={`flex items-center text-sm ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change24h >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              <span>{change24h >= 0 ? '+' : ''}{change24h}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <p className="text-lg font-semibold text-foreground">{volume24h}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <p className="text-lg font-semibold text-foreground">{marketCap}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Rank</p>
            <p className="text-lg font-semibold text-foreground">{rank}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 