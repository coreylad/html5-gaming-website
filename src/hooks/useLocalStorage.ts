import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing localStorage with React state synchronization
 * Provides production-ready local storage integration with React state
 * 
 * @param key - The localStorage key
 * @param initialValue - Default value if key doesn't exist
 * @returns [value, setValue] tuple similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Save state and get the new value
        setStoredValue((currentValue) => {
          const valueToStore =
            value instanceof Function ? value(currentValue) : value

          // Save to local storage
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }

          return valueToStore
        })
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key]
  )

  // Listen for changes to this key in other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}
