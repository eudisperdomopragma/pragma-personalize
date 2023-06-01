import React, { useState, FC } from 'react'
import axios, { AxiosResponse } from 'axios'

const baseURL = 'https://eperdomo--pragma.myvtex.com/api/catalog/pvt/product/17'

const Personalizationlocal2: FC = () => {
  const [orderTrackingForm] = useState({
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      accept: 'application/json',
      'content-type': 'application/json',
      'X-VTEX-API-AppKey': 'vtexappkey-pragma-RQPQAV',
      'X-VTEX-API-AppToken':
        'DVKFWXNYDXABLPXPISHFATTVTFBPLEQUBDINNVOQOKOSAPQZUNDSOCHYSQHSUECFEWUHTLJTJBSZGWWVFYWCGZDSKMRTHQRWWWDOFWXHJPRXPAAUXNMGTUEKNJYPVNQD',
    },
  })

  const onClick = () => {
    axios
      .get(baseURL, orderTrackingForm)
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
  }

  return (
    <div>
      <button onClick={onClick}>Get Personalization2.9</button>
    </div>
  )
}

export default Personalizationlocal2
