import { setAuthHeader } from '../hooks/auth'
import { _delete, get, post, put } from './utils'
import { CreatorType, IdType, UserTypeMain, UserTypePartial } from '../models'


export const auth = async (
  props: {
    username: string,
    password: string
  }
) => {
  try {
    const token = await post(`/auth/authenticate/`, props)
    setAuthHeader(token.access)
  } catch (err: any) {
    console.log(err)
    throw (new Error(err))
  }
}

export const register = async (
  props: {
    name: string,
    username: string,
    password: string
  }
) => {
  try {
    const token = await post(`/auth/register/`, props)
    setAuthHeader(token.token)
  } catch (err: any) {
    throw (new Error(err?.response?.data?.username?.[0]))
  }
}

export const getUser = async () => {
  return await get(`/user/`)
}

export const getStats = async (creator: number) => {
  return get(`/${creator}/stats/`)
}

export const getLinks = async (creator: number) => {
  return get(`/${creator}/promo/`)
}

export const collectLink = async (creator: number, link: number) => {
  return get(`/${creator}/promo/${link}/`)
}

export const refresh_payments = async (creator: number) => {
  return get(`/${creator}/payments/refresh/`)
}

export const getTasks = async (account: number) => {
  return get(`/${account}/tasks/`)
}

// MEMBERS
export const getMembers = async (
  account: number
): Promise<UserTypePartial[]> => {
  return get(`/${account}/users/`)
}

export const addMember = async (
  member_props: {
    name: string
    account: number
    username: string
    password: string
  }
): Promise<UserTypePartial> => {
  try {
    const member = await post(`/users/`, member_props)
    return member
  } catch (err) {
    throw (err)
  }
}

export const updateMember = async (
  member_props: UserTypeMain
): Promise<UserTypePartial> => {
  try {
    const member = await put(`/users/${member_props.user_id}/`, member_props)
    return member
  } catch (err) {
    throw (err)
  }
}

export const deleteMember = async (user_id: IdType) => {
  try {
    const res = await _delete(`/users/${user_id}/`)

    return res
  } catch (err) {
    throw (err)
  }
}

// CREATORS
export const getCreators = async (
  account: number
): Promise<CreatorType[]> => {
  return get(`/${account}/creators/`)
}

export const updateCreator = async (
  creator_props: CreatorType
): Promise<UserTypePartial> => {
  try {
    // not a real endpoint
    const creator = await put(`/creators/${creator_props.creator_id}/`, creator_props)
    return creator
  } catch (err) {
    throw (err)
  }
}

export const deleteCreator = async (creator_id: IdType) => {
  try {
    // not a real endpoint
    const res = await _delete(`/creators/${creator_id}/`)

    return res
  } catch (err) {
    throw (err)
  }
}
