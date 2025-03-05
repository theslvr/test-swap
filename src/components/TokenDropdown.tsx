import * as Select from '@radix-ui/react-select'
import { ChevronDown, Check, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'

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
  return (
    <Select.Root
      value={token.symbol}
      onValueChange={(value) => {
        const selected = tokens.find((t) => t.symbol === value)
        if (selected) onSelect(selected)
      }}
    >
      <Select.Trigger className={cn("flex items-center space-x-2 bg-[#383838] hover:bg-[#404040] px-3 py-1.5 rounded-full")}> 
        {/* If token logo provided, display it, otherwise show a nicer icon */}
        {token.logo ? (
          <img src={token.logo} alt={token.symbol} className="w-5 h-5 rounded-full" />
        ) : (
          <DollarSign className="w-5 h-5 text-white" />
        )}
        <Select.Value className="text-base font-semibold font-sans text-white" />
        <Select.Icon className="text-white">
          <ChevronDown className="w-4 h-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={cn("z-50 bg-[#2C2C2C] rounded-md shadow-lg")}>
          <Select.Viewport className="p-2">
            {tokens.map((t, index) => (
              <Select.Item
                key={`${t.symbol}-${index}`}
                value={t.symbol}
                className={cn("flex items-center px-2 py-1 cursor-pointer rounded-md hover:bg-[#383838]")}
              >
                {t.logo ? (
                  <img src={t.logo} alt={t.symbol} className="w-5 h-5 rounded-full mr-2" />
                ) : (
                  <DollarSign className="w-5 h-5 text-white mr-2" />
                )}
                <Select.ItemText className="token-item-text font-sans">
                  {t.symbol}
                </Select.ItemText>
                <Select.ItemIndicator className="ml-auto">
                  <Check className="w-4 h-4 text-white" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

{/* Global CSS override for token dropdown item text */}