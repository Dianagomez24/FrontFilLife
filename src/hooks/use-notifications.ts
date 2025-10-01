import { useState, useEffect, useCallback } from "react"
import { notificationsService } from "../service/notifications"
import type { Notification, CreateNotificationDto } from "../types/notification"

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await notificationsService.getAll()
      setNotifications(response || [])
      
      const unread = response.filter((notification: Notification) => !notification.leida).length
      setUnreadCount(unread)
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar notificaciones")
      console.error("Error loading notifications:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNotifications()

    const interval = setInterval(loadNotifications, 30000)

    return () => clearInterval(interval)
  }, [loadNotifications])

  const markAsRead = async (notificationId: number) => {
    try {
      setError(null)
      await notificationsService.markAsRead(notificationId)
      
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, leida: true } : notif
        )
      )
      setUnreadCount(prev => prev - 1)
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al marcar como leída")
      console.error("Error marking notification as read:", err)
      throw err
    }
  }

  const markAllAsRead = async () => {
    try {
      setError(null)
      const unreadNotifications = notifications.filter(notif => !notif.leida)
      await Promise.all(
        unreadNotifications.map(notif => notificationsService.markAsRead(notif.id!))
      )
      await loadNotifications() 


    } catch (err: any) {
      setError(err.response?.data?.message || "Error al marcar todas como leídas")
      console.error("Error marking all as read:", err)
      throw err
    }
  }

  const deleteNotification = async (notificationId: number) => {
    try {
      setError(null)
      await notificationsService.delete(notificationId)
      
      setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
      

      const notification = notifications.find(n => n.id === notificationId)
      if (notification && !notification.leida) {
        setUnreadCount(prev => prev - 1)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar notificación")
      console.error("Error deleting notification:", err)
      throw err
    }
  }

  const createNotification = async (notificationData: CreateNotificationDto) => {
    try {
      setError(null)
      const newNotification = await notificationsService.create(notificationData)
      setNotifications(prev => [newNotification, ...prev])
      if (!newNotification.leida) {
        setUnreadCount(prev => prev + 1)
      }
      return newNotification
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear notificación")
      console.error("Error creating notification:", err)
      throw err
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    refetch: loadNotifications
  }
}