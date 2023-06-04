import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useTestPage = () => { 
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoading(true)
      fetch('http://localhost:3000/tests')
      .then(res => res.json())
      .then(data => {
        setTests(data)
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      navigate('/login')
    }
    
  }, [])

  return {
    tests, loading, error
  }
  
}

