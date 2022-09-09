export const addUser = (user) => {
  let usersArr = localStorage.getItem("users");

  if (usersArr && usersArr.length) {
    const exists = JSON.parse(usersArr).find(
      (u) => u.email === user.email || u.username === user.username
    );

    if (exists) {
      return false;
    }

    const users = [...JSON.parse(usersArr), user];
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  } else {
    usersArr = [];
    const newUserArr = [...usersArr, user];

    localStorage.setItem("users", JSON.stringify(newUserArr));
    return true;
  }
};

export const updateUser = (user) => {
  let usersArr = localStorage.getItem("users");

  if (usersArr && usersArr.length) {
    const exists = JSON.parse(usersArr).find(
      (u) =>
        (u.email === user.email || u.username === user.username) &&
        u.id !== user.id
    );
    if (exists === undefined) {
      if (user.password) {
        const updated = JSON.parse(usersArr).map((u) =>
          u.id === user.id
            ? {
                ...u,
                password: user.password,
              }
            : u
        );
        if (updated) {
          console.log(user.id);
          localStorage.setItem("users", JSON.stringify(updated));
          return true;
        }
      } else {
        const updated = JSON.parse(usersArr).map((u) =>
          u.id === user.id
            ? {
                ...u,
                username: user.username,
                email: user.email,
                name: user.name,
              }
            : u
        );
        if (updated) {
          localStorage.setItem("users", JSON.stringify(updated));
          return true;
        }
      }
    }
    return false;
  } else {
    return false;
  }
};

export const deleteUser = (id) => {
  const usersArr = localStorage.getItem("users");
  const currentUser = localStorage.getItem("u__uuid");

  if (usersArr && usersArr.length) {
    const newArr = JSON.parse(usersArr).filter((u) => u.id !== id);

    if (newArr && currentUser !== id) {
      localStorage.setItem("users", JSON.stringify(newArr));
      return true;
    }
    return false;
  } else {
    return false;
  }
};

export const getUser = (user) => {
  let usersArr = localStorage.getItem("users");

  if (usersArr && usersArr.length) {
    const exists = JSON.parse(usersArr).find(
      (u) =>
        u.email === user.email ||
        u.username === user.username ||
        u.id === user.id
    );
    if (exists) {
      return exists;
    }
    return false;
  } else {
    return false;
  }
};

export const getAllUsers = () => {
  let usersArr = localStorage.getItem("users");

  if (usersArr && usersArr.length) {
    return JSON.parse(usersArr);
  } else {
    return false;
  }
};

export const loginUser = (user) => {
  let usersArr = localStorage.getItem("users");

  if (usersArr && usersArr.length) {
    const exists = JSON.parse(usersArr).find(
      (u) =>
        (u.email === user.user || u.username === user.user) &&
        u.password === user.password
    );
    if (exists) {
      localStorage.setItem("isLogged", true);

      localStorage.setItem("u__uuid", exists.id);
      localStorage.setItem("u__user", exists.username);
      localStorage.setItem("u__name", exists.name);
      localStorage.setItem("u__email", exists.email);
      localStorage.setItem("u__date", exists.date);

      return true;
    }
    return false;
  } else {
    return false;
  }
};

export const logoutUser = () => {
  localStorage.setItem("isLogged", false);
  localStorage.removeItem("u__uuid");
  localStorage.removeItem("u__user");
  localStorage.removeItem("u__name");
  localStorage.removeItem("u__email");
  localStorage.removeItem("u__date");

  return true;
};
