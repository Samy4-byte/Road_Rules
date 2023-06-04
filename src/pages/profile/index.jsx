import { useEffect, useState } from "react"
import { mockFetch } from "../../utils/mockFetch"
import HistoryScore from "../../components/HistoryScore"
import Style from "./profile.module.css"
import { useNavigate } from "react-router-dom"


export const ProfilePage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect (() => {
    if (localStorage.getItem('token')) {
      setLoading(true)
      mockFetch('/profile.json')
      .then(res => res.json())
      .then(data => {
        setEvents(data)
      })
      .catch((err) => {
        setError('произошла ошибка')

      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      navigate('/login')
    }
  }, [])

  return (
    <div className={Style.profContainer} >
      <h1>Личный кабинет</h1>
      {loading && <div>Loading...</div>}
      <table className={Style.table}>
      <thead>
        <tr>
          <th className={Style.tableTh}>Date</th>
          <th className={Style.tableTh}>Score</th>
          <th className={Style.tableTh}>Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e) => (
          <tr key={e.id}>
            <td>{e.date}</td>
            <td>{e.score}</td>
            <td>{e.timer}</td>
          </tr>
        ))}
      </tbody>
    </table>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* {
        events.map((e) => (
          <HistoryScore key={e.id}/>
          
        ))
      } */}

    </div>
  )
}