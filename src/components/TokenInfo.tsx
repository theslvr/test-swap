'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUpRight, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

interface TokenInfoProps {
  symbol: string;
  name?: string;
  initialData?: {
    price: string;
    change24h: number;
    volume24h: string;
    marketCap: string;
    logo?: string;
    rank?: number;
  };
}

interface TokenData {
  name: string;
  price: string;
  change24h: number;
  volume24h: string;
  marketCap: string;
  logo?: string;
  rank?: number;
}

// Function to format currency numbers
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Function to format large numbers with abbreviations
const formatLargeNumber = (value: number): string => {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toString();
};

// Function to fetch cryptocurrency data from CoinCap API
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch token data');
  }
  const data = await response.json();
  
  // If the data is for a specific asset
  if (data.data && !Array.isArray(data.data)) {
    const asset = data.data;
    // Transform the data to our TokenData format
    return {
      name: asset.name,
      price: formatCurrency(parseFloat(asset.priceUsd)),
      change24h: parseFloat(parseFloat(asset.changePercent24Hr).toFixed(2)),
      volume24h: formatLargeNumber(parseFloat(asset.volumeUsd24Hr)),
      marketCap: formatLargeNumber(parseFloat(asset.marketCapUsd)),
      logo: `https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`,
      rank: parseInt(asset.rank),
    };
  }
  
  throw new Error('Unexpected API response format');
};

export function TokenInfo({
  symbol,
  name: initialName,
  initialData
}: TokenInfoProps) {
  // Use SWR for data loading with initialData fallback support
  const { data, isLoading, mutate } = useSWR<TokenData>(
    `https://api.coincap.io/v2/assets/${symbol.toLowerCase()}`,
    fetcher,
    {
      refreshInterval: 60000, // Update data every minute
      fallbackData: initialData && initialName ? {
        name: initialName,
        ...initialData
      } : undefined,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  // Handle loading states and errors
  const handleRefresh = () => {
    mutate();
  };

  return (
    <Card className="bg-card border border-border shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-400 animate-pulse"
              />
            ) : data?.logo ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Image 
                  src={data.logo} 
                  alt={symbol} 
                  width={24} 
                  height={24} 
                  className="rounded-full"
                  onError={(e) => {
                    // If image fails to load, replace with fallback
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }} 
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-400"
              />
            )}
          </AnimatePresence>
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{data?.name}</CardTitle>
            
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Refresh data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </motion.button>
          <a href={`https://coincap.io/assets/${symbol.toLowerCase()}`} 
             className="text-primary hover:text-primary-hover text-sm flex items-center transition-colors"
             target="_blank"
             rel="noopener noreferrer">
            View <ArrowUpRight className="w-3 h-3 ml-1" />
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Price</p>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  className="h-7 bg-muted rounded-md w-20 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.p 
                  className="text-lg font-semibold text-foreground"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={data?.price}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data?.price || "N/A"}
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  className="h-5 bg-muted rounded-md w-16 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.div 
                  className={`flex items-center text-sm ${data && data.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={data?.change24h}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data && data.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  <span>
                    {data ? `${data.change24h >= 0 ? '+' : ''}${data.change24h}%` : "N/A"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">24h Volume</p>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  className="h-7 bg-muted rounded-md w-24 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.p 
                  className="text-lg font-semibold text-foreground"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={data?.volume24h}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data?.volume24h || "N/A"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Market Cap</p>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  className="h-7 bg-muted rounded-md w-24 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.p 
                  className="text-lg font-semibold text-foreground"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={data?.marketCap}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data?.marketCap || "N/A"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Rank</p>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  className="h-7 bg-muted rounded-md w-12 animate-pulse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.p 
                  className="text-lg font-semibold text-foreground" 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={data?.rank}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {data?.rank || "N/A"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 