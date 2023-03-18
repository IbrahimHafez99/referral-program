export const AuthAPI = {
  auth: async function (email: string) {
    const user = { user: { email } };
    const response = await fetch("http:localhost:3000/api/auth/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },
};
