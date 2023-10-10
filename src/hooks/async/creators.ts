import { useMutation, useQuery, useQueryClient } from 'react-query'

import {
  updateCreator,
  deleteCreator,
  getCreators,
} from '../../queries'
import { IdType, CreatorType } from '../../models'
import useStore from '../useStore'


export const useCreators = () => {
  const user = useStore(state => state.user)

  return useQuery<CreatorType[]>({
    queryKey: ['creators', user],
    queryFn: () => getCreators(user?.account || 0),
    enabled: !!user
  })
}

export const useUpdateCreator = () => {
  const user = useStore(state => state.user)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (member: CreatorType) => updateCreator(member),
    onSuccess: (data, variables, context) =>
      queryClient.invalidateQueries(['creators', user]),
  })
}

export const useDeleteCreator = () => {
  const user = useStore(state => state.user)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (creator_id: IdType) => deleteCreator(creator_id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['creators', user])
    },
  })
}
