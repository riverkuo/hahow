import { Button } from '@/components/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Divider, TextField, Typography } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  type ControllerRenderProps,
  type Path,
} from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { HeroKeys } from '../../api/keys';
import { useHeroProfile, useHeroProfileMutation } from '../../api/service';
import { type HeroProfile } from '../../types/hero';

const schema = z.object({
  str: z.number(),
  int: z.number(),
  agi: z.number(),
  luk: z.number(),
});

const defaultValues = {
  str: 0,
  int: 0,
  agi: 0,
  luk: 0,
};

export function HeroProfile() {
  const { heroId } = useParams();
  const isFetching = useIsFetching({ queryKey: [HeroKeys.PROFILE, heroId] }) > 0;
  const isMutating = useIsMutating({ mutationKey: [HeroKeys.UPDATE_PROFILE] }) > 0;
  const { data: powerData } = useHeroProfile(heroId ?? '');

  const updateHeroProfileMutation = useHeroProfileMutation(heroId ?? '');

  const originalPoints = powerData ? Object.values(powerData).reduce((acc, curr) => acc + curr, 0) : 0;

  const methods = useForm<HeroProfile>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = methods;

  const formPoints = Object.values(watch()).reduce((acc, curr) => acc + curr, 0);
  const pointsDiff = originalPoints - formPoints;

  const isSaveButtonDisabled = pointsDiff !== 0 || isFetching || isMutating || !isDirty;

  async function onSubmit(data: HeroProfile) {
    await updateHeroProfileMutation.mutateAsync(data);
  }

  useEffect(() => {
    if (powerData) reset(powerData);
  }, [powerData]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          borderRadius={1}
          p={2}
          sx={(theme) => ({
            backgroundColor: theme.palette.action.selected,
            borderRadius: 1,
          })}
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={8}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {Object.keys(defaultValues).map((key, index) => (
              <Box key={index} display="flex" alignItems="center" minWidth={200} justifyContent="space-between">
                <Typography variant="h6">{key.toUpperCase()}</Typography>
                <PowerInput formKey={key as keyof HeroProfile} pointDiff={pointsDiff} />
              </Box>
            ))}
          </Box>
          <Box alignSelf="flex-end" display="flex" flexDirection="column" gap={2} alignItems="flex-end">
            <Typography variant="h6">剩餘點數：{isFetching ? 0 : pointsDiff}</Typography>
            {/* 剩餘點數為 0 、與原先資料不同時，才可以儲存 */}
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              disabled={isSaveButtonDisabled}
              loading={isMutating}
              loadingPosition="end"
              isDirty={isDirty}
            >
              儲存
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}

function PowerInput({ formKey, pointDiff }: { formKey: Path<HeroProfile>; pointDiff: number }) {
  const { control } = useFormContext<HeroProfile>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { heroId } = useParams();
  const isFetching = useIsFetching({ queryKey: [HeroKeys.PROFILE, heroId] }) > 0;
  const isMutating = useIsMutating({ mutationKey: [HeroKeys.UPDATE_PROFILE] }) > 0;
  const increaseDisabled = pointDiff === 0 || isFetching || isMutating;
  const decreaseDisabled = (field: ControllerRenderProps<HeroProfile, Path<HeroProfile>>) => {
    return field.value <= 0 || isFetching || isMutating;
  };

  function onIncrease(field: ControllerRenderProps<HeroProfile, Path<HeroProfile>>) {
    field.onChange(field.value + 1);
    inputRef.current?.click();
  }

  function onDecrease(field: ControllerRenderProps<HeroProfile, Path<HeroProfile>>) {
    field.onChange(field.value - 1);
    inputRef.current?.click();
  }

  function onKeyDown(
    e: React.KeyboardEvent<HTMLDivElement>,
    field: ControllerRenderProps<HeroProfile, Path<HeroProfile>>
  ) {
    if (e.key === 'ArrowUp' && pointDiff) {
      field.onChange(field.value + 1);
    } else if (e.key === 'ArrowDown' && field.value > 0) {
      field.onChange(field.value - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <Controller
      control={control}
      name={formKey}
      render={({ field }) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ minWidth: 'fit-content' }}
            size="small"
            onClick={() => onIncrease(field)}
            disabled={increaseDisabled}
          >
            +
          </Button>
          <TextField
            {...field}
            ref={inputRef}
            value={field.value}
            onChange={(e) => e.preventDefault()}
            onKeyDown={(e) => onKeyDown(e, field)}
            sx={{ width: 60, input: { textAlign: 'center' }, cursor: 'not-allowed' }}
            autoComplete="off"
            inputMode="numeric"
            size="small"
            color="secondary"
            variant="standard"
            disabled={isFetching || isMutating}
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{ minWidth: 'fit-content' }}
            size="small"
            onClick={() => onDecrease(field)}
            disabled={decreaseDisabled(field)}
          >
            -
          </Button>
        </Box>
      )}
    />
  );
}
