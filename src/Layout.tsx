import { Box } from "@mui/material";
import { SplashScreen } from "./SplashScreen";

export const Layout = ({ children }: any) => (
  <Box display="flex" flex="1 0 auto" width="100%">
    {children}
    <SplashScreen />
  </Box>
);
