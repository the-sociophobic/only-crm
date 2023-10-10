import { create } from 'zustand'
import { CreatorType, UserType, UserTypePartial } from '../models'


export type StateType = {
  creators: CreatorType[]
  currentCreator: null | CreatorType
  user: null | UserType
  setUser: (user: UserType) => void
  setCurrentCreator: (creator: CreatorType) => void
}


const useStore = create<StateType>(set => ({
  user: null,
  creators: [],
  currentCreator: null,
  setUser: (user: UserType) => set({ user: user }),
  setCurrentCreator: (creator: CreatorType) => set({ currentCreator: creator }),
}))


export default useStore
