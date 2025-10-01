import axios from "./axiosInstance"
import type { Notification, CreateNotificationDto, UpdateNotificationDto, TipoNotificacion } from "../types/notification"


export { TipoNotificacion } from "../types/notification"

export const notificationsService = {

  async create(notificationData: CreateNotificationDto) {

    const response = await axios.post("/notifications", notificationData)
    return response.data
  },

  async getAll() {
    const response = await axios.get("/notifications")

    return response.data
  },

  async getUnread() {
    const response = await axios.get("/notifications/unread")
    return response.data
  },

  async markAsRead(notificationId: number) {
    const response = await axios.put(`/notifications/${notificationId}/read`)
    return response.data
  },

  async delete(notificationId: number) {
    const response = await axios.delete(`/notifications/${notificationId}`)
    
    return response.data
  }
}