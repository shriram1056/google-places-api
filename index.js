const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios')

const API_KEY = process.env.API_KEY

const app = express()
const port = process.env.PORT || 3000

// Enable cors
app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/places', async (req, res) => {
  let input_value = String(req.query.search)
  let response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input_value}&key=${API_KEY}&region=CA&location="46.257114,-63.142780"`
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
