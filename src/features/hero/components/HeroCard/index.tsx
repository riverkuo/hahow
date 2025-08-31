import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { HeroKeys } from '../../api/keys';
import type { HeroItem } from '../../types/hero';
import { RoutePaths } from '@/constants/routes';
import type { Theme } from '@mui/material/styles';

const getCardActionAreaStyle = (theme: Theme) => ({
  height: '100%',
  border: '4px solid',
  borderColor: 'transparent',
  '&[data-active]': {
    backgroundColor: theme.palette.action.selected,
    borderColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
});

interface HeroCardProps {
  hero: HeroItem;
}

export function HeroCard({ hero }: HeroCardProps) {
  const { heroId } = useParams();
  const isFetching = useIsFetching({ queryKey: [HeroKeys.LIST] }) > 0;
  const navigate = useNavigate();

  const isSelected = heroId === hero.id;

  function handleSelect() {
    navigate(`${RoutePaths.Heroes}/${hero.id}`);
  }

  return (
    <Card>
      <CardActionArea onClick={handleSelect} data-active={isSelected ? '' : undefined} sx={getCardActionAreaStyle}>
        <CardContent sx={{ paddingBottom: 0 }}>
          {isFetching ? (
            <Skeleton animation="wave" variant="rectangular" width="100%" height="200px" />
          ) : (
            <CardMedia component="img" image={hero.image} alt={hero.name} loading="lazy" />
          )}

          <Box width="100%">
            {isFetching ? (
              <Skeleton animation="wave" width="100%">
                <Typography variant="h5" mt={2} width="100%">
                  .
                </Typography>
              </Skeleton>
            ) : (
              <Typography variant="h5" align="center" padding={2}>
                {hero.name}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
