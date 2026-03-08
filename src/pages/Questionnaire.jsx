import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ZAPIER_WEBHOOK_URL } from '../config/googleSheets'
import './Questionnaire.css'

function Questionnaire() {
  const [formData, setFormData] = useState({
    // 1. Основна информация
    name: '',
    contact: '',
    // 2. Присъствие
    attendance: '',
    // 3. Гост
    hasGuest: '',
    guestName: '',
    guestMenu: '',
    // 4. Деца
    hasChildren: '',
    childrenCount: '',
    children: [], // [{ name: '', menu: '' }]
    // 5. Меню за основния гост
    menu: '',
    // 6. Специални изисквания
    specialRequirements: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Ако се промени броя на децата, обновяваме масива
    if (name === 'childrenCount') {
      const count = parseInt(value) || 0
      const currentChildren = prev.children || []
      const newChildren = []
      for (let i = 0; i < count; i++) {
        newChildren[i] = currentChildren[i] || { name: '', menu: '' }
      }
      setFormData(prev => ({ ...prev, children: newChildren }))
    }
    
    // Ако се промени hasGuest на "no", изчистваме данните за гост
    if (name === 'hasGuest' && value === 'no') {
      setFormData(prev => ({ ...prev, guestName: '', guestMenu: '' }))
    }
    
    // Ако се промени hasChildren на "no", изчистваме данните за деца
    if (name === 'hasChildren' && value === 'no') {
      setFormData(prev => ({ ...prev, childrenCount: '', children: [] }))
    }
  }
  
  const handleChildChange = (index, field, value) => {
    setFormData(prev => {
      const newChildren = [...prev.children]
      newChildren[index] = { ...newChildren[index], [field]: value }
      return { ...prev, children: newChildren }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    // Подготвяне на данните
    const attendanceText = formData.attendance === 'yes' 
      ? 'С радост потвърждавам' 
      : 'За съжаление няма да мога'
    
    const menuText = formData.menu === 'meat' 
      ? 'Месо' 
      : formData.menu === 'vegetarian' 
        ? 'Вегетарианско' 
        : formData.menu === 'vegan' 
          ? 'Веган' 
          : 'Не е избрано'
    
    const guestMenuText = formData.guestMenu === 'meat' 
      ? 'Месо' 
      : formData.guestMenu === 'vegetarian' 
        ? 'Вегетарианско' 
        : formData.guestMenu === 'vegan' 
          ? 'Веган' 
          : 'Не е избрано'
    
    // Форматиране на децата
    const childrenText = formData.hasChildren === 'yes' && formData.children.length > 0
      ? formData.children.map((child, idx) => 
          `Дете ${idx + 1}: ${child.name || 'Без име'} - ${child.menu === 'kids' ? 'Детско' : child.menu === 'kids-no-allergens' ? 'Детско без алергени' : 'Не е избрано'}`
        ).join('; ')
      : 'Няма'
    
    const submissionData = {
      name: formData.name || 'Не е попълнено',
      contact: formData.contact || 'Не е попълнено',
      attendance: attendanceText,
      hasGuest: formData.hasGuest === 'yes' ? 'Да' : 'Не',
      guestName: formData.hasGuest === 'yes' ? (formData.guestName || 'Не е попълнено') : 'Няма',
      guestMenu: formData.hasGuest === 'yes' ? guestMenuText : 'Няма',
      hasChildren: formData.hasChildren === 'yes' ? 'Да' : 'Не',
      childrenCount: formData.hasChildren === 'yes' ? (formData.childrenCount || '0') : '0',
      children: childrenText,
      menu: menuText,
      specialRequirements: formData.specialRequirements || 'Няма'
    }

    try {
      // Изпращане към Zapier като form-urlencoded (избягва CORS preflight от браузера)
      const params = new URLSearchParams()
      params.append('full_name', formData.name || '')
      params.append('contact', formData.contact || '')
      params.append('has_companion', formData.hasGuest === 'yes' ? 'true' : 'false')
      params.append('children_count', String(parseInt(formData.childrenCount, 10) || 0))
      params.append('main_guest_menu', menuText)
      params.append('companion_menu', formData.hasGuest === 'yes' ? guestMenuText : '')
      params.append('special_requirements', formData.specialRequirements || '')
      params.append('attendance', attendanceText)
      params.append('guest_name', formData.hasGuest === 'yes' ? (formData.guestName || '') : '')
      params.append('children', childrenText)

      if (ZAPIER_WEBHOOK_URL && ZAPIER_WEBHOOK_URL.trim() !== '') {
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        })
        if (!response.ok) {
          throw new Error(`Zapier върна ${response.status}: ${response.statusText}`)
        }
        console.log('✅ Данни изпратени към Zapier')
      } else {
        console.warn('⚠️ Zapier URL не е настроен в config/googleSheets.js')
      }

      setIsSubmitting(false)
      setSubmitStatus('success')
      
      // Пренасочи след 2 секунди
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Грешка при изпращане към Zapier:', error)
      setIsSubmitting(false)
      setSubmitStatus('error')
    }
  }
  
  // Проверка дали трябва да покажем останалите секции
  const showRemainingSections = formData.attendance === 'yes'

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-card">
        <h1>Потвърди присъствието си</h1>

        <form onSubmit={handleSubmit} className="questionnaire-form">
          {/* 1. Основна информация */}
          <div className="question-group">
            <h3>1. Основна информация</h3>
            <div className="input-group">
              <label>Твоето име и фамилия</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Твоето име и фамилия"
                required
                className="text-input"
              />
            </div>
            <div className="input-group">
              <label>Имейл или телефон (за връзка при нужда)</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Имейл или телефон"
                className="text-input"
              />
            </div>
          </div>

          {/* 2. Присъствие */}
          <div className="question-group">
            <h3>2. Присъствие</h3>
            <p>Ще присъстваш ли на нашата сватба?</p>
            <div className="radio-group">
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="attendance" 
                  value="yes" 
                  required
                  onChange={handleChange}
                />
                <span>С радост потвърждавам</span>
              </label>
              <label className="radio-label">
                <input 
                  type="radio" 
                  name="attendance" 
                  value="no"
                  onChange={handleChange}
                />
                <span>За съжаление няма да мога</span>
              </label>
            </div>
          </div>

          {/* Останалите секции се показват само ако attendance === 'yes' */}
          {showRemainingSections && (
            <>
              {/* 3. Гост */}
              <div className="question-group">
                <h3>3. Гост</h3>
                <p>Ще имаш ли придружител?</p>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="hasGuest" 
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Да</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="hasGuest" 
                      value="no"
                      onChange={handleChange}
                    />
                    <span>Не</span>
                  </label>
                </div>
                
                {formData.hasGuest === 'yes' && (
                  <div className="conditional-group">
                    <div className="input-group">
                      <label>Име и фамилия на госта</label>
                      <input
                        type="text"
                        name="guestName"
                        value={formData.guestName}
                        onChange={handleChange}
                        placeholder="Име и фамилия на госта"
                        className="text-input"
                      />
                    </div>
                    <div className="input-group">
                      <label>Меню за госта</label>
                      <div className="radio-group">
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name="guestMenu" 
                            value="meat"
                            onChange={handleChange}
                          />
                          <span>Месо</span>
                        </label>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name="guestMenu" 
                            value="vegetarian"
                            onChange={handleChange}
                          />
                          <span>Вегетарианско</span>
                        </label>
                        <label className="radio-label">
                          <input 
                            type="radio" 
                            name="guestMenu" 
                            value="vegan"
                            onChange={handleChange}
                          />
                          <span>Веган</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Деца */}
              <div className="question-group">
                <h3>4. Деца</h3>
                <p>Ще присъстват ли деца?</p>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="hasChildren" 
                      value="yes"
                      onChange={handleChange}
                    />
                    <span>Да</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="hasChildren" 
                      value="no"
                      onChange={handleChange}
                    />
                    <span>Не</span>
                  </label>
                </div>
                
                {formData.hasChildren === 'yes' && (
                  <div className="conditional-group">
                    <div className="input-group">
                      <label>Колко деца?</label>
                      <input
                        type="number"
                        name="childrenCount"
                        value={formData.childrenCount}
                        onChange={handleChange}
                        placeholder="1, 2, 3..."
                        min="1"
                        max="10"
                        className="text-input"
                      />
                    </div>
                    
                    {formData.children.map((child, index) => (
                      <div key={index} className="child-group">
                        <h4>Дете {index + 1}</h4>
                        <div className="input-group">
                          <label>Име на дете {index + 1}</label>
                          <input
                            type="text"
                            value={child.name || ''}
                            onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                            placeholder={`Име на дете ${index + 1}`}
                            className="text-input"
                          />
                        </div>
                        <div className="input-group">
                          <label>Меню за дете {index + 1}</label>
                          <div className="radio-group">
                            <label className="radio-label">
                              <input 
                                type="radio" 
                                checked={child.menu === 'kids'}
                                onChange={() => handleChildChange(index, 'menu', 'kids')}
                              />
                              <span>Детско</span>
                            </label>
                            <label className="radio-label">
                              <input 
                                type="radio" 
                                checked={child.menu === 'kids-no-allergens'}
                                onChange={() => handleChildChange(index, 'menu', 'kids-no-allergens')}
                              />
                              <span>Детско без алергени</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Меню за основния гост */}
              <div className="question-group">
                <h3>5. Меню за основния гост</h3>
                <p>Твоето меню</p>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="menu" 
                      value="meat"
                      onChange={handleChange}
                    />
                    <span>Месо</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="menu" 
                      value="vegetarian"
                      onChange={handleChange}
                    />
                    <span>Вегетарианско</span>
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="menu" 
                      value="vegan"
                      onChange={handleChange}
                    />
                    <span>Веган</span>
                  </label>
                </div>
              </div>

              {/* 6. Специални изисквания */}
              <div className="question-group">
                <h3>6. Специални изисквания</h3>
                <p>Имаш ли хранителни алергии или специални изисквания?</p>
                <p className="hint-text">(пример: без глутен, без лактоза, бременна и т.н.)</p>
                <div className="input-group">
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    placeholder="Опиши своите специални изисквания..."
                    className="text-input textarea-input"
                    rows="4"
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Изпращане...' : 'Изпрати'}
              </button>
            </>
          )}

          {/* Ако избере "няма да мога", показваме само бутон Изпрати */}
          {formData.attendance === 'no' && (
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Изпращане...' : 'Изпрати'}
            </button>
          )}
        </form>

        {submitStatus === 'success' && (
          <div className="success-message">
            ✓ Благодарим! Вашите данни са изпратени успешно!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="error-message">
            ✗ Има проблем при изпращането. Моля опитайте отново.
          </div>
        )}

        <button onClick={() => navigate('/')} className="back-btn" disabled={isSubmitting}>
          ← Назад към поканата
        </button>
      </div>
    </div>
  )
}

export default Questionnaire