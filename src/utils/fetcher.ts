import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { useDialog } from '@/stores/dialog';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/constants/routes';

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

export async function fetcher<T = unknown>(
  method: 'get' | 'patch',
  endpoint: string,
  data?: unknown,
  params?: unknown
): Promise<T> {
  try {
    let response: T;

    switch (method) {
      case 'get':
        response = await api.get(endpoint, { params });
        break;
      case 'patch':
        response = await api.patch(endpoint, data);
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.status?.toString() || 'Unknown error';
      throw new Error(errorMessage);
    }
    throw new Error('Unknown error');
  }
}

export function useHandleError() {
  const { onOpenDialog } = useDialog();
  const navigate = useNavigate();

  function handleError(error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    switch (errorMessage) {
      case '404':
        onOpenDialog({
          type: 'error',
          content: '找不到資料',
          title: errorMessage,
          cancel: {
            text: '回首頁',
            onClick: () => {
              navigate(RoutePaths.Home);
            },
          },
        });
        break;
      default:
        enqueueSnackbar('Unknown error', { variant: 'error' });
        break;
    }
  }

  return { handleError };
}
