import { ThemeProvider } from "./theme-provider"

function RootLayout( { children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-screen relative">
        {children}
      </div>
    </ThemeProvider>
  )
}

export default RootLayout