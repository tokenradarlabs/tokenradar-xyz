import { useEffect, useRef, useState, useCallback } from 'react';

interface AutoSaveOptions<T> {
  key: string;
  data: T;
  initialData: T; // New: initial state of the form
  onRestore?: (data: T) => void;
  onSave?: (data: T) => void;
  interval?: number; // in milliseconds
}

export const useAutoSave = <T>(options: AutoSaveOptions<T>) => {
  const { key, data, initialData, onRestore, onSave, interval = 3000 } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDirty, setIsDirty] = useState(false); // New: Tracks if current data is different from last saved
  const dataRef = useRef(data);
  const initialDataRef = useRef(initialData); // New: Reference to initial data

  useEffect(() => {
    dataRef.current = data;
    // Check if data has changed from initialData or last saved data to set dirty state
    if (JSON.stringify(data) !== JSON.stringify(initialDataRef.current)) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [data, initialDataRef]);

  const save = useCallback(() => {
    setIsSaving(true);
    try {
      localStorage.setItem(key, JSON.stringify(dataRef.current));
      setLastSaved(new Date());
      setIsDirty(false); // Data is no longer dirty after saving
      onSave?.(dataRef.current);
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    } finally {
      setIsSaving(false);
    }
  }, [key, onSave]);

  const restore = useCallback(() => {
    try {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const parsedData: T = JSON.parse(savedData);
        onRestore?.(parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error('Failed to restore data from localStorage:', error);
    }
    return null;
  }, [key, onRestore]);

  const clearSavedData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setIsDirty(false); // No saved data, so not dirty from a saved state perspective
    } catch (error) {
      console.error('Failed to clear data from localStorage:', error);
    }
  }, [key]);

  useEffect(() => {
    // Attempt to restore on mount
    const restored = restore();
    if (restored) {
        initialDataRef.current = restored; // If restored, this becomes the new initial state
    }
    const intervalId = setInterval(save, interval);
    return () => clearInterval(intervalId);
  }, [save, interval, restore]);

  return { isSaving, lastSaved, isDirty, restore, clearSavedData };
};

// This function is no longer directly used for beforeunload, relying on isDirty from the hook.
// export const hasUnsavedData = (key: string): boolean => {
//   if (typeof window === 'undefined') return false;
//   return localStorage.getItem(key) !== null;
// };

