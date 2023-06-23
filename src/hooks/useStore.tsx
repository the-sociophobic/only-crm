import { create } from 'zustand'

import { UserType } from '../models'


export type StateType = {
  user: null | Partial<UserType>
}


const useStore = create<StateType>(set => ({
  user: null,
}))


export default useStore
