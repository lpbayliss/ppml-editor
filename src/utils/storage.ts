/**
 * Utility functions for managing session storage
 */

export const STORAGE_KEYS = {
  PSML_DOCUMENT: 'psml-editor-document',
  USER_PREFERENCES: 'psml-editor-preferences',
} as const

/**
 * Safely get an item from session storage with error handling
 */
export function getSessionStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = window.sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Error reading sessionStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Safely set an item in session storage with error handling
 */
export function setSessionStorageItem<T>(key: string, value: T): boolean {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error setting sessionStorage key "${key}":`, error)
    return false
  }
}

/**
 * Safely remove an item from session storage
 */
export function removeSessionStorageItem(key: string): boolean {
  try {
    window.sessionStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing sessionStorage key "${key}":`, error)
    return false
  }
}

/**
 * Check if session storage is available
 */
export function isSessionStorageAvailable(): boolean {
  try {
    const testKey = '__test__'
    window.sessionStorage.setItem(testKey, 'test')
    window.sessionStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

/**
 * Get the size of session storage in bytes (approximate)
 */
export function getSessionStorageSize(): number {
  let total = 0
  try {
    for (const key in window.sessionStorage) {
      if (window.sessionStorage.hasOwnProperty(key)) {
        const value = window.sessionStorage.getItem(key)
        total += key.length + (value?.length || 0)
      }
    }
  } catch (error) {
    console.warn('Error calculating session storage size:', error)
  }
  return total
}

/**
 * Clear all PSML editor related data from session storage
 */
export function clearPSMLEditorData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeSessionStorageItem(key)
  })
} 