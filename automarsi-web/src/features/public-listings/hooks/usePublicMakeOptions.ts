import { queryPolicy } from '@/shared/config/queryPolicy'
import { useQuery } from '@tanstack/react-query'
import { getPublicMakeModels } from '@/features/public-listings/api/getPublicMakeModels'
import { getPublicMakes } from '@/features/public-listings/api/getPublicMakes'

type UsePublicMakeOptionsParams = {
  makeId: string
}

export function usePublicMakeOptions({ makeId }: UsePublicMakeOptionsParams) {
  const makesQuery = useQuery({
    queryKey: ['public', 'makes'],
    queryFn: getPublicMakes,
    staleTime: queryPolicy.catalogStaleTime,
  })

  const modelsQuery = useQuery({
    queryKey: ['public', 'makes', makeId, 'models'],
    queryFn: () => getPublicMakeModels(makeId),
    enabled: makeId !== '',
    staleTime: queryPolicy.catalogStaleTime,
  })

  return {
    makes: makesQuery.data?.data ?? [],
    models: modelsQuery.data?.data ?? [],
    makesQuery,
    modelsQuery,
  }
}
