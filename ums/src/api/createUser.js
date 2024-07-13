import { getUsers } from "./getUsers";

export function createUser(userData) {
  return getUsers()
    .then(users => users.some(u => u.username === userData.username))
    .then(userAlreadyExists => {
      if (userAlreadyExists) {
        throw new Error('User already exists');
      }
    })
    .then(() => {
      return fetch(`${import.meta.env.VITE_STACKPRINT_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((response) => response.json());
    });
  }



//   return fetch(`${import.meta.env.VITE_STACKPRINT_BASE_URL}/users`, {
//     method: "POST",
//     headers: {
//       "API-Key": import.meta.env.VITE_STACKPRINT_API_KEY,
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   }).then((response) => response.json());
// }
