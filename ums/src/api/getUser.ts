export default function getUsers(id: string) {
  return fetch(`https://apis.stackprint.io/ums-api/users/${id}`, {
    method: "GET",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((user) => user)
    .catch((error) => error);
}
