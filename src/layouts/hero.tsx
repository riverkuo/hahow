import { Outlet } from 'react-router-dom';
import { HeroList } from '../features/hero/components/HeroList';
import { Box } from '@mui/material';

export default function HeroLayout() {
  return (
    <Box display="flex" flexDirection="column" gap={4} width="100%" maxWidth={1200}>
      <HeroList />
      <Outlet />
    </Box>
  );
}
