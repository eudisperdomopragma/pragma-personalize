import React, { useState, FC } from 'react'
import axios, { AxiosResponse } from 'axios'

const baseURL =
  'https://6ceedhs64m.execute-api.us-east-1.amazonaws.com/dev-test'

const Personalization: FC = () => {
  const [orderTrackingForm] = useState({
    body: '{"userId": "3840373493474947557494749"}',
  })

  const { body } = orderTrackingForm

  const onClick = () => {
    if (body != '') {
      axios
        .post(baseURL, orderTrackingForm)
        .then((response: AxiosResponse) => {
          console.log(response)
          if (response.status != 200) {
            alert('Ah ocurrido un error!, por favor intentalo más tarde')
          } else {
            alert('¡El estado fue actualizado correctamente!')
          }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data)

            alert(
              `Ah ocurrido un error!, por favor intentalo más tarde. \nERROR: ${error.message}`
            )
          } else if (error.request) {
            // The request was made but no response was received

            console.log(error.request)
          } else {
            alert(
              `Ah ocurrido un error!, por favor intentalo más tarde. \nERROR: ${error.message}`
            )
          }
        })
    } else {
      alert('Todos los campos (*) son obligatorios')
    }
  }

  return (
    <div>
      <button onClick={onClick}>Get Personalization</button>
    </div>
  )
}

export default Personalization
