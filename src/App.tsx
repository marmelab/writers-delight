import { Admin, Resource } from "react-admin";
import { createTheme } from "@mui/material";

import { dataProvider } from "./dataProvider";
import { Layout } from "./Layout";
import compositions from "./compositions";

const theme = createTheme({
  typography: {
    fontFamily: ["Unna", "Georgia", "Times New Roman", "serif"].join(","),
  },
});

export const App = () => (
  <Admin dataProvider={dataProvider} layout={Layout} theme={theme}>
    <Resource name="compositions" {...compositions} />
  </Admin>
);
