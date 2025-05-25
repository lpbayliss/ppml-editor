import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing session storage with automatic serialization/deserialization
 * @param key - The session storage key
 * @param initialValue - The initial value to use if no stored value exists
 * @returns [storedValue, setValue, removeValue]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  // Get from session storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error setting sessionStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  // Function to remove the value from session storage
  const removeValue = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  // Listen for changes to the session storage key from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === window.sessionStorage) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue
          setStoredValue(newValue)
        } catch (error) {
          console.warn(`Error parsing sessionStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
} 