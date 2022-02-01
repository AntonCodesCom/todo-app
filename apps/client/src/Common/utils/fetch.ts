const serverBaseUrl =
  process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:3001';

export default async function commonFetch(
  pathname: string,
  requestInit?: RequestInit
): Promise<Response> {
  const url = new URL(pathname, serverBaseUrl);
  return await fetch(url.toString(), {
    ...(requestInit ?? {}),
    headers: {
      'Content-Type': 'application/json',
      ...(requestInit?.headers ?? {}),
    },
  });
}
