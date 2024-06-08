export default function findUser(users, username) {
  const foundUsers = users.filter((user) => user.username === username);
  if (foundUsers.length > 1) {
    return { user: foundUsers[0], duplicates: true };
  }
  return { user: foundUsers[0], duplicates: false };
}
