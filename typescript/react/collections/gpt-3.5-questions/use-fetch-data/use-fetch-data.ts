import { useEffect, useState } from 'react'

export enum FetchDataRequestStage {
  'SEND' = 'SEND',
  'PENDING' = 'PENDING',
  'RESOLVED' = 'RESOLVED',
}

export interface FetchDataResponse<D, E = unknown> {
  isLoading: boolean
  data: D | null
  error: E | null
}

export function useFetchData<D, E = unknown>(
  url: string,
  initialData: D | null = null
): FetchDataResponse<D, E> {
  const [requestStage, setRequestStage] = useState(FetchDataRequestStage.SEND)
  const [data, setData] = useState<D | null>(initialData)
  const [error, setError] = useState<E | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setRequestStage(FetchDataRequestStage.PENDING)
      setError(null)

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })

        if (!isMounted) {
          return
        }

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const jsonData = await response.json()
        setData(jsonData)
      } catch (e) {
        setError(e)
      } finally {
        if (isMounted) {
          setRequestStage(FetchDataRequestStage.RESOLVED)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url])

  return {
    isLoading: requestStage === FetchDataRequestStage.RESOLVED,
    data,
    error,
  }
}
