'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowDownUp } from 'lucide-react';
import { TokenDropdown, Token } from './TokenDropdown';

// Define an interface for the Coin data from CoinGecko
interface ICoinData {
  symbol: string;
  name: string;
  image: string;
}

export function SwapModal() {
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromToken] = useState<Token>({
    symbol: 'MONET',
    name: 'MONET',
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: 'USDC',
    name: 'USD Coin',
  });

  const [tokenList, setTokenList] = useState<Token[]>([]);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((res) => res.json())
      .then((data) => {
        const coinData = data as ICoinData[];
        const tokens: Token[] = coinData.map((coin) => ({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          logo: coin.image,
        }));
        setTokenList(tokens);
        if (tokens.length > 0) {
          setToToken(tokens[0]);
        }
      })
      .catch((err) => {
        console.error('Error fetching token list:', err);
      });
  }, []);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const randomFactor = 0.5 + Math.random();
      const converted = numericValue * randomFactor;
      setToAmount(converted.toFixed(2));
    } else {
      setToAmount('');
    }
  };

  const handleSwap = () => {
    console.log('Swap initiated');
  };

  const handleSwitchTokens = () => {
    console.log('Switch tokens - fromToken is static and cannot be switched');
  };

  return (
    <Card className="w-[440px] bg-[#1C1C1C] border border-[#383838] backdrop-blur-md rounded-xl shadow-xl">
      <CardContent className="p-4">
        <div className="rounded-2xl bg-[#2C2C2C] p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">From</span>
            <div className="flex items-center space-x-2">
              {fromToken.logo ? (
                <img src={fromToken.logo} alt={fromToken.symbol} className="w-6 h-6 rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
              )}
              <span className="text-white font-semibold">{fromToken.symbol}</span>
            </div>
          </div>
          <Input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={handleFromAmountChange}
            className="bg-transparent text-white text-3xl font-semibold placeholder:text-gray-600 focus:outline-none border-b border-gray-600 pb-1"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">Balance: 0.00</span>
            <div className="flex space-x-2">
              <button className="text-xs text-blue-400 hover:text-blue-300 bg-[#383838] px-2 py-1 rounded-full">50%</button>
              <button className="text-xs text-blue-400 hover:text-blue-300 bg-[#383838] px-2 py-1 rounded-full">MAX</button>
            </div>
          </div>
        </div>

        <div className="flex justify-center -my-3 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwitchTokens}
            className="rounded-full bg-[#1C1C1C] border border-[#383838] hover:bg-[#2C2C2C] h-10 w-10 cursor-not-allowed"
            disabled
          >
            <ArrowDownUp className="h-5 w-5 text-blue-400" />
          </Button>
        </div>

        <div className="rounded-2xl bg-[#2C2C2C] p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">To</span>
            <TokenDropdown
              token={toToken}
              tokens={tokenList.length ? tokenList : []}
              onSelect={setToToken}
            />
          </div>
          <Input
            type="number"
            placeholder="0.0"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            className="bg-transparent text-white text-3xl font-semibold placeholder:text-gray-600 focus:outline-none border-b border-gray-600 pb-1"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">Balance: 0.00</span>
            <span className="text-xs text-gray-500">≈ $0.00</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#2C2C2C] p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Route</span>
            <span className="text-sm text-gray-400">Best price</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <span className="text-gray-400">→</span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-medium text-lg"
          onClick={handleSwap}
        >
          Swap
        </Button>
      </CardContent>
    </Card>
  );
} 