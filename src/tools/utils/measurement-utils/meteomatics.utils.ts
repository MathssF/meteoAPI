import axios from 'axios';

export async function fetchMeteomaticsData(username: string, password: string, date: string, paramCodes: string, coordString: string) {
  const url = `https://api.meteomatics.com/${date}/${paramCodes}/${coordString}/json`;
  const response = await axios.get(url, { auth: { username, password } });
  return response.data;
}
