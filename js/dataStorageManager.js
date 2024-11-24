export const insertLocalStorage = (key, array) => {
  localStorage.setItem(key, JSON.stringify(array));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const insertSessionStorage = (key, array) => {
  sessionStorage.setItem(key, JSON.stringify(array));
};

export const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
