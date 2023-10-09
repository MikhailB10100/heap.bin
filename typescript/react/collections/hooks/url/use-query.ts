import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

export function useQuery() {
  const { search } = useLocation()

  return useMemo(() => {
    const params: Record<string, string> = {}

    for (const queryParam of search.replace('?', '').split('&')) {
      const [key, value] = queryParam.split('=')
      params[key] = value
    }

    return params
  }, [search])
}
