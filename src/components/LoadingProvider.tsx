"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import LoadingAnimation from './LoadingAnimation'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => { }
})

export const useLoading = () => useContext(LoadingContext)

interface LoadingProviderProps {
  children: React.ReactNode
  enableRouteChangeLoading?: boolean
  loadingDuration?: number
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  enableRouteChangeLoading = true,
  loadingDuration = 3000
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const pathname = usePathname()

  // Handle initial page load
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad && enableRouteChangeLoading) {
      // Skip loading animation if we have a scroll target
      const hasScrollTarget = window.localStorage.getItem('scrollTarget')

      if (hasScrollTarget) {
        // Skip loading, show content immediately
        setIsLoading(false)
        setShowContent(true)
        return
      }

      setIsLoading(true)
      setShowContent(false)

      const timer = setTimeout(() => {
        setIsLoading(false)
        setShowContent(true)
      }, Math.min(loadingDuration / 2, 1500))

      return () => clearTimeout(timer)
    }
  }, [pathname, isInitialLoad, enableRouteChangeLoading, loadingDuration])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Delay showing content slightly to ensure smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 200)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {/* Always render LoadingAnimation first */}
      {isLoading && (
        <LoadingAnimation
          onLoadingComplete={handleLoadingComplete}
          duration={isInitialLoad ? loadingDuration : Math.min(loadingDuration / 2, 1500)}
        />
      )}

      {/* Only render children when loading is complete and content should be shown */}
      {showContent && !isLoading && (
        <div
          style={{
            opacity: showContent ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {children}
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider