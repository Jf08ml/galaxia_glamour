import axios, { AxiosInstance } from "axios";

const API_BASE_URL: string =
  import.meta.env.VITE_NODE_ENV === "production"
    ? (import.meta.env.VITE_APP_API_URL as string)
    : (import.meta.env.VITE_APP_API_URL_DEPLOYMENT as string);

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

// Crear instancias de Axios para diferentes partes de la API
const apiClient: AxiosInstance = createAxiosInstance(`${API_BASE_URL}/clients`);
const apiAppointment: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/appointments`
);
const apiService: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/services`
);
const apiImage: AxiosInstance = createAxiosInstance(`${API_BASE_URL}/image`);
const apiEmployee: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/employees`
);
const apiAdvance: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/advances`
);
const apiAuth: AxiosInstance = createAxiosInstance(`${API_BASE_URL}/login`);
const apiOrganization: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/organizations`
);
const apiSubscribe: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/subscribe`
);
const apiCron: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/cron`
);
const apiReservation: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/reservations`
);
const apiNotification: AxiosInstance = createAxiosInstance(
  `${API_BASE_URL}/notifications`
);

export {
  apiClient,
  apiAppointment,
  apiService,
  apiImage,
  apiEmployee,
  apiAdvance,
  apiAuth,
  apiOrganization,
  apiSubscribe,
  apiCron,
  apiReservation,
  apiNotification
};
