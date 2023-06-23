import React from 'react'

import { Toaster } from 'react-hot-toast'

import QueryWrapper from './components/QueryWrapper'
import LoadUserWrapper from './components/LoadUserWrapper'
import ChatList from './components/Chat/ChatList'
import Header from './components/Common/Header'
import useStore from './hooks/useStore'
import Login from './pages/Login'
import ColorModeListener from './pages/ColorModeListener'


const App = () => {
  const user = useStore(state => state.user)

  return (
    <QueryWrapper>
      <ColorModeListener />
      <LoadUserWrapper>
        <div className='App'>
          <div className='content'>
            <Header />
          </div>
        </div>
      </LoadUserWrapper>
      <Toaster />
    </QueryWrapper>
  )
}


export default App
