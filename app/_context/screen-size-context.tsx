"use client"

import {
  createContext,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useState,
} from "react"
import { useDebounce } from "use-debounce"

const ScreenSizeContext = createContext<boolean>(false)

export const ScreenSizeProvider = ({ children }: PropsWithChildren) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [debouncedValue] = useDebounce(isSmallScreen, 200)

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 768px)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches)
    }

    setIsSmallScreen(mediaQueryList.matches)
    mediaQueryList.addEventListener("change", handleChange)

    return () => {
      mediaQueryList.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <ScreenSizeContext.Provider value={debouncedValue}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

export const useScreenSize = () => useContext(ScreenSizeContext)
