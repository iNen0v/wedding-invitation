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
    setFormData((current) => {
      const updatedData = { ...current, [name]: value }
      
      if (name === 'childrenCount') {
        const count = parseInt(value, 10) || 0
        const currentChildren = current.children || []
        const newChildren = []
        for (let i = 0; i < count; i++) {
          newChildren[i] = currentChildren[i] || { name: '', menu: '' }
        }
        updatedData.children = newChildren
      }
      
      if (name === 'hasGuest' && value === 'no') {
        updatedData.guestName = ''
        updatedData.guestMenu = ''
      }
      
      if (name === 'hasChildren' && value === 'no') {
        updatedData.childrenCount = ''
        updatedData.children = []
      }
      
      return updatedData
    })
  }

  const handleChildChange = (index, field, value) => {
    setFormData((current) => {
      const newChildren = [...(current.children || [])]
      newChildren[index] = { ...newChildren[index], [field]: value }
      return { ...current, children: newChildren }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    const menuText = formData.menu === 'meat' 
      ? 'Месо' 
      : formData.menu === 'vegetarian' 
        ? 'Вегетарианско' 
        : formData.menu === 'vegan'
          ? 'Веган'
          : ''
    
    const guestMenuText = formData.guestMenu === 'meat' 
      ? 'Месо' 
      : formData.guestMenu === 'vegetarian' 
        ? 'Вегетарианско' 
        : formData.guestMenu === 'vegan'
          ? 'Веган'
          : ''

    const attendanceText = formData.attendance === 'yes'
      ? 'С радост потвърждавам'
      : 'За съжаление няма да мога'

    const hasChildren = parseInt(formData.childrenCount, 10) > 0 ? 'Да' : 'Не'

    const data = {
      full_name: formData.name || '',
      contact: formData.contact || '',
      attendance: attendanceText || '',
      has_companion: formData.hasGuest === 'yes' ? 'Да' : 'Не',
      guest_name: formData.guestName || '',
      companion_menu: guestMenuText || '',
      main_guest_menu: menuText || '',
      has_children: hasChildren,
      children_count: parseInt(formData.childrenCount, 10) || 0,
      special_requirements: formData.specialRequirements || ''
    }

    console.log('==================== WEBHOOK DATA ====================')
    console.log('full_name:', data.full_name)
    console.log('contact:', data.contact)
    console.log('attendance:', data.attendance)
    console.log('has_companion:', data.has_companion)
    console.log('guest_name:', data.guest_name)
    console.log('companion_menu:', data.companion_menu)
    console.log('main_guest_menu:', data.main_guest_menu)
    console.log('has_children:', data.has_children)
    console.log('children_count:', data.children_count)
    console.log('special_requirements:', data.special_requirements)
    console.log('====================================================')

    try {
      if (ZAPIER_WEBHOOK_URL && ZAPIER_WEBHOOK_URL.trim() !== '') {
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        console.log('✅ Webhook sent successfully')
      }

      setIsSubmitting(false)
      setSubmitStatus('success')
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('❌ Грешка при изпращане:', error)
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