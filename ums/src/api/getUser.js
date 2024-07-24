export function getUser({ username, password, userId }) {
  let requestUrl;
  if (!password) {
    requestUrl = `${
      import.meta.env.VITE_STACKPRINT_BASE_URL
    }/users?username=${username}`;
  }

  if (username && password) {
    requestUrl = `${
      import.meta.env.VITE_STACKPRINT_BASE_URL
    }/users?username=${username}&password=${password}`;
  }

  if (userId) {
    requestUrl = `${
      import.meta.env.VITE_STACKPRINT_BASE_URL
    }/users?id=${userId}`;
  }

  return fetch(requestUrl, {
    method: "GET",
    headers: {
      "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => error);
}
