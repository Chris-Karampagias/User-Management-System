export default function deleteUser(id: string) {
  return fetch(`https://apis.stackprint.io/ums-api/users/${id}`, {
    method: "DELETE",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
