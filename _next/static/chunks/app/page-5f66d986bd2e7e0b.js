(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{705:(e,s,t)=>{"use strict";t.d(s,{SwapModal:()=>j});var a=t(5155),r=t(2115),l=t(3463),n=t(9795);function o(){for(var e=arguments.length,s=Array(e),t=0;t<e;t++)s[t]=arguments[t];return(0,n.QP)((0,l.$)(s))}function i(e){let{className:s,...t}=e;return(0,a.jsx)("div",{"data-slot":"card",className:o("bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-sm",s),...t})}function d(e){let{className:s,...t}=e;return(0,a.jsx)("div",{"data-slot":"card-content",className:o("px-6",s),...t})}var c=t(2317);let x=(0,t(1027).F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",outline:"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function u(e){let{className:s,variant:t,size:r,asChild:l=!1,...n}=e,i=l?c.DX:"button";return(0,a.jsx)(i,{"data-slot":"button",className:o(x({variant:t,size:r,className:s})),...n})}function m(e){let{className:s,type:t,...r}=e;return(0,a.jsx)("input",{type:t,"data-slot":"input",className:o("border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",s),...r})}var b=t(9577),h=t(50),g=t(4807),p=t(1719),f=t(8867);function v(e){let{token:s,tokens:t,onSelect:r}=e;return(0,a.jsxs)(h.bL,{value:s.symbol,onValueChange:e=>{let s=t.find(s=>s.symbol===e);s&&r(s)},children:[(0,a.jsxs)(h.l9,{className:o("flex items-center space-x-2 bg-[#383838] hover:bg-[#404040] px-3 py-1.5 rounded-full"),children:[s.logo?(0,a.jsx)("img",{src:s.logo,alt:s.symbol,className:"w-5 h-5 rounded-full"}):(0,a.jsx)(g.A,{className:"w-5 h-5 text-white"}),(0,a.jsx)(h.WT,{className:"text-base font-semibold font-sans text-white"}),(0,a.jsx)(h.In,{className:"text-white",children:(0,a.jsx)(p.A,{className:"w-4 h-4"})})]}),(0,a.jsx)(h.ZL,{children:(0,a.jsx)(h.UC,{className:o("z-50 bg-[#2C2C2C] rounded-md shadow-lg"),children:(0,a.jsx)(h.LM,{className:"p-2",children:t.map((e,s)=>(0,a.jsxs)(h.q7,{value:e.symbol,className:o("flex items-center px-2 py-1 cursor-pointer rounded-md hover:bg-[#383838]"),children:[e.logo?(0,a.jsx)("img",{src:e.logo,alt:e.symbol,className:"w-5 h-5 rounded-full mr-2"}):(0,a.jsx)(g.A,{className:"w-5 h-5 text-white mr-2"}),(0,a.jsx)(h.p4,{className:"token-item-text font-sans",children:e.symbol}),(0,a.jsx)(h.VF,{className:"ml-auto",children:(0,a.jsx)(f.A,{className:"w-4 h-4 text-white"})})]},"".concat(e.symbol,"-").concat(s)))})})})]})}function j(){let[e,s]=(0,r.useState)(""),[t,l]=(0,r.useState)(""),[n]=(0,r.useState)({symbol:"MONET",name:"MONET"}),[o,c]=(0,r.useState)({symbol:"USDC",name:"USD Coin"}),[x,h]=(0,r.useState)([]);return(0,r.useEffect)(()=>{fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(e=>e.json()).then(e=>{let s=e.map(e=>({symbol:e.symbol.toUpperCase(),name:e.name,logo:e.image}));h(s),s.length>0&&c(s[0])}).catch(e=>{console.error("Error fetching token list:",e)})},[]),(0,a.jsx)(i,{className:"w-[440px] bg-[#1C1C1C] border border-[#383838] backdrop-blur-md rounded-xl shadow-xl",children:(0,a.jsxs)(d,{className:"p-4",children:[(0,a.jsxs)("div",{className:"rounded-2xl bg-[#2C2C2C] p-4 mb-3",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("span",{className:"text-sm text-gray-400",children:"From"}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[n.logo?(0,a.jsx)("img",{src:n.logo,alt:n.symbol,className:"w-6 h-6 rounded-full"}):(0,a.jsx)("div",{className:"w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"}),(0,a.jsx)("span",{className:"text-white font-semibold",children:n.symbol})]})]}),(0,a.jsx)(m,{type:"number",placeholder:"0.0",value:e,onChange:e=>{let t=e.target.value;s(t);let a=parseFloat(t);isNaN(a)?l(""):l((a*(.5+Math.random())).toFixed(2))},className:"bg-transparent text-white text-3xl font-semibold placeholder:text-gray-600 focus:outline-none border-b border-gray-600 pb-1"}),(0,a.jsxs)("div",{className:"flex justify-between items-center mt-2",children:[(0,a.jsx)("span",{className:"text-xs text-gray-500",children:"Balance: 0.00"}),(0,a.jsxs)("div",{className:"flex space-x-2",children:[(0,a.jsx)("button",{className:"text-xs text-blue-400 hover:text-blue-300 bg-[#383838] px-2 py-1 rounded-full",children:"50%"}),(0,a.jsx)("button",{className:"text-xs text-blue-400 hover:text-blue-300 bg-[#383838] px-2 py-1 rounded-full",children:"MAX"})]})]})]}),(0,a.jsx)("div",{className:"flex justify-center -my-3 relative z-10",children:(0,a.jsx)(u,{variant:"ghost",size:"icon",onClick:()=>{console.log("Switch tokens - fromToken is static and cannot be switched")},className:"rounded-full bg-[#1C1C1C] border border-[#383838] hover:bg-[#2C2C2C] h-10 w-10 cursor-not-allowed",disabled:!0,children:(0,a.jsx)(b.A,{className:"h-5 w-5 text-blue-400"})})}),(0,a.jsxs)("div",{className:"rounded-2xl bg-[#2C2C2C] p-4 mb-4",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,a.jsx)("span",{className:"text-sm text-gray-400",children:"To"}),(0,a.jsx)(v,{token:o,tokens:x.length?x:[],onSelect:c})]}),(0,a.jsx)(m,{type:"number",placeholder:"0.0",value:t,onChange:e=>l(e.target.value),className:"bg-transparent text-white text-3xl font-semibold placeholder:text-gray-600 focus:outline-none border-b border-gray-600 pb-1"}),(0,a.jsxs)("div",{className:"flex justify-between items-center mt-2",children:[(0,a.jsx)("span",{className:"text-xs text-gray-500",children:"Balance: 0.00"}),(0,a.jsx)("span",{className:"text-xs text-gray-500",children:"≈ $0.00"})]})]}),(0,a.jsxs)("div",{className:"rounded-2xl bg-[#2C2C2C] p-3 mb-4",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)("span",{className:"text-sm text-gray-400",children:"Route"}),(0,a.jsx)("span",{className:"text-sm text-gray-400",children:"Best price"})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-2 mt-2",children:[(0,a.jsx)("div",{className:"w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"}),(0,a.jsx)("span",{className:"text-gray-400",children:"→"}),(0,a.jsx)("div",{className:"w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500"})]})]}),(0,a.jsx)(u,{className:"w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-medium text-lg",onClick:()=>{console.log("Swap initiated")},children:"Swap"})]})})}},7778:(e,s,t)=>{Promise.resolve().then(t.bind(t,705))}},e=>{var s=s=>e(e.s=s);e.O(0,[526,441,587,358],()=>s(7778)),_N_E=e.O()}]);