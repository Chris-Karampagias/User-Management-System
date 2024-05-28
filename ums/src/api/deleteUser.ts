export default function deleteUser(id: string) {
  return fetch(`${import.meta.env.VITE_STACKPRINT_BASE_URL}users/${id}`, {
    method: "DELETE",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
