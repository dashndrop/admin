import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './AuthContext';

interface NotificationContextType {
    unreadCount: number;
    refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const { isAuthenticated } = useAuth();

    const refreshNotifications = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            const response = await api.getNotifications({ read: false, page: 1, per_page: 1 });
            setUnreadCount(response.total || 0);
        } catch (error) {
            console.error('Failed to fetch unread notification count:', error);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            refreshNotifications();
            // Polling for new notifications every 1 minute
            const interval = setInterval(refreshNotifications, 60000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated, refreshNotifications]);

    return (
        <NotificationContext.Provider value={{ unreadCount, refreshNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
