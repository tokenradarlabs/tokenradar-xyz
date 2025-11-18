import { useEffect, useRef, useState, useCallback } from 'react';

interface AutoSaveOptions<T> {
  key: string;
  data: T;
  onRestore?: (data: T) => void;
  onSave?: (data: T) => void;
  interval?: number; // in milliseconds
}

export const useAutoSave = <T>(options: AutoSaveOptions<T>) => {
  const { key, data, onRestore, onSave, interval = 3000 } = options;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const save = useCallback(() => {
    setIsSaving(true);
    try {
      localStorage.setItem(key, JSON.stringify(dataRef.current));
      setLastSaved(new Date());
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
    } catch (error) {
      console.error('Failed to clear data from localStorage:', error);
    }
  }, [key]);

  useEffect(() => {
    // Attempt to restore on mount
    restore();

    const intervalId = setInterval(save, interval);
    return () => clearInterval(intervalId);
  }, [save, interval, restore]);

  return { isSaving, lastSaved, restore, clearSavedData };
};

export const hasUnsavedData = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(key) !== null;
};
