export type IdType = string

export interface UserType {
  id: IdType
  user_id: IdType
  name: string
  username: string
  password: string
  account: number

  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  enabled: boolean

  // Not on BE
  email: string
  stats: Record<string, unknown>
  avatar?: any
}

export type UserTypePartial = Partial<UserType>

export type UserTypeMain = Pick<
  UserType,
  'user_id' |
  'name' |
  'account' |
  'username' |
  'password'
>
export interface UserLoginType {
  username: string
  password: string
}

export type UserListItemType = Pick<UserTypePartial, 'id' | 'username' | 'avatar'>


export interface CreatorType {
  creator_id: number
  username: string
  account: number
  avatar50: string
  expired: null | number
  age: string
  name: string
  country: string
  proxy: string
}

export interface ChatType extends UserTypePartial {
  messages: MessageType[]
}

export interface MessageType {
  id: IdType
  text: string
  sender: UserTypePartial
  timestamp: Date
}

export type IteratableObject = {
  [key: string]: any
}
