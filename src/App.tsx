import React from 'react'

import QueryWrapper from './components/QueryWrapper'
import LoadUserWrapper from './components/LoadUserWrapper'
import ChatList from './components/Chat/ChatList'


const App = () => {
  return (
    <QueryWrapper>
      <LoadUserWrapper>
        <div className='App'>
          <ChatList />
        </div>
      </LoadUserWrapper>
    </QueryWrapper>
  )
}


export default App
