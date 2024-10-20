import Cookie from "js-cookie";

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  let result;

  await fetch(`http://3.143.225.109:8080/api/${input}`, init).then(
    async (response) => {
      if (response.status === 403) {
        Cookie.remove("token");
        window.location.reload();
      } else {
        result = await response.json();
      }
    }
  );

  return result as T;
}
