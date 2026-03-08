# Настройка на Google Forms за RSVP формата

## Вариант 1: Google Forms (Най-лесен)

### Стъпка 1: Създай Google Form

1. Отиди на https://forms.google.com
2. Създай нова форма
3. Добави следните въпроси:
   - **Твоето име** (Short answer) - Required
   - **Име на гост** (Short answer) - Optional
   - **Деца** (Short answer) - Optional
   - **Ще присъстваш ли на нашата сватба?** (Multiple choice)
     - С радост потвърждвам
     - За съжаление ще откажа
   - **Избор на меню** (Multiple choice)
     - Месо
     - Вегетарианско
     - Детско

### Стъпка 2: Вземи Form URL

1. В Google Form → Натисни "Send" (Изпрати)
2. Избери "Link" (Линк)
3. Копирай URL-а
4. Вземи Entry IDs от HTML на формата:
   - Отвори формата в браузър
   - Inspect Element на първото поле
   - Търси `entry.XXXXXXX` (където XXXXXXX е число)
   - Повтори за всяко поле

### Стъпка 3: Добави в кода

Отвори `src/pages/Questionnaire.jsx` и:

1. Раскоментирай Google Forms кода в `handleSubmit`
2. Смени `YOUR_GOOGLE_FORM_URL_HERE` с твоя Google Form URL
3. Смени `entry.XXXXXXX` с твоите Entry IDs

---

## Вариант 2: Google Apps Script Webhook (По-професионално)

### Стъпка 1: Създай Google Sheet

1. Отиди на https://sheets.google.com
2. Създай нов sheet с колони:
   - Подал | Име | Тип | Меню | Присъствие | Дата

### Стъпка 2: Създай Google Apps Script

1. В Google Sheet → Extensions → Apps Script
2. Изтрий всичко и постави този код:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Добави главния гост
    sheet.appendRow([
      data.mainName,
      data.mainName,
      'main',
      data.people.find(p => p.type === 'main')?.menu || '',
      data.attendance,
      new Date()
    ]);
    
    // Добави останалите (гостове, деца)
    data.people
      .filter(p => p.type !== 'main')
      .forEach(person => {
        sheet.appendRow([
          data.mainName,
          person.name,
          person.type,
          person.menu || '',
          data.attendance,
          new Date()
        ]);
      });
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Стъпка 3: Deploy Web App

1. Натисни "Deploy" → "New deployment"
2. Избери тип "Web app"
3. Направи следните настройки:
   - Description: RSVP Webhook
   - Execute as: Me
   - Who has access: **Anyone**
4. Натисни "Deploy"
5. Копирай **Web App URL**

### Стъпка 4: Добави в кода

Отвори `src/pages/Questionnaire.jsx` и:

1. Раскоментирай Google Apps Script кода в `handleSubmit`
2. Смени `YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL_HERE` с твоя Web App URL

---

## Готово! 🎉

Сега когато някой попълни формата, данните автоматично ще се записват в Google Sheet.

**Препоръка:** Използвай Вариант 2 (Google Apps Script) - той е по-гъвкав и ти дава пълен контрол върху данните.
