import dataProviderFactory from "ra-data-local-storage";
import { addGetCompletionBasedOnOpenAIAPI } from "@react-admin/ra-ai";

export const dataProvider = addGetCompletionBasedOnOpenAIAPI({
  dataProvider: dataProviderFactory({ loggingEnabled: true }),
});
