export default function getUsers() {
  return fetch("https://apis.stackprint.io/ums-api/users", {
    method: "GET",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((users) => users)
    .catch((error) => error);
}
