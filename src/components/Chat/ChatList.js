import { useChats } from '../../hooks'


const ChatList = () => {
  const { isLoading, isError, error, data: chats } = useChats()

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {chats.map(chat => (
        <li key={chat.id}>{chat.title}</li>
      ))}
    </ul>
  )
}


export default ChatList
