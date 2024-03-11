import { Cookies } from "react-cookie";

const setCookie = (
  key: string,
  value: string,
  expireTime?: number | undefined
): void => {
  const cookies = new Cookies();
  if (expireTime) {
    cookies.set(key, value, { path: "/", maxAge: expireTime });
  } else {
    cookies.set(key, value, { path: "/" });
  }
};

const getCookie = (key: string): string | null => {
  const cookies = new Cookies();
  const res = cookies.get(key);
  return res || null;
};

const setObjectInCookie = (name: string, object: Record<string, any>): void => {
  setCookie(name, JSON.stringify(object));
};

const retrieveObjectFromCookie = (name: string): Record<string, any> | null => {
  const cookieValue = getCookie(name);
  return cookieValue ? JSON.parse(cookieValue) : null;
};

const deleteAllCookies = (): void => {
  const cookies = new Cookies();
  cookies.remove("token");
};

export {
  setCookie,
  getCookie,
  setObjectInCookie,
  retrieveObjectFromCookie,
  deleteAllCookies,
};
