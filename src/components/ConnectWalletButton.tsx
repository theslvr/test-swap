import React from 'react';

export type ConnectWalletButtonProps = {
  onClick?: () => void;
};

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Connect Wallet"
      tabIndex={0}
      className="flex items-center justify-center h-8 w-auto rounded-full bg-[rgba(232,249,255,0.05)] p-[calc(1rem-1px)] transition-shadow hover:shadow-[0_0_0_1px_rgba(199,242,132,0.5)] cursor-pointer"
    >
      <div className="block md:hidden">
        <span 
          className="text-sm font-semibold" 
          style={{ 
            color: 'transparent',
            background: 'linear-gradient(247.44deg, #c7f284 13.88%, #00bef0 99.28%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          Connect
        </span>
      </div>
      <div className="hidden md:block">
        <span 
          className="text-sm font-semibold" 
          style={{ 
            color: 'transparent',
            background: 'linear-gradient(247.44deg, #c7f284 13.88%, #00bef0 99.28%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          Connect Wallet
        </span>
      </div>
    </button>
  );
};

export default ConnectWalletButton; 