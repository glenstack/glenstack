import { subscribe } from "./subscribe";

export const handleEvent = async (event) => {
  const url = new URL(event.request.url);

  if (
    url.pathname === "/subscribe" &&
    event.request.method.toUpperCase() === "POST"
  ) {
    return await subscribe(event.request);
  }
};
