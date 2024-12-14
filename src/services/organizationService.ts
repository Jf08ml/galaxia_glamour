import { apiOrganization } from "./axiosConfig";
import { AxiosResponse } from "axios";

interface Role {
  name: string;
  permissions: string[];
}

// Definir la estructura de la organización
export interface Organization {
  _id?: string;
  name: string;
  email: string;
  location: {
    lat: number; // Latitud de la ubicación
    lng: number; // Longitud de la ubicación
  };
  address?: string; // Dirección formateada (opcional)
  password?: string;
  phoneNumber: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  tiktokUrl?: string;
  role: Role;
  isActive?: boolean;
}

// Crear una nueva organización
export const createOrganization = async (
  organizationData: Organization
): Promise<Organization | null> => {
  try {
    const response: AxiosResponse<{ data: Organization }> =
      await apiOrganization.post("/", organizationData);
    return response.data.data;
  } catch (error) {
    console.error("Error al crear la organización:", error);
    return null;
  }
};

// Obtener todas las organizaciones
export const getOrganizations = async (): Promise<Organization[] | null> => {
  try {
    const response: AxiosResponse<{ data: Organization[] }> =
      await apiOrganization.get("/");
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener las organizaciones:", error);
    return null;
  }
};

// Obtener una organización por ID
export const getOrganizationById = async (
  organizationId: string
): Promise<Organization | null> => {
  try {
    const response: AxiosResponse<{ data: Organization }> =
      await apiOrganization.get(`/${organizationId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener la organización:", error);
    return null;
  }
};

// Actualizar una organización
export const updateOrganization = async (
  organizationId: string,
  updatedData: Partial<Organization>
): Promise<Organization | null> => {
  try {
    const response: AxiosResponse<{ data: Organization }> =
      await apiOrganization.put(`/${organizationId}`, updatedData);
    return response.data.data;
  } catch (error) {
    console.error("Error al actualizar la organización:", error);
    return null;
  }
};

// Eliminar una organización
export const deleteOrganization = async (
  organizationId: string
): Promise<void> => {
  try {
    await apiOrganization.delete(`/${organizationId}`);
  } catch (error) {
    console.error("Error al eliminar la organización:", error);
  }
};
