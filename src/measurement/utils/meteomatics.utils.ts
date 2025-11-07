import axios from 'axios';

export async function fetchMeteomaticsData(username: string, password: string, date: string, paramCodes: string, coordString: string) {
  console.log('meteomatics utils, coord: ', coordString);
  const newDate = '2025-11-06T00:00:05Z'
  const url = `https://api.meteomatics.com/${newDate}/${paramCodes}/${coordString}/json`;
  console.log(url);
  const response = await axios.get(url, { auth: { username, password } });
  return response.data;
}
