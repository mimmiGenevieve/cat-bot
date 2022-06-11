import { errorMsg } from './helpers.js'

export async function getFact() {
  try {
    const response = await axios.get("https://catfact.ninja/fact")
    return response.data.fact
  } catch (err) { return errorMsg(err) }
}

export async function getCat(val) {
	const type = val ?? 'gif,jpg,png'
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?mime_types=${type}`)
    return response.data[0].url
  } catch (err) { return errorMsg(err) }
}
