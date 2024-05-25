import { useState, useEffect } from 'react';

const initialState = {
  name: "",
  username: "",
};

export const useUser = (userId) => {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((userRes) => setUser(userRes));
  }, [userId]);

  return user;
}