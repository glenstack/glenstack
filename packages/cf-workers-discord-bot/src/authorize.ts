export const authorize = ({
  applicationID,
}: {
  applicationID: string;
}) => async (): Promise<Response> => {
  const urlSearchParams = new URLSearchParams({
    client_id: applicationID,
    scope: encodeURIComponent("applications.commands"),
  });
  const redirectURL = new URL("https://discord.com/api/oauth2/authorize");
  redirectURL.search = urlSearchParams.toString();

  return new Response(null, {
    status: 301,
    headers: { Location: redirectURL.toString() },
  });
};
