import React from 'react'


const getAuthHeader = () =>
  localStorage.getItem('user-cookie')
// ({
//   headers: {
//     cookie: encodeURIComponent(
//       localStorage.get('user-cookie')
//     )
//   }
// })

const setAuthHeader = (header: any) =>
  localStorage.setItem('user-cookie', header)


export {
  getAuthHeader,
  setAuthHeader
}
