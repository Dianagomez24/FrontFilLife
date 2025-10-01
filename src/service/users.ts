import axios from './axiosInstance'
import type { UpdateUserDto, UserProfile, DatosFisicos } from '../types/userTypes'
import type { CreateDatosFisicosDto, UpdateDatosFisicosDto } from '../types/datosFisicosTypes'

export const getProfile = async (): Promise<UserProfile> => {
  const response = await axios.get('/users/profile')
  return response.data.user
}

export const updateProfile = async (data: UpdateUserDto) => {
  const response = await axios.put('/users/profile', data)
  return response.data
}

export const createDatosFisicos = async (data: CreateDatosFisicosDto) => {
  const response = await axios.post('/users/datos-fisicos', data)
  return response.data
}

export const getDatosFisicos = async (): Promise<DatosFisicos> => {
  const response = await axios.get('/users/datos-fisicos')
  return response.data.datosFisicos
}

export const updateDatosFisicos = async (data: UpdateDatosFisicosDto) => {
  const response = await axios.put('/users/datos-fisicos', data)
  return response.data
}
