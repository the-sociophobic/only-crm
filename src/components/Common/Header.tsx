import React from 'react'

import { useMutation, useQuery, useQueryClient } from 'react-query'

import useStore from '../../hooks/useStore'
import { UserType } from '../../models'
import { getUser } from '../../queries'
import { Button } from 'react-bootstrap'
import { setAuthHeader } from '../../hooks/auth'



const Header: React.FC = () => {
  const user = useStore(state => state.user)
  // const { data: user, isLoading } = useQuery<Partial<UserType>>('user', getUser)
  const queryClient = useQueryClient()
  const mutation = useMutation(async () => {}, {
    onSuccess: () => queryClient.invalidateQueries('user')
  })

  return (
    <div className='Header d-flex flex-row align-items-center'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            Чаты
          </div>
          <div className='col'>
            Статы
          </div>
          <div className='col'>
            {user?.username}
          </div>
          <div className='col'>
            <Button onClick={() => {
              setAuthHeader(null)
              mutation.mutate()
            }}>
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header
