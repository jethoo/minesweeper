import axios from 'axios'
const baseUrl = 'https://scoreapimine.herokuapp.com/score'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  if(request.data[0] !== undefined){
    return request.data[0].score
  }
}

const create = async newScoreArr => {
  const response = await axios.post(`${baseUrl}`, newScoreArr)
  return response.status
}

const exportedObj = {
  getAll,
  create
}

export default exportedObj