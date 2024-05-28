export default function getUser(id: string | null) {
  return fetch(`${import.meta.env.VITE_STACKPRINT_BASE_URL}users/${id}`, {
    method: "GET",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
