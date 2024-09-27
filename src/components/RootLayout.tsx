import { ModeToggle } from "./mode-toggle"
import { ThemeProvider } from "./theme-provider"

function RootLayout( { children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="h-screen relative">
        {children}
        <div className="absolute bottom-0 right-0 p-2">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default RootLayout