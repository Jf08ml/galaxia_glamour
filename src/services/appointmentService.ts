import { apiAppointment } from "./axiosConfig";
import { handleAxiosError } from "../utils/handleAxiosError";
import { Service } from "./serviceService";
import { Employee } from "./employeeService";
import { Client } from "./clientService";

// Definir la estructura de una cita
export interface Appointment {
  _id: string;
  client: Client;
  service: Service;
  employee: Employee;
  employeeRequestedByClient: boolean;
  startDate: Date;
  endDate: Date;
  status: string;
  organizationId: string;
  advancePayment: number;
}

interface CreateAppointmentPayload {
  service: Service;
  client: Client;
  employee: Employee;
  startDate: Date;
  endDate: Date;
  status: string;
  organizationId: string;
}

interface Response<T> {
  code: number;
  status: string;
  data: T;
  message: string;
}

// Obtener todas las citas
export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await apiAppointment.get<Response<Appointment[]>>("/");
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, "Error al obtener las citas");
    return [];
  }
};

// Obtener citas por organizationId con rango de fechas opcional
export const getAppointmentsByOrganizationId = async (
  organizationId: string,
  startDate?: string, // Fecha de inicio opcional
  endDate?: string // Fecha de fin opcional
): Promise<Appointment[]> => {
  try {
    // Construir los parámetros de consulta si las fechas están definidas
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    // Construir la URL con los parámetros de consulta
    const url = `/organization/${organizationId}/dates${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const response = await apiAppointment.get<Response<Appointment[]>>(url);
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, "Error al obtener las citas por organización");
    return [];
  }
};

// Obtener una cita por ID
export const getAppointmentById = async (
  appointmentId: string
): Promise<Appointment | undefined> => {
  try {
    const response = await apiAppointment.get<Response<Appointment>>(
      `/${appointmentId}`
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, "Error al obtener la cita");
  }
};

export const getAppointmentsByEmployee = async (
  employeeId: string
): Promise<Appointment[]> => {
  try {
    const response = await apiAppointment.get<Response<Appointment[]>>(
      `/employee/${employeeId}`
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, "Error al obtener las citas");
    return [];
  }
};

// Crear una nueva cita
export const createAppointment = async (
  appointmentData: CreateAppointmentPayload
): Promise<Appointment | undefined> => {
  try {
    const response = await apiAppointment.post<Response<Appointment>>(
      "/",
      appointmentData
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, "Error al crear la cita");
  }
};

// Actualizar una cita
export const updateAppointment = async (
  appointmentId: string,
  updatedData: Partial<Appointment>
): Promise<Appointment | undefined> => {
  try {
    const response = await apiAppointment.put<Response<Appointment>>(
      `/${appointmentId}`,
      updatedData
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error, "Error al actualizar la cita");
  }
};

// Eliminar una cita
export const deleteAppointment = async (
  appointmentId: string
): Promise<void> => {
  try {
    await apiAppointment.delete<Response<void>>(`/${appointmentId}`);
  } catch (error) {
    handleAxiosError(error, "Error al eliminar la cita");
  }
};
