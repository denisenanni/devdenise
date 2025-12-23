/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { useReducedMotion } from '../hooks/useReducedMotion';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
}

interface NotificationContextValue {
  showNotification: (type: NotificationType, title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

const notificationIcons: Record<NotificationType, JSX.Element> = {
  success: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  error: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
  info: (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
};

const notificationColors: Record<NotificationType, string> = {
  success: '#4ade80',
  error: '#f87171',
  info: 'var(--accent)',
};

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const showNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const notification: Notification = { id, type, title, message };

    setNotifications((prev) => [...prev, notification]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* Notification Container */}
      <div
        className={`fixed z-[200] flex flex-col gap-3 ${
          isMobile
            ? 'bottom-20 left-4 right-4'
            : 'top-16 right-6'
        }`}
        style={{
          maxWidth: isMobile ? 'calc(100% - 32px)' : '380px',
        }}
      >
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
              className="relative rounded-lg shadow-xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: 'var(--window-bg)',
                border: '1px solid var(--window-border)',
              }}
              onClick={() => dismissNotification(notification.id)}
            >
              {/* Color accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: notificationColors[notification.type] }}
              />

              <div className="flex items-start gap-3 p-4 pl-5">
                {/* Icon */}
                <div
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: notificationColors[notification.type] }}
                >
                  {notificationIcons[notification.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-medium text-sm"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {notification.title}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {notification.message}
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(notification.id);
                  }}
                  className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Dismiss notification"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>

              {/* Progress bar - hidden when reduced motion is preferred */}
              {!prefersReducedMotion && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-0.5"
                  style={{ backgroundColor: notificationColors[notification.type], opacity: 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}
