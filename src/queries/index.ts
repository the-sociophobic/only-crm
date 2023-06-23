import { useMutation, useQueryClient } from "react-query"
import { get, put } from "./utils"

export const auth = async (
  props: {
    username: string,
    password: string
  }
) => {
  await put(`/auth`, props)
}

export const register = async (
  props: {
    firstname: string,
    lastname: string,
    username: string,
    password: string
  }
) => {
  await put(`/register`, props)
}

export const getUser = async () => {
  return get(`/user`)
}

export const getChats = async () => {
  return get(`/chats`)
}
