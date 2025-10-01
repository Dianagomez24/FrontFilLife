"use client"

import { Bell, CheckCircle, Trash2, Filter } from "lucide-react"
import { useState } from "react"
import { useNotifications } from "../hooks/use-notifications"
import type { Notification, TipoNotificacion } from "../types/notification"
import { TipoNotificacion as Tipos } from "../types/notification"

export default function NotificationsPage() {
  const { notifications, loading, error, markAsRead, markAllAsRead, deleteNotification } = useNotifications()
  const [filter, setFilter] = useState<TipoNotificacion | 'all'>('all')

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(notification => notification.tipo === filter)

  const getIconByType = (tipo: TipoNotificacion) => {
    switch (tipo) {
      case Tipos.EJERCICIO:
        return "🏋️"
      case Tipos.NUTRICION:
        return "🍎"
      case Tipos.META:
        return "🎯"
      default:
        return "ℹ️"
    }
  }

  const getTypeLabel = (tipo: TipoNotificacion) => {
    switch (tipo) {
      case Tipos.EJERCICIO:
        return "Ejercicio"
      case Tipos.NUTRICION:
        return "Nutrición"
      case Tipos.META:
        return "Meta"
      default:
        return "General"
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="loading">
            <div className="loading-spinner">
              <Bell className="text-white" size={24} />
            </div>
            <p className="text-[#2d3319]">Cargando notificaciones...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="page-title">Notificaciones</h1>
          <p className="page-subtitle">Gestiona tus alertas y recordatorios</p>
        </div>

        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-[#959581]" />
                <span className="text-sm font-medium text-[#2d3319]">Filtrar por:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Todas
                </button>
                {Object.values(Tipos).map(tipo => (
                  <button
                    key={tipo}
                    onClick={() => setFilter(tipo)}
                    className={`btn btn-sm ${filter === tipo ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {getTypeLabel(tipo)}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={markAllAsRead}
              className="btn btn-primary btn-sm"
            >
              <CheckCircle size={16} />
              Marcar todas como leídas
            </button>
          </div>
        </div>

        
        <div className="card">
          
          {error && (
            <div className="bg-red-50 border-b border-red-200 text-red-700 px-6 py-4 rounded-t-lg">
              {error}
            </div>
          )}

          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Bell className="text-gray-400" size={24} />
              </div>
              <p className="empty-state-title">
                {filter === 'all' 
                  ? 'No hay notificaciones' 
                  : `No hay notificaciones de ${getTypeLabel(filter as TipoNotificacion)}`
                }
              </p>
              <p className="empty-state-description">
                {filter === 'all' 
                  ? 'No tienes notificaciones en este momento' 
                  : 'Intenta con otro filtro o crea nuevas notificaciones'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 transition-all hover:bg-gray-50 ${
                    notification.leida ? 'bg-white' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl flex-shrink-0">
                      {getIconByType(notification.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-semibold text-lg ${notification.leida ? 'text-[#2d3319]' : 'text-[#2d3319]'}`}>
                            {notification.titulo}
                          </h3>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium mt-1">
                            {getTypeLabel(notification.tipo)}
                          </span>
                        </div>
                        <div className="flex gap-2 ml-4 flex-shrink-0">
                          {!notification.leida && (
                            <button
                              onClick={() => notification.id && markAsRead(notification.id)}
                              className="btn btn-secondary btn-sm"
                              title="Marcar como leída"
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button
                            onClick={() => notification.id && deleteNotification(notification.id)}
                            className="btn btn-danger btn-sm"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-[#5a6153] mb-3">{notification.mensaje}</p>
                      <div className="flex items-center gap-4 text-sm text-[#bcc591]">
                        <span>Creado: {formatDate(notification.fechaCreacion)}</span>
                        {notification.fechaProgramada && (
                          <span>Programado: {formatDate(notification.fechaProgramada)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}