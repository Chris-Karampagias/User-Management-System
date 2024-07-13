export function setLocalStorageCredentials(username, password) {
  const stringifiedUser = JSON.stringify({username, password});
  localStorage.setItem("user", stringifiedUser);
}

export function getLocalStorageCredentials() {
  const stringifiedUser = localStorage.getItem("user");

  if (stringifiedUser) {
    const user = JSON.parse(stringifiedUser);

    if(user.username && user.password) {
      return {
        username: user.username,
        password: user.password
      }
    }
  }

  return null;
}
