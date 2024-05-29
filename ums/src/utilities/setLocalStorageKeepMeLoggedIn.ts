export default function setLocalStorageKeepMeLoggedIn(preference: boolean) {
  localStorage.setItem("keepMeLoggedIn", JSON.stringify(preference));
}
