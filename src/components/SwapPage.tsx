"use client";

import Image from "next/image";

import {useState} from "react";

const coins = [
    { name: "USDC", icon: "/usdc.png" },
    { name: "BTC", icon: "/btc.png" },
    { name: "ETH", icon: "/eth.png" },
    { name: "SOL", icon: "/sol.png" },
];

export default function Swap() {
    const [sellAmount, setSellAmount] = useState("");
    const [selectedCoin, setSelectedCoin] = useState(coins[0]);
    const [buyCoin, setBuyCoin] = useState(coins[1]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <div className="w-96 p-6 rounded-lg bg-gray-800 shadow-lg">
                <div className="flex justify-between mb-4 text-green-400">
                    <span className="font-bold">Instant</span>
                    <span className="text-gray-500">Trigger | Recurring</span>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                    <span className="text-sm text-gray-400">Selling</span>
                    <div className="flex items-center justify-between bg-gray-600 p-3 rounded-lg mt-1">
                        <div className="flex items-center gap-2">
                            <Image src={selectedCoin.icon} alt={selectedCoin.name} width={24} height={24} />
                            <select
                                className="bg-gray-600 text-white border-none outline-none"
                                value={selectedCoin.name}
                                onChange={(e) => setSelectedCoin(coins.find((c) => c.name === e.target.value) || coins[0])}
                            >
                                {coins.map((coin) => (
                                    <option key={coin.name} value={coin.name}>{coin.name}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="bg-transparent text-white text-right w-24 outline-none"
                            value={sellAmount}
                            onChange={(e) => setSellAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center my-2">
                    <button className="bg-gray-700 p-2 rounded-full">
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="currentColor"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.51043 7.47998V14.99H7.77043V7.47998L9.66043 9.36998L10.5505 8.47994L7.5859 5.51453C7.3398 5.26925 6.94114 5.26925 6.69504 5.51453L3.73047 8.47994L4.62051 9.36998L6.51043 7.47998Z"
                                fill="currentColor"></path>
                            <path
                                d="M14.4902 14.52V7.01001H13.2302V14.52L11.3402 12.63L10.4502 13.5201L13.4148 16.4855C13.6609 16.7308 14.0595 16.7308 14.3056 16.4855L17.2702 13.5201L16.3802 12.63L14.4902 14.52Z"
                                fill="currentColor"></path>
                        </svg>
                    </button>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                    <span className="text-sm text-gray-400">Buying</span>
                    <div className="flex items-center justify-between bg-gray-600 p-3 rounded-lg mt-1">
                        <div className="flex items-center gap-2">
                            <Image src={buyCoin.icon} alt={buyCoin.name} width={24} height={24}/>
                            <select
                                className="bg-gray-600 text-white border-none outline-none"
                                value={buyCoin.name}
                                onChange={(e) => setBuyCoin(coins.find((c) => c.name === e.target.value) || coins[1])}
                            >
                                {coins.map((coin) => (
                                    <option key={coin.name} value={coin.name}>{coin.name}</option>
                                ))}
                            </select>
                        </div>
                        <span className="text-gray-400">$0</span>
                    </div>
                </div>

                <button className="w-full bg-green-600 text-black py-2 mt-4 rounded-lg font-bold">Connect Wallet</button>
            </div>
        </div>
    );
}
