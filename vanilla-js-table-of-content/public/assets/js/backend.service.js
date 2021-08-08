export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    const res = await response.json();
    if (res.status != "OK") throw `${res.status}:\n${res.response.message}`;
    return res;
  } catch (error) {
    throw error;
  }
}
