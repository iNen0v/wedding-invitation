# Troubleshooting - Данните не се записват в Google Sheets

## Стъпка 1: Провери дали Apps Script кодът е обновен

1. Отвори Google Sheet → Разширения → Apps Script
2. Провери дали кодът от `GOOGLE_SHEETS_SCRIPT.gs` е в редактора
3. Ако не е, копирай го и запази (Ctrl+S)

## Стъпка 2: Провери дали deployment-ът е обновен

1. Deploy → Manage deployments
2. Провери дали има deployment
3. Ако няма, направи нов: Deploy → New deployment → Web app
4. Ако има, редактирай го: ✏️ Edit → Deploy
5. **ВАЖНО:** Провери "Who has access" да е "Anyone"

## Стъпка 3: Тествай директно в браузъра

Отвори следния URL в браузъра (замени с твоя URL и данни):

```
https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест&contact=test@test.com&attendance=С радост потвърждавам&hasGuest=Не&guestName=Няма&guestMenu=Няма&hasChildren=Не&childrenCount=0&children=Няма&menu=Месо&specialRequirements=Няма
```

**Какво да очакваш:**
- Ако видиш `{"success":true,"message":"Данните са записани успешно"}`, значи Apps Script работи!
- Провери Google Sheet дали има нов ред

## Стъпка 4: Провери Execution logs

1. Apps Script → Executions (Изпълнения)
2. Натисни на последното изпълнение
3. Провери логовете:
   - Ако видиш `✅ Data saved successfully`, значи данните са записани
   - Ако видиш грешки, копирай ги и ми ги покажи

## Стъпка 5: Провери конзолата в браузъра

1. Отвори формата в браузъра
2. F12 → Console
3. Попълни формата и изпрати
4. Провери за:
   - `Full URL: ...` - копирай URL-а
   - Грешки (червени съобщения)
   - `✅ Данните са изпратени към Google Sheets`

## Стъпка 6: Провери Google Sheet

1. Отвори Google Sheet
2. Провери дали има нови редове след изпращане на формата
3. Провери дали заглавният ред е правилен

## Възможни проблеми:

### Проблем 1: Deployment не е с "Anyone" достъп
**Решение:** Deploy → Manage deployments → Edit → Who has access: Anyone → Deploy

### Проблем 2: Apps Script кодът не е обновен
**Решение:** Копирай новия код от `GOOGLE_SHEETS_SCRIPT.gs` и запази

### Проблем 3: Параметрите не пристигат
**Решение:** Провери конзолата за `Full URL` и отвори URL-а директно в браузъра

### Проблем 4: CORS грешка
**Решение:** Това е нормално - данните все пак трябва да се изпратят. Провери Google Sheet дали има данни.

## Тестова функция за Apps Script

Добави тази функция в Apps Script за тестване:

```javascript
function testDoGet() {
  const testEvent = {
    parameter: {
      name: 'Тест Име',
      contact: 'test@test.com',
      attendance: 'С радост потвърждавам',
      hasGuest: 'Не',
      guestName: 'Няма',
      guestMenu: 'Няма',
      hasChildren: 'Не',
      childrenCount: '0',
      children: 'Няма',
      menu: 'Месо',
      specialRequirements: 'Няма'
    }
  };
  
  const result = doGet(testEvent);
  Logger.log('Test result: ' + result.getContent());
}
```

След това:
1. Избери `testDoGet` от dropdown-а
2. Натисни "Run"
3. Провери логовете и Google Sheet
