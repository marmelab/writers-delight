export const firstLine = (text: string) => (text ? text.split("\n")[0] : "");
export const notFirstLine = (text: string) =>
  text ? text.split("\n").slice(1).join("\n") : "";
