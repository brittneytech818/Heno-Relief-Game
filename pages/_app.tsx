import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"

import type { AppProps } from "next/app"
import { RainbowKitProvider, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { zora, zoraTestnet } from "@wagmi/core/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { ToastContainer } from "react-toastify"
import { SessionProvider } from "next-auth/react"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "../providers/ThemeProvider"

const isMainnet = !process.env.NEXT_PUBLIC_TESTNET
const myChains = [isMainnet ? zora : zoraTestnet]
const { chains, provider, webSocketProvider } = configureChains(myChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const { connectors } = getDefaultWallets({
  appName: "Relief Game",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_KEY,
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={darkTheme({
          accentColor: "#ffa337",
          accentColorForeground: "white",
          borderRadius: "large",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <ThemeProvider>
          <SessionProvider>
            <Component {...pageProps} />
            <ToastContainer />
            <Analytics />
          </SessionProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
