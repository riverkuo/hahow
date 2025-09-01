import { RoutePaths } from '@/constants/routes';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" gap={10} alignItems="center">
      <Typography variant="h1">404 page not found</Typography>
      <Button color="secondary" variant="contained" onClick={() => navigate(RoutePaths.Home)}>
        Back to home
      </Button>
    </Box>
  );
}
