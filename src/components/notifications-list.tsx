"use client"

import { Bell, Check, Trash2, Clock, Dumbbell, Apple, Target, Info } from "lucide-react"
import { useNotifications } from "../hooks/use-notifications"
import type { Notification, TipoNotificacion } from "../types/notification"
import { TipoNotificacion as Tipos } from "../types/notification"

interface NotificationsListProps {
  onClose?: () => void
}

export function NotificationsList({ onClose }: NotificationsListProps) {
  const { notifications, loading, error, markAsRead, markAllAsRead, deleteNotification } = useNotifications()

  const getIconByType = (tipo: TipoNotificacion) => {
    switch (tipo) {
      case Tipos.EJERCICIO:
        return Dumbbell
      case Tipos.NUTRICION:
        return Apple
      case Tipos.META:
        return Target
      default:
        return Info
    }
  }

  const getColorByType = (tipo: TipoNotificacion) => {
    switch (tipo) {
      case Tipos.EJERCICIO:
        return "from-[#959581] to-[#aeb99d]"
      case Tipos.NUTRICION:
        return "from-[#aeb99d] to-[#c4c9b5]"
      case Tipos.META:
        return "from-[#bcc591] to-[#959581]"
      default:
        return "from-[#c4c9b5] to-[#bcc591]"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-full flex items-center justify-center mb-3 animate-pulse">
          <Bell className="text-white" size={20} />
        </div>
        <p className="text-[#2d3319] text-sm">Cargando notificaciones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg m-4 text-sm">
        {error}
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Bell className="text-gray-400" size={24} />
        </div>
        <p className="text-[#bcc591] text-lg font-medium mb-2">No tienes notificaciones</p>
        <p className="text-[#bcc591] text-sm text-center">Te avisaremos cuando tengas nuevas alertas o recordatorios</p>
      </div>
    )
  }

  return (
    <div className="p-2">
      {notifications.map((notification) => {
        const Icon = getIconByType(notification.tipo)
        return (
          <div
            key={notification.id}
            className={`group p-4 rounded-xl border transition-all duration-200 ${
              notification.leida 
                ? 'bg-white border-gray-200 hover:border-gray-300' 
                : 'bg-blue-50 border-blue-200 hover:border-blue-300 shadow-sm'
            } mb-3 last:mb-0 hover:shadow-md`}
          >
            <div className="flex gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${getColorByType(notification.tipo)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <Icon className="text-white" size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className={`font-semibold text-base leading-tight ${notification.leida ? 'text-[#2d3319]' : 'text-[#2d3319] font-bold'}`}>
                      {notification.titulo}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        notification.tipo === 'ejercicio' ? 'bg-blue-100 text-blue-800' :
                        notification.tipo === 'nutricion' ? 'bg-green-100 text-green-800' :
                        notification.tipo === 'meta' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {notification.tipo.charAt(0).toUpperCase() + notification.tipo.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {!notification.leida && (
                      <button
                        onClick={() => notification.id && markAsRead(notification.id)}
                        className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Marcar como leída"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => notification.id && deleteNotification(notification.id)}
                      className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-[#5a6153] text-sm leading-relaxed mb-3">
                  {notification.mensaje}
                </p>
                
                <div className="flex items-center justify-between text-xs text-[#bcc591]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{formatDate(notification.fechaCreacion)}</span>
                    </div>
                    {notification.fechaProgramada && (
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#bcc591] rounded-full"></span>
                        <span>Programado: {formatDate(notification.fechaProgramada)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}