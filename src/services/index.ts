interface IFetchAPIOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: null | string;
  rawBody?: {} | null;
}

export default async function fetchAPI<T>(
  url: RequestInfo,
  reqOptions: IFetchAPIOptions = {method: 'GET'},
): Promise<T> {
  try {
    const options: RequestInit = {};
    if (reqOptions.rawBody) {
      if (typeof reqOptions.rawBody !== 'string') {
        options.body = JSON.stringify(reqOptions.rawBody);
      } else {
        options.body = reqOptions.rawBody;
      }
      if (!reqOptions.rawBody) reqOptions.rawBody = null;
      options.method = reqOptions.method || 'GET';
      options.headers = {
        ...options.headers,
        ...(reqOptions.token
          ? {Authorization: `bearer ${reqOptions.token}`}
          : {}),
        'Content-Type': 'application/json',
      };
    }

    const response = await fetch(url, options);

    if (!response.ok)
      throw new Error(
        response.statusText || 'Something went wrong, try again later',
      );

    const data: Promise<T> =
      response.status !== 204 ? await response.json() : response;

    return data;
  } catch (e) {
    throw e;
  }
}
