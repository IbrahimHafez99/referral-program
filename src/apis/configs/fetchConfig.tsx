export const api = async (
  endPoint: string,
  token: string,
  method: string,
  data?: any,
  param?: string
) => {
  const baseURL = "http://localhost:3000";
  const endpointPath = param ? endPoint + param : endPoint;
  const url = new URL(endpointPath, baseURL);
  console.log(url.href);
  console.log(data);
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
  if (response.status === 204) {
    return response;
  }
  return await response.json();
};
