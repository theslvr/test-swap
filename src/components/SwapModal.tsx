'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowDownUp, RefreshCw, Sliders } from 'lucide-react';
import { TokenDropdown, Token } from './TokenDropdown';
import Image from 'next/image';
import mockTokens from '../data/mockTokens.json';

// Интерфейсы
interface ICoinData {
  symbol: string;
  name: string;
  image: string;
}

// Константы
const FROM_TOKEN_FIXED_PRICE = 0.1; // Фиксированная цена для fromToken - 0.1$

// Хелперы
const getCoinId = (tokenName: string) => tokenName.toLowerCase().replace(/ /g, '-');

// Расчет конвертации на основе фиксированной цены fromToken и реальной цены toToken
const calculateConversion = async (
  amount: number, 
  toTokenName: string, 
  setToAmount: (val: string) => void, 
  setIsLoading: (val: boolean) => void
) => {
  try {
    setIsLoading(true);
    const toId = getCoinId(toTokenName);
    
    // Пытаемся получить данные из API
    try {
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${toId}&vs_currencies=usd`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('API response not OK');
      }
      
      const priceData = await response.json();
      
      if (priceData[toId] && priceData[toId].usd) {
        const toTokenUsdPrice = priceData[toId].usd;
        // Конвертация: (количество * цена fromToken) / цена toToken
        const convertedAmount = (amount * FROM_TOKEN_FIXED_PRICE) / toTokenUsdPrice;
        setToAmount(convertedAmount.toFixed(6));
      } else {
        throw new Error('Price data unavailable for target token');
      }
    } catch (apiError) {
      console.warn('API request failed, using mock data:', apiError);
      
      // Используем моковые данные при ошибке API
      const mockToken = mockTokens.find(token => 
        token.name.toLowerCase() === toTokenName.toLowerCase() || 
        token.symbol.toLowerCase() === toTokenName.toLowerCase()
      );
      
      if (mockToken && mockToken.price) {
        const convertedAmount = (amount * FROM_TOKEN_FIXED_PRICE) / mockToken.price;
        setToAmount(convertedAmount.toFixed(6));
      } else {
        console.error('Token not found in mock data:', toTokenName);
        setToAmount('');
      }
    }
  } catch (err) {
    console.error('Error in conversion calculation:', err);
    setToAmount('');
  } finally {
    setIsLoading(false);
  }
};

export function SwapModal() {
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromToken] = useState<Token>({
    symbol: 'SOL',
    name: 'Solana',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
  });

  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Загрузка списка токенов
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        
        if (!response.ok) {
          throw new Error('Failed to fetch token list from API');
        }
        
        const data = await response.json();
        const coinData = data as ICoinData[];
        const tokens: Token[] = coinData.map((coin) => ({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          logo: coin.image,
        }));
        
        setTokenList(tokens);
        if (tokens.length > 0 && !toToken.symbol) {
          setToToken(tokens[0]);
        }
      } catch (error) {
        console.warn('Using mock token data due to API error:', error);
        
        // Используем моковые данные при ошибке API
        const mockTokensData: Token[] = mockTokens.map(token => ({
          symbol: token.symbol,
          name: token.name,
          logo: token.logo
        }));
        
        setTokenList(mockTokensData);
        if (mockTokensData.length > 0 && !toToken.symbol) {
          setToToken(mockTokensData[0]);
        }
      }
    };
    
    loadTokens();
  }, []);

  // Пересчет при изменении суммы или выбранного токена назначения
  useEffect(() => {
    if(fromAmount && toToken) {
      calculateConversion(parseFloat(fromAmount), toToken.name, setToAmount, setIsLoading);
    }
  }, [fromAmount, toToken?.symbol]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
  };

  const handleSwap = () => {
    console.log('Swap initiated');
  };

  const handleSwitchTokens = () => {
    console.log('Switch tokens - fromToken is static and cannot be switched');
  };

  return (
    <Card className="w-full max-w-[510px] bg-card border border-border backdrop-blur-md rounded-xl shadow-xl">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-foreground">Swap</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* From Token Section */}
        <div className="rounded-xl bg-secondary p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">You Pay</span>
            <div className="flex items-center space-x-2">
              {fromToken.logo ? (
                <Image src={fromToken.logo} alt={fromToken.symbol} width={24} height={24} className="rounded-full" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-purple-400"></div>
              )}
              <span className="text-foreground font-semibold">{fromToken.symbol}</span>
              <span className="text-xs text-muted-foreground">(${FROM_TOKEN_FIXED_PRICE})</span>
            </div>
          </div>
          <div className="no-arrows">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={handleFromAmountChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield', appearance: 'none' }}
              className="bg-transparent text-foreground text-3xl font-semibold placeholder:text-muted-foreground focus:outline-none border-none p-0 h-auto"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">Balance: 0.00</span>
            <div className="flex space-x-2">
              <button className="text-xs text-primary hover:text-[var(--primary-hover)] bg-muted px-2 py-1 rounded-md transition-colors">50%</button>
              <button className="text-xs text-primary hover:text-[var(--primary-hover)] bg-muted px-2 py-1 rounded-md transition-colors">MAX</button>
            </div>
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center -my-3 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSwitchTokens}
            className="rounded-full bg-card border border-border hover:bg-secondary h-10 w-10 cursor-not-allowed"
            disabled
          >
            <ArrowDownUp className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* To Token Section */}
        <div className="rounded-xl bg-secondary p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">You Receive</span>
            <div className="relative">
              <TokenDropdown
                token={toToken}
                tokens={tokenList.length ? tokenList : []}
                onSelect={setToToken}
              />
            </div>
          </div>
          <div className="relative">
            {isLoading ? (
              <div className="h-12 flex items-center">
                <div className="w-24 h-8 bg-muted rounded animate-pulse"></div>
              </div>
            ) : (
              <Input
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="bg-transparent text-foreground text-3xl font-semibold placeholder:text-muted-foreground focus:outline-none border-none p-0 h-auto"
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">Balance: 0.00</span>
            <span className="text-xs text-muted-foreground">
              ≈ ${fromAmount && !isNaN(parseFloat(fromAmount)) ? (parseFloat(fromAmount) * FROM_TOKEN_FIXED_PRICE).toFixed(2) : '0.00'}
            </span>
          </div>
        </div>

        {/* Route Section */}
        <div className="rounded-xl bg-secondary p-3 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Route</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Best price</span>
              <Sliders size={14} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            {fromToken.logo ? (
              <Image src={fromToken.logo} alt={fromToken.symbol} width={20} height={20} className="rounded-full" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-purple-400"></div>
            )}
            <span className="text-muted-foreground">→</span>
            {toToken.logo ? (
              <Image src={toToken.logo} alt={toToken.symbol} width={20} height={20} className="rounded-full" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
            )}
          </div>
        </div>

        {/* Swap Button */}
        <Button
          className="w-full !bg-[hsla(83,81%,73%,0.1)] border border-transparent text-[#c7f284] h-12 rounded-xl font-medium text-lg transition-colors hover:border hover:border-[#c7f284] cursor-pointer"
          onClick={handleSwap}
        >
          Connect Wallet
        </Button>
      </CardContent>
      <style jsx global>{`
        .no-arrows input::-webkit-inner-spin-button,
        .no-arrows input::-webkit-outer-spin-button {
          display: none !important;
          margin: 0;
        }
        .no-arrows input {
          -moz-appearance: textfield !important;
          appearance: none !important;
        }
      `}</style>
    </Card>
  );
} 