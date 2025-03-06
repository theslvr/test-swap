import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Input } from './ui/input'

export interface Token {
  symbol: string
  name: string
  logo?: string
}

interface TokenDropdownProps {
  token: Token
  tokens: Token[]
  onSelect: (token: Token) => void
}

export function TokenDropdown({ token, tokens, onSelect }: TokenDropdownProps) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredTokens = tokens.filter(t => 
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Select.Root
      value={token.symbol}
      onValueChange={(value) => {
        const selected = tokens.find((t) => t.symbol === value)
        if (selected) onSelect(selected)
      }}
    >
      <Select.Trigger className={cn("flex items-center space-x-2 bg-muted hover:bg-accent px-3 py-1.5 rounded-lg transition-colors")}> 
        {token.logo ? (
          <img src={token.logo} alt={token.symbol} className="w-5 h-5 rounded-full" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-purple-400"></div>
        )}
        <Select.Value className="text-base font-semibold text-foreground" />
        <Select.Icon className="text-muted-foreground">
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={cn("z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-[320px]")}>
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <Select.Viewport className="p-2 max-h-[300px] overflow-y-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((t, index) => (
                <Select.Item
                  key={`${t.symbol}-${index}`}
                  value={t.symbol}
                  className={cn("flex items-center px-3 py-2 cursor-pointer rounded-lg hover:bg-secondary transition-colors")}
                >
                  <div className="flex items-center flex-1">
                    {t.logo ? (
                      <img src={t.logo} alt={t.symbol} className="w-6 h-6 rounded-full mr-3" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-purple-400 mr-3"></div>
                    )}
                    <div className="flex flex-col">
                      <Select.ItemText className="text-foreground font-medium">
                        {t.symbol}
                      </Select.ItemText>
                      <span className="text-xs text-muted-foreground">{t.name}</span>
                    </div>
                  </div>
                  <Select.ItemIndicator className="ml-auto">
                    <Check className="w-4 h-4 text-primary" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">No tokens found</div>
            )}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

{/* Global CSS override for token dropdown item text */}