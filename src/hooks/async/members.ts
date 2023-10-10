import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
} from '../../queries'
import { UserTypePartial, UserTypeMain, IdType } from '../../models'


export const useMembers = (account_id: number) => {
  return useQuery<UserTypePartial[]>(
    'members',
    () => getMembers(account_id))
}

export const useAddMember = (account: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (member: UserTypeMain) =>
      addMember({
        ...member,
        account
      }),
    onSuccess: (data, variables, context) =>
      queryClient.invalidateQueries(['members'])
  })
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (member: UserTypeMain) => updateMember(member),
    onSuccess: (data, variables, context) =>
      queryClient.invalidateQueries(['members'])
  })
}

export const useDeleteMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user_id: IdType) => deleteMember(user_id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['members'])
    },
  })
}
