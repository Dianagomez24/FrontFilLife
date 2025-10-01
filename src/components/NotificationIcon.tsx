"use client"

import { Bell } from "lucide-react"
import { useNotifications } from "../hooks/use-notifications"

interface NotificationIconProps {
  onNavigate: () => void;
}

export function NotificationIcon({ onNavigate }: NotificationIconProps) {
  const { unreadCount } = useNotifications()

  const handleClick = () => {
    onNavigate()
  }

  return (
    <button
      onClick={handleClick}
      className="btn btn-secondary relative p-2 hover:scale-105 transition-transform duration-200"
      aria-label={`Notificaciones (${unreadCount} sin leer)`}
    >
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="notification-badge-improved">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}