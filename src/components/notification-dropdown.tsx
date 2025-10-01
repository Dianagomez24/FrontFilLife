"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, X } from "lucide-react"
import { useNotifications } from "../hooks/use-notifications"
import { NotificationsList } from "./notifications-list"

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { unreadCount } = useNotifications()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary relative p-2 hover:scale-105 transition-transform duration-200"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 md:pt-20 md:pr-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm mx-4 md:mx-0 md:w-96 transform transition-all duration-300 scale-95 origin-top-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#f8f8f6] to-[#f0f0f0] rounded-t-2xl">
              <div className="flex items-center gap-3">


                <div className="w-10 h-10 bg-gradient-to-br from-[#959581] to-[#aeb99d] rounded-xl flex items-center justify-center shadow-sm">
                  <Bell className="text-white" size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2d3319] text-lg">Notificaciones</h3>
                  <p className="text-[#bcc591] text-sm">
                    {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todas leídas'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#959581] hover:text-[#2d3319] hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              <NotificationsList onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}