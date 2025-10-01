export const TipoNotificacion = {
  EJERCICIO: "ejercicio",
  NUTRICION: "nutricion",
  META: "meta",
  GENERAL: "general",
} as const;

export type TipoNotificacion = typeof TipoNotificacion[keyof typeof TipoNotificacion];

export interface Notification {
  id?: number
  usuarioId?: number
  tipo: TipoNotificacion
  titulo: string
  mensaje: string
  leida: boolean
  fechaProgramada?: string
  fechaCreacion?: string

  
}

export interface CreateNotificationDto {
  tipo: TipoNotificacion
  titulo: string
  mensaje: string
  fechaProgramada?: string
}

export interface UpdateNotificationDto {
  leida?: boolean
}