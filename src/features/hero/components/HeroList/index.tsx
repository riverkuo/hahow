import { Grid } from '@mui/material';
import { useHeroList } from '../../api/service';
import { HeroCard } from '../HeroCard';

export function HeroList() {
  const { data, isFetching } = useHeroList();

  const heroListData = isFetching
    ? Array.from({ length: 8 }).map((_, index) => ({ id: `skeleton-${index}`, name: '.', image: '' }))
    : data ?? [];

  return (
    <Grid container spacing={2}>
      {heroListData?.map((hero) => (
        <Grid key={hero.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <HeroCard hero={hero} />
        </Grid>
      )) || <Grid size={{ xs: 12 }}>無資料</Grid>}
    </Grid>
  );
}
