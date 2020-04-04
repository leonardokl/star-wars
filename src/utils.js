export function request(endpoint) {
  return window.fetch(endpoint).then(async (response) => {
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}
