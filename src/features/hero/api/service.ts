import { mutationFunction, queryFunction } from '@/utils/tanstack-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { HeroItem, HeroList, HeroProfile } from '../types/hero';
import { HeroKeys } from './keys';
import { useHandleError } from '@/utils/fetcher';

export function useHeroList() {
  const { handleError } = useHandleError();
  async function getHeroList() {
    return await queryFunction<undefined, HeroList>(`/heroes`, undefined);
  }

  return useQuery({
    queryKey: [HeroKeys.LIST],
    queryFn: getHeroList,
    onError: (error) => {
      handleError(error);
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 20 * 60 * 1000,
  });
}

export function useHeroDetail(id: string) {
  const { handleError } = useHandleError();
  async function getHeroDetail(id: string) {
    return await queryFunction<undefined, HeroItem>(`/heroes/${id}`, undefined);
  }

  return useQuery({
    queryKey: [HeroKeys.DETAIL, id],
    queryFn: () => getHeroDetail(id),
    onError: (error) => {
      handleError(error);
    },
  });
}

export function useHeroProfile(id: string) {
  const { handleError } = useHandleError();
  async function getHeroProfile(id: string) {
    return await queryFunction<undefined, HeroProfile>(`/heroes/${id}/profile`, undefined);
  }

  return useQuery({
    queryKey: [HeroKeys.PROFILE, id],
    queryFn: () => getHeroProfile(id),
    staleTime: 0,
    cacheTime: 0,
    onError: (error) => {
      handleError(error);
    },
  });
}

export function useHeroProfileMutation(id: string) {
  const queryClient = useQueryClient();
  const { data: heroListData } = useHeroList();

  const heroName = heroListData?.find((hero) => hero.id === id)?.name;

  async function updateHeroProfile(id: string, profile: HeroProfile) {
    return await mutationFunction<HeroProfile, undefined>(`/heroes/${id}/profile`, 'patch', profile);
  }
  return useMutation({
    mutationFn: (profile: HeroProfile) => updateHeroProfile(id, profile),
    mutationKey: [HeroKeys.UPDATE_PROFILE],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HeroKeys.PROFILE] });
      enqueueSnackbar(`更新 ${heroName} 成功`, { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(`更新 ${heroName} 失敗`, { variant: 'error' });
    },
  });
}
