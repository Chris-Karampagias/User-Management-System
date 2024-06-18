export function getUser(username, password) {
  let requestUrl;
  if (!password) {
    requestUrl = `${
      import.meta.env.VITE_STACKPRINT_BASE_URL
    }/users?username=${username}`;
  } else {
    requestUrl = `${
      import.meta.env.VITE_STACKPRINT_BASE_URL
    }/users?username=${username}&password=${password}`;
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
