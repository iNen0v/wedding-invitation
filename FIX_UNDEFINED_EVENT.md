# Проблем: Event object is undefined

## Проблем
Когато се изпраща заявката, Apps Script получава `e` като `undefined`, което означава, че параметрите не пристигат.

## Причина
Това може да се случи когато:
1. Заявката се изпраща без параметри
2. URL параметрите не се предават правилно
3. Google Apps Script не получава параметрите правилно

## Решение

### Стъпка 1: Провери URL-а в конзолата

1. Отвори формата в браузъра
2. F12 → Console
3. Попълни формата и изпрати
4. Провери за `Full URL: ...`
5. Копирай целия URL

### Стъпка 2: Тествай URL-а директно

Отвори копирания URL в нов таб. Трябва да видиш JSON отговор.

Ако видиш `{"status":"RSVP Webhook is running"}`, значи:
- Apps Script работи ✅
- Но няма параметри ❌

### Стъпка 3: Провери дали параметрите са в URL-а

URL-ът трябва да изглежда така:
```
https://script.google.com/macros/s/.../exec?name=Име&contact=test@test.com&attendance=...
```

Ако няма `?name=...&contact=...`, значи параметрите не се изпращат!

### Стъпка 4: Провери кода в Questionnaire.jsx

Провери дали `params.toString()` съдържа данните:
```javascript
console.log('Parameters:', params.toString())
```

Трябва да видиш нещо като:
```
name=Име&contact=test@test.com&attendance=...
```

## Възможни решения:

### Решение 1: Провери дали formData има данни

Добави в `handleSubmit`:
```javascript
console.log('Form data before submit:', formData)
```

### Решение 2: Провери дали URLSearchParams работи правилно

Добави:
```javascript
console.log('URLSearchParams entries:', Array.from(params.entries()))
```

### Решение 3: Тествай с фиксирани данни

Временно замени `submissionData` с фиксирани данни за тест:
```javascript
const submissionData = {
  name: 'Тест',
  contact: 'test@test.com',
  attendance: 'С радост потвърждавам',
  // ... останалите
}
```

Ако това работи, проблемът е в `formData`.
