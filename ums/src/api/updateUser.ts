export default function updateUser(id: string) {
  return fetch(`${import.meta.env.VITE_STACKPRINT_BASE_URL}users/${id}`, {
    method: "PUT",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((user) => user)
    .catch((error) => error);
}
