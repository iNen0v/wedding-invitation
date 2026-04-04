import { useNavigate } from 'react-router-dom'
import { GOOGLE_FORM_RSVP_URL } from '../config/googleSheets'
import './Questionnaire.css'

function Questionnaire() {
  const navigate = useNavigate()

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h1>Потвърди присъствието си</h1>
        <p className="subtitle">
          Попълни краткия формуляр в Google Forms — ще се отвори в нов раздел.
        </p>
        <a
          href={GOOGLE_FORM_RSVP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="submit-btn questionnaire-form-link"
        >
          Отвори формуляра за присъствие
        </a>
        <button type="button" onClick={() => navigate('/')} className="back-btn">
          ← Назад към поканата
        </button>
      </div>
    </div>
  )
}

export default Questionnaire
