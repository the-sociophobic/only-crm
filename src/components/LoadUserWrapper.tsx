import React, { useEffect } from 'react'

import { useUser, useAuthUser } from '../hooks'
import { useQuery } from 'react-query'

import { getUser } from '../queries'
import { UserType } from '../models'
import useStore from '../hooks/useStore'
import Login from '../pages/Login'


export type LoadUserWrapperProps = {
  children: React.ReactNode
}


const LoadUserWrapper: React.FC<LoadUserWrapperProps> = ({
  children
}) => {
  const { data, isLoading } = useQuery<Partial<UserType>>('user', getUser)
  const user = useStore(state => state.user)

  if (isLoading)
    return <p>Loading...</p>

  console.log(data)
  useStore.setState({ user: data })

  return user ?
    <>{children}</>
    :
    <Login />
}


export default LoadUserWrapper
