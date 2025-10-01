export interface CreateDatosFisicosDto {
  edad: number;
  sexo: 'M' | 'F' | 'Otro';
  peso: number;
  altura: number;
  nivelActividad: 'Sedentario' | 'Ligero' | 'Moderado' | 'Intenso';
  objetivo?: string;
  experiencia?: 'Principiante' | 'Intermedio' | 'Avanzado';
  limitaciones?: string;
}

export interface UpdateDatosFisicosDto {
  edad?: number;
  sexo?: 'M' | 'F' | 'Otro';
  peso?: number;
  altura?: number;
  nivelActividad?: 'Sedentario' | 'Ligero' | 'Moderado' | 'Intenso';
  objetivo?: string;
  experiencia?: 'Principiante' | 'Intermedio' | 'Avanzado';
  limitaciones?: string;
}
