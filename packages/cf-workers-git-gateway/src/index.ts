import { makeGitHub } from "./gitHub";
import { Router, Path } from "@glenstack/cf-workers-router";
import { makeAuthFunctions } from "./auth";
import { makeStorageFunctions } from "./storage";

export const registerGitHub = async (
  { router }: { router: Router },
  gitHubOAuthConfig: {
    clientID: string;
    clientSecret: string;
    serverBaseURL: string;
  },
  authOptions: Parameters<typeof makeAuthFunctions>[0],
  storageOptions: Parameters<typeof makeStorageFunctions>[0]
) => {
  const authFunctions = await makeAuthFunctions(authOptions);
  const storageFunctions = await makeStorageFunctions(storageOptions, "GitHub");

  const gitHub = makeGitHub({
    ...gitHubOAuthConfig,
    authFunctions,
    storageFunctions,
  });

  router.handle(Path(/^\/\.git-gateway\/git\/github\/.*/), gitHub.gitGateway);
  router.get(/^\/\.git-gateway\/callback\/github$/, gitHub.callback);
  router.get(/^\/\.git-gateway\/login\/github$/, gitHub.login);

  return router;
};
