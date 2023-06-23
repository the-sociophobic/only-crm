export type IdType = string

export interface UserType {
  id: IdType
  first_name: string
  last_name: string
  username: string
  role: 'owner' | 'admin' | 'sexter' | 'user'
  email: string
  stats: Record<string, unknown>
}

export interface UserLoginType {
  username: string
  password: string
}

export interface ChatType extends UserType {
  messages: MessageType[]
}

export interface MessageType {
  id: IdType
  text: string
  sender: UserType
  timestamp: Date
}
