# Стъпки за поправяне на Google Sheets интеграцията

## Проблем
Данните не се записват в Google Sheets от формата.

## Решение - Стъпка по стъпка

### Стъпка 1: Провери Google Apps Script кода

1. Отвори Google Sheet: https://docs.google.com/spreadsheets/d/1mc2z-ssl5yMGl37AME5eawSbxPggDEKMi4Lqv_QnOUE/edit
2. Разширения → Apps Script
3. Провери дали кодът от `GOOGLE_SHEETS_SCRIPT.gs` е в редактора
4. Запази (Ctrl+S или Cmd+S)

### Стъпка 2: Провери Deployment настройките

1. В Apps Script редактора → Deploy → Manage deployments
2. Натисни ✏️ Edit на съществуващия deployment
3. Провери:
   - **Who has access:** Трябва да е "**Anyone**" (не "Only myself")
   - **Execute as:** "Me"
4. Ако не е "Anyone", смени го и натисни "Deploy"
5. Копирай новия URL (ако се е променил)

### Стъпка 3: Тествай директно в браузъра

Отвори следния URL в браузъра (тества с реални данни):

```
https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест Име&contact=test@example.com&attendance=С радост потвърждавам&hasGuest=Не&guestName=Няма&guestMenu=Няма&hasChildren=Не&childrenCount=0&children=Няма&menu=Месо&specialRequirements=Няма
```

**Какво да очакваш:**
- Ако видиш JSON отговор като `{"success":true,"message":"Данните са записани успешно"}`, значи работи!
- Ако видиш грешка или празен отговор, има проблем с deployment-а

### Стъпка 4: Провери Google Sheet

1. Отвори Google Sheet отново
2. Провери дали има нов ред с данните от теста
3. Ако има, значи Apps Script работи правилно!

### Стъпка 5: Провери Execution Logs

1. В Apps Script → Executions (Изпълнения) в лявата страна
2. Натисни на последното изпълнение
3. Провери логовете:
   - Ако видиш `"Parsed data - name: ..."`, значи данните са получени
   - Ако видиш `"Data saved successfully: ..."`, значи данните са записани
   - Ако видиш грешки, копирай ги и ми ги покажи

### Стъпка 6: Тествай от формата

1. Отвори сайта в браузъра
2. Отвори Developer Tools (F12) → Console
3. Попълни формата и изпрати
4. Провери конзолата за съобщения:
   - `📤 Изпращане на данни към Google Sheets...`
   - `Full URL: ...`
   - `✅ Данните са изпратени към Google Sheets` или грешки
5. Провери Google Sheet дали има нов ред

### Стъпка 7: Ако все още не работи

**Възможни проблеми:**

1. **CORS грешка в конзолата:**
   - Това е нормално - Google Apps Script не поддържа CORS
   - Данните все пак трябва да се изпратят
   - Провери Google Sheet дали има данни

2. **401 Unauthorized:**
   - Deployment-ът не е с "Anyone" достъп
   - Направи нов deployment с "Anyone"

3. **Данните не се записват:**
   - Провери Execution logs в Apps Script
   - Провери дали Sheet-ът е правилно свързан
   - Провери дали имаш права да редактираш Sheet-а

4. **URL параметрите не се предават:**
   - Провери конзолата за `Full URL: ...`
   - Копирай URL-а и го отвори директно в браузъра
   - Ако работи директно, проблемът е в fetch заявката

## Алтернативно решение: Google Forms

Ако Google Apps Script не работи, можеш да използваш Google Forms:
1. Създай Google Form със същите въпроси
2. Свържи го с Google Sheet
3. Използвай Google Forms Embed или POST заявка

Виж `GOOGLE_FORMS_SETUP.md` за инструкции.
