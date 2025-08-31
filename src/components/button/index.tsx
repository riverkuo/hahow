import { Box, Button as MuiButton, keyframes, type ButtonProps as MuiButtonProps } from '@mui/material';
interface ButtonProps extends MuiButtonProps {
  isDirty?: boolean;
}

const pulse = keyframes`
0% {
  scale: 1;
}
  50% {
  scale: 1.1;
}
100% {
  scale: 1;
}
`;

export function Button({ children, isDirty, ...props }: ButtonProps) {
  return (
    <Box position="relative" width="fit-content">
      <MuiButton {...props}>{children}</MuiButton>
      {isDirty && (
        <Box
          sx={(theme) => ({
            position: 'absolute',
            zIndex: -1,
            top: 0,
            right: 0,
            transform: `translate(50%, -50%)`,
            transformOrigin: 'center',
            animation: `${pulse} 2s infinite`,
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: theme.palette.secondary.main,
          })}
        />
      )}
    </Box>
  );
}
