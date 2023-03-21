export const LinkAPI = {
  get: async function (token: string) {
    const response = await fetch("http://localhost:3000/api/link/get", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // credentials: 'include',
    });
    return await response.json();
  },
};
