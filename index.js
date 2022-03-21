const express = require('express')
const axios = require('axios');

const API_KEY = "AIzaSyDEaW4CaQzmuY66Ca37yszgGom-mbS-v7w"

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  
  // let response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input="bandra&key=${API_KEY}`)
  //   return res.send(JSON.stringify(response.data.predictions.map((location) => location.description)));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})