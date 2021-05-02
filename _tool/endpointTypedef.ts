import http from 'http'
import { convertToCamelcase } from '../src/helper/json'
import { typedefGen } from 'typedef-gen'

// Docker APIへのリクエスト
const getRequest = async <T>(url: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const clientRequest = http.request(
      {
        socketPath: '/var/run/docker.sock',
        path: url,
      },
      (res) => {
        res.setEncoding('utf8')
        let chunk = ''
        res.on('data', (data) => (chunk += data))

        res.on('end', () => {
          try {
            const parsed = JSON.parse(chunk)
            console.log('parsed', parsed)
            resolve(convertToCamelcase(parsed))
          } catch (err) {
            console.error(err)
          }
        })
        res.on('error', (err) => {
          console.error(err)
          reject(err)
        })
      }
    )
    clientRequest.end()
  })
}

const endpointTypedefGen = () => {
  getRequest('/v1.40/containers/json?all=1')
    .then((res) => {
      console.log("return res", res)
      typedefGen(res)
    })
    .catch((err) => console.error(err))
}

endpointTypedefGen()
