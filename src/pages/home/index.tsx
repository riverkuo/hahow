import { Button } from '@/components/button';
import { RoutePaths } from '@/constants/routes';
import { ArrowRight } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <Typography variant="h1">Hahow HeroCard</Typography>

      <Button variant="contained" color="secondary" onClick={() => navigate(RoutePaths.Heroes)}>
        <ArrowRight />
        Heroes
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate(`${RoutePaths.Heroes}/${'1'}`)}>
        <ArrowRight />
        HeroId
      </Button>
    </Box>
  );
}
