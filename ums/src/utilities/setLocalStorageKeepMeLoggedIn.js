export default function setLocalStorageKeepMeLoggedIn(preference) {
  localStorage.setItem("keepMeLoggedIn", JSON.stringify(preference));
}
