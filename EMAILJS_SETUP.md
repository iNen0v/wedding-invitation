# Инструкции за настройка на EmailJS

## Стъпка 1: Регистрация в EmailJS

1. Отиди на https://www.emailjs.com
2. Регистрирай се (безплатно)
3. Потвърди имейла си

## Стъпка 2: Създаване на Email Service

1. В Dashboard → Email Services
2. Натисни "Add New Service"
3. Избери твоя имейл провайдър (Gmail, Outlook и т.н.)
4. Следвай инструкциите за свързване
5. Запиши **Service ID** (ще ти трябва по-късно)

## Стъпка 3: Създаване на Email Template

1. В Dashboard → Email Templates
2. Натисни "Create New Template"
3. Използвай този template:

**Subject:** Нова RSVP за сватба

**Content:**
```
Име: {{name}}
Име на гост: {{guest_name}}
Деца: {{children}}
Присъствие: {{attendance}}
Меню: {{menu}}
```

4. Запиши **Template ID**

## Стъпка 4: Вземи Public Key

1. В Dashboard → Account → General
2. Копирай **Public Key**

## Стъпка 5: Добави credentials в кода

Отвори `src/pages/Questionnaire.jsx` и смени:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',      // ← Смени с твоя Service ID
  'YOUR_TEMPLATE_ID',     // ← Смени с твоя Template ID
  emailData,
  'YOUR_PUBLIC_KEY'        // ← Смени с твоя Public Key
)
```

И смени имейла:
```javascript
to_email: 'your-email@example.com' // ← Смени с твоя имейл
```

## Стъпка 6: Инсталирай пакета

В терминала изпълни:
```bash
npm install
```

## Готово! 🎉

Сега когато някой попълни формата, ти ще получаваш имейл с отговорите.

---

## Алтернатива: Google Forms

Ако предпочиташ Google Forms (като в ChatGPT разговора):

1. Създай Google Form със същите полета
2. В настройките → Responses → Link to spreadsheet
3. Вземи URL на формата
4. Можеш да използваш Google Forms Embed или да направиш POST заявка

За по-професионално решение с Google Sheets, виж ChatGPT разговора за Google Apps Script.
