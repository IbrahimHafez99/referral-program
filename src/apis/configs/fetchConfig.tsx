export const api = async (
  endPoint: string,
  token: string,
  method: string,
  data?: any
) => {
  const baseURL = "http://localhost:3000";
  const endpointPath = endPoint;
  const url = new URL(endpointPath, baseURL);

  const requestOptions: RequestInit = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // credentials: 'include',
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
  const response = await fetch(url.href, requestOptions);
  return await response.json();
};
