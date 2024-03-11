// session storage
const setSessionStorage = (name: string, data: any): void => {
  if (typeof data === 'object') {
    sessionStorage.setItem(name, JSON.stringify(data));
  } else {
    sessionStorage.setItem(name, data);
  }
};

const getSessionStorage = <T>(name: string): T | null => {
  const storedData = sessionStorage.getItem(name);
  return storedData ? JSON.parse(storedData) : null;
};

// local storage
const setLocalStorage = (name: string, data: any): void => {
  if (typeof data === 'object') {
    localStorage.setItem(name, JSON.stringify(data));
  } else {
    localStorage.setItem(name, data);
  }
};

const getLocalStorageObj = <T>(name: string): T | null => {
  const storedData = localStorage.getItem(name);
  return storedData ? JSON.parse(storedData) : null;
};

const getLocalStorage = (name: string): string | null => {
  return localStorage.getItem(name);
};

// clear
const deleteOneSessionStorage = (name: string): void => {
  sessionStorage.removeItem(name);
};

const deleteOneLocalStorage = (name: string): void => {
  localStorage.removeItem(name);
};

const deleteAllStorage = (): void => {
  sessionStorage.clear();
  localStorage.clear();
};

export {
  setSessionStorage,
  getSessionStorage,
  setLocalStorage,
  getLocalStorageObj,
  getLocalStorage,
  // clear
  deleteOneSessionStorage,
  deleteOneLocalStorage,
  deleteAllStorage,
};
