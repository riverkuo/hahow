import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

interface ApiResponse<T = any> {
  data: T;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function fetcher<T = any>(
  method: 'get' | 'post' | 'patch',
  endpoint: string,
  data?: any,
  params?: any
): Promise<{ data: T }> {
  try {
    let response: AxiosResponse<ApiResponse>;

    switch (method) {
      case 'get':
        response = await api.get(endpoint, { params });
        break;
      case 'post':
        response = await api.post(endpoint, data);
        break;
      case 'patch':
        response = await api.patch(endpoint, data);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    const { data: responseData } = response.data;

    return {
      data: responseData,
    };
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error';
    throw new Error(errorMessage);
  }
}
