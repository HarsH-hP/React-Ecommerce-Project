export function fetchLoggedInUserInfoAPI(userID) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/users/"+userID);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUserOrdersAPI(userID) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders?user.id="+userID);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUserAPI(userData){
  return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8000/users/'+userData.id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
      });
      const data = await response.json();
      resolve({ data });
  });
}