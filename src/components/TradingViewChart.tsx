'use client';

import { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
  theme?: 'light' | 'dark';
}

declare global {
  interface Window {
    TradingView: unknown;
  }
}

export const TradingViewChart = ({ symbol, theme = 'dark' }: TradingViewChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget h-full w-full';
      containerRef.current.appendChild(widgetContainer);

      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;

      const config = {
        "width": "100%",
        "height": "100%",
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": theme,
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      };

      script.innerHTML = JSON.stringify(config);
      containerRef.current.appendChild(script);
    }
  }, [symbol, theme]);

  return (
    <div className="tradingview-widget-container w-full h-[calc(100vh-16rem)]" ref={containerRef} />
  );
}; 