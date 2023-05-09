"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./globals.css"

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
}

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  )
}
