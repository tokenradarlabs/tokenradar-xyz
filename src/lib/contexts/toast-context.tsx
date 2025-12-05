'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Toast, { ToastType } from '@/components/ui/toast';
import { AnimatePresence } from 'framer-motion';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const MAX_VISIBLE_TOASTS = 3;
  const TOAST_TIMEOUT = 5000; // 5 seconds

  const [visibleToasts, setVisibleToasts] = useState<ToastMessage[]>([]);
  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setVisibleToasts(prevVisibleToasts => {
      const updatedVisibleToasts = prevVisibleToasts.filter(toast => toast.id !== id);
      if (toastQueue.length > 0) {
        const nextToast = toastQueue[0];
        setToastQueue(prevQueue => prevQueue.slice(1));
        setTimeout(() => dismissToast(nextToast.id), TOAST_TIMEOUT);
        return [...updatedVisibleToasts, nextToast];
      }
      return updatedVisibleToasts;
    });
  }, [toastQueue]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = uuidv4();
    const newToast = { id, message, type };

    setVisibleToasts(prevVisibleToasts => {
      if (prevVisibleToasts.length < MAX_VISIBLE_TOASTS) {
        setTimeout(() => dismissToast(id), TOAST_TIMEOUT);
        return [...prevVisibleToasts, newToast];
      } else {
        setToastQueue(prevQueue => [...prevQueue, newToast]);
        return prevVisibleToasts;
      }
    });
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className='fixed bottom-4 right-4 z-[9999]'>
        <AnimatePresence>
          {visibleToasts.map(toast => (
            <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
