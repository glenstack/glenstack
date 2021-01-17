import {
  Destroyable,
  Request as AlgoliaRequest,
  Requester,
  Response as AlgoliaResponse,
} from "@algolia/requester-common";

const createRequest = (request: AlgoliaRequest): Request =>
  new Request(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.data,
  });

const createResponse = async (
  response: Response
): Promise<AlgoliaResponse> => ({
  content: await response.text(),
  isTimedOut: false,
  status: response.status,
});

export const createFetchHttpRequester = (): Requester & Destroyable => ({
  send: async (request: AlgoliaRequest): Promise<AlgoliaResponse> => {
    const response = await fetch(createRequest(request));
    return await createResponse(response);
  },
  destroy() {
    return Promise.resolve();
  },
});
