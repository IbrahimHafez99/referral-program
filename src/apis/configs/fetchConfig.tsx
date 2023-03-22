export const api = async (
  endPoint: string,
  token: string,
  method: string,
  data?: any
) => {
  const baseURL = "http://localhost:3000";
  const endpointPath = endPoint;

  const url = new URL(endpointPath, baseURL);
  console.log(url.href);

  const response = await fetch(url.href, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    // credentials: 'include',
  });
  return await response.json();
};
