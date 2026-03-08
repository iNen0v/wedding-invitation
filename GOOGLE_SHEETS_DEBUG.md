# Debug Google Sheets Integration

## Проблем
Данните не се записват в Google Sheets.

## Възможни причини:

### 1. Google Apps Script Deployment
- Провери дали deployment-ът е с "Who has access: **Anyone**"
- Провери дали deployment-ът е активен
- Направи нов deployment ако е необходимо

### 2. URL параметри
- Провери дали URL-ът е правилен
- Тествай директно в браузъра:
  ```
  https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест&contact=test@test.com&attendance=С радост потвърждавам
  ```

### 3. CORS проблеми
- `no-cors` режимът не позволява да видим отговора
- Трябва да използваме нормален fetch без `no-cors`

### 4. Google Sheet права
- Провери дали Apps Script има права да пише в Sheet-а
- Провери дали Sheet-ът е правилно свързан с Apps Script

## Стъпки за дебъг:

1. **Отвори браузър конзолата** (F12)
2. **Попълни формата** и изпрати
3. **Провери конзолата** за грешки
4. **Провери Google Apps Script Execution logs**
5. **Провери Google Sheet** дали има нови редове

## Тестване директно:

Отвори в браузъра:
```
https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест&contact=test@test.com&attendance=С радост потвърждавам&hasGuest=Не&guestName=Няма&guestMenu=Няма&hasChildren=Не&childrenCount=0&children=Няма&menu=Месо&specialRequirements=Няма
```

Ако видиш JSON отговор, значи Apps Script работи.
