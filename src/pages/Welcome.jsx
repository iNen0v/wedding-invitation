import { useNavigate } from 'react-router-dom'
import './Welcome.css'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <p className="welcome-text">Тази покана е специално за теб</p>
      <button type="button" className="welcome-btn" onClick={() => navigate('/invitation')}>
        Отвори поканата
      </button>
    </div>
  )
}

export default Welcome
