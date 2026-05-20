import { useState, useEffect } from 'react'

const useFetch = (fetchFn) => {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchFn()
        setData(res.data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return { data, loading, error }
}

export default useFetch