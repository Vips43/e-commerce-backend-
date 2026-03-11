import { Box } from "@mui/material";

export function TabPanel({ value, index, children }) {
  if (value !== index) return null;

  return (
    <Box sx={{ pt: 3 }}>
      {children}
    </Box>
  );
}