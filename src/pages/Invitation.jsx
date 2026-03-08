import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Invitation.css'

function Invitation() {
  const navigate = useNavigate()
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // Скролваме до началото на страницата при зареждане
    window.scrollTo(0, 0)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [])

  return (
    <div className="invitation-container canva-main-container">
      <div className="canva-fullscreen-wrapper" ref={containerRef}>
        {!iframeLoaded && (
          <div className="canva-loading-placeholder">
            <div className="loading-spinner"></div>
            <p>Зареждане на поканата...</p>
          </div>
        )}
        <div className="canva-embed-container">
          <iframe 
            loading="lazy" 
            className="canva-fullscreen-embed"
            src="https://www.canva.com/design/DAG9SwdZIwI/dcVOgO5zWI1pRZglQ8bB5Q/view?embed" 
            allowFullScreen={true}
            allow="fullscreen"
            title="Покана за сватба"
            onLoad={() => setIframeLoaded(true)}
            style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          />
        </div>
        <button 
          className="canva-overlay-button"
          onClick={() => navigate('/questionnaire')}
          aria-label="Потвърдете присъствието си"
        >
          Потвърдете присъствието си
        </button>
      </div>
    </div>
  )
}

export default Invitation

