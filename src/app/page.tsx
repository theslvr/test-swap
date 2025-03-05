import { SwapModal } from '@/components/SwapModal'

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/spot-background.png')" }} />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      {/* Updated container layout to center the modal vertically */}
      <div className="relative z-20 w-full max-w-screen-xl min-h-screen flex flex-col">
        <header className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Token Swap</h1>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-[1px] rounded">
            <button className="cursor-pointer bg-gray-900 text-white font-bold px-4 py-2 rounded shadow transition-transform transform hover:scale-105">Connect Wallet</button>
          </div>
          {/* You can add additional navigation items here if needed */}
        </header>
        <div className="flex flex-1 items-center justify-center px-4">
          <SwapModal />
        </div>
      </div>
    </main>
  )
}
