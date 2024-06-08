export default function getNextUserId(users) {
  return Number(users[users.length - 1].id) + 1;
}
