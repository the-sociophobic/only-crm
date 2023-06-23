import { toast } from 'react-hot-toast'
import axios from 'axios'
import { setAuthHeader, getAuthHeader } from '../hooks/auth'


export const generateURL = (path: string, params?: object): string =>
  process.env.REACT_APP_SERVER_URL +
  path +
  (params && Object.keys(params).length > 0 ?
    `?${new URLSearchParams(params as URLSearchParams).toString()}`
    :
    ''
  )

export const promised = async (data: any, delay: number = 900) => {
  return new Promise((res, rej) => {
    setTimeout(
      () => res(data)
      , delay
    )
  })
}


export const get = async (path: string, params?: any) => {
  toast(`GET ${path}`)
  const authHeader = getAuthHeader()

  let res

  switch (path) {
    case '/user':
      res = authHeader !== 'null' ?
        {
          firstname: 'John',
          lastname: 'Appleseed',
          username: 'Alexdarkstalker98'
        }
        :
        null
      break
    case '/chats':
      res = await promised({ chats: [] })
      break
    default:
      res = (await axios.get(generateURL(path), params)).data
  }

  toast(`RESPONCE ${JSON.stringify(res)}`)

  return res
}

export const put = async (path: string, data: object, params?: any) => {
  toast(`PUT ${path} ${JSON.stringify(data)}`)

  let res

  switch (path) {
    case '/auth':
      res = await promised({ cookie: 'token' })
      setAuthHeader(res)
      break
    case '/register':
      res = await promised({ cookie: 'token' })
      setAuthHeader(res)
      break
    default:
      res = (await axios.put(generateURL(path), data, params)).data
  }

  toast(`RESPONCE ${JSON.stringify(res)}`)

  return res
}

export const post = async (path: string, data: object, params?: any) => {
  // toast(`POST ${path} ${JSON.stringify(data)}`)

  let res

  switch (path) {
    // case '/register':
    //   res = await promised({ cookie: 'token' })
    //   break
    default:
      res = (await axios.post(generateURL(path), data, params)).data
  }

  // toast(`RESPONCE ${JSON.stringify(res)}`)

  return res
}