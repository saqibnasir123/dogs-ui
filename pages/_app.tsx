// this is a special file in next js which handles the initialization of our pages
import { Provider } from "@/components/ui/provider"
import { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}