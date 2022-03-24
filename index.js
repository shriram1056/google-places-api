const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios')

const API_KEY = 'AIzaSyDEaW4CaQzmuY66Ca37yszgGom-mbS-v7w'

const app = express()
const port = 3000

// Enable cors
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/places', async (req, res) => {
  let response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input={}&key=${API_KEY}&region=CA&location="46.257114,-63.142780"`
  )
  return res.send(
    JSON.stringify(
      response.data.predictions.map((location) => location.description)
    )
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
