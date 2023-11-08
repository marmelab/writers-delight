import { Box, Typography } from "@mui/material";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";

export const CompositionListEmpty = () => (
  <Box m={2} display="flex">
    <Typography variant="body1" color="text.secondary" flex={1}>
      Write your first composition
    </Typography>
    <TurnLeftIcon sx={{ transform: "rotate(90deg)" }} />
  </Box>
);
