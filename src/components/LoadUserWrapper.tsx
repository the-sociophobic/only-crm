import React, { useEffect } from 'react'

import { useUser, useAuthUser } from '../hooks'


export type LoadUserWrapperProps = {
  children: React.ReactNode
}


const LoadUserWrapper: React.FC<LoadUserWrapperProps> = ({
  children
}) => {
  const login = useAuthUser()
  const user = useUser('1')

  useEffect(() => {
    login({
      username: '',
      password: ''
    })
  }, [login])

  if (!user) return <p>Loading...</p>

  return <>{children}</>
}


export default LoadUserWrapper
