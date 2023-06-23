import { useQuery, useMutation, useQueryClient } from 'react-query'

import axios, { AxiosResponse } from 'axios'

import { IdType, UserLoginType, UserType, ChatType } from '../models'


// Fetch user data
const useUser = (userId: IdType) => {
  return useQuery(['user', userId], () => axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${userId}`))
}

// Update user data
const useAuthUser = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(
    (credentials: UserLoginType) =>
      axios.put(`${process.env.REACT_APP_SERVER_URL}/login`, credentials),
    {
      onSuccess: (data: AxiosResponse<UserType, any>, variables, context) => {
        queryClient.invalidateQueries(['user', data.data.id])
      },
    }
  )

  return mutation.mutate
}

// Fetch chats data
const useChats = () => {
  return useQuery('chats', () => axios.get(`${process.env.REACT_APP_SERVER_URL}/chats`))
}

// Fetch single chat
const useChat = (chatId: IdType) => {
  return useQuery(['chat', chatId], () => axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/${chatId}`))
}

// Update chat data
const useUpdateChat = () => {
  const queryClient = useQueryClient()
  return useMutation((chat: ChatType) => axios.put(`${process.env.REACT_APP_SERVER_URL}/chat/${chat.id}`, chat), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['chat', variables.id])
    },
  })
}


export { useUser, useAuthUser, useChats, useChat, useUpdateChat }
