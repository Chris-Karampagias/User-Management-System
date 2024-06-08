export default function setLocalStorageUser(user) {
  const stringified_user = JSON.stringify(user);
  localStorage.setItem("user", stringified_user);
}
