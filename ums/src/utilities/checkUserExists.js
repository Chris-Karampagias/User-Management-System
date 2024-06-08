export default function checkUserExists(users, id) {
  return users.some((user) => user.id === id);
}
