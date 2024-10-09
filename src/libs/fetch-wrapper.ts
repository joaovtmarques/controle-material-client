export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const data = await fetch(`http://3.143.225.109:8080/api/${input}`, init);

  return data as T;
}
