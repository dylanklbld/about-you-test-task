import { useEffect, useState } from 'react'

export const useAsyncLoader = <R>(requestFn: () => Promise<R>) => {
  const [value, setValue] = useState<R | Error | null>(null)

  useEffect(
    () => {
      let canceled = false
      requestFn()
        .then(data => !canceled && setValue(data))
        .catch(error => setValue(error))

      return () => {
        canceled = true
      }
    },
    [requestFn],
  )

  return value
}
