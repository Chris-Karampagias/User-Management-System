export function setLocalStorageKeepMeLoggedIn(preference) {
  localStorage.setItem("keepMeLoggedIn", String(preference));
}

export function getLocalStorageKeepMeLoggedIn() {
  return localStorage.getItem("keepMeLoggedIn") === 'true';
}
