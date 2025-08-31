import { useDialog } from '@/stores/dialog';
import { enqueueSnackbar } from 'notistack';
import { fetcher } from './fetcher';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/constants/routes';

export async function queryFunction<TParams, TResponse>(endpoint: string, params: TParams) {
  return await fetcher<TResponse>('get', endpoint, undefined, params);
}

export async function mutationFunction<TRequest, TResponse>(endpoint: string, method: 'patch', data: TRequest) {
  return await fetcher<TResponse>(method, endpoint, data);
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
