export function updateUser(userData) {
  return fetch(
    `${import.meta.env.VITE_STACKPRINT_BASE_URL}/users/${userData.id}`,
    {
      method: "PUT",
      headers: {
        "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  )
    .then((response) => response.json())
    .catch((error) => error);
}
