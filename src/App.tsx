import { Admin, Resource } from "react-admin";

import { dataProvider } from "./dataProvider";
import { Layout } from "./Layout";
import compositions from "./compositions";

export const App = () => (
  <Admin dataProvider={dataProvider} layout={Layout}>
    <Resource name="compositions" {...compositions} />
  </Admin>
);
