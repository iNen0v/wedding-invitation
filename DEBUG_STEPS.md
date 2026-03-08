# Стъпки за дебъг на Google Apps Script

## Проблем: Данните не се записват в Google Sheet

### Стъпка 1: Обнови Apps Script кода
1. Отвори Google Sheet → Разширения → Apps Script
2. Копирай новия код от `GOOGLE_SHEETS_SCRIPT.gs`
3. Постави го в редактора
4. Запази (Ctrl+S)

### Стъпка 2: Направи нов deployment
1. Deploy → Manage deployments → ✏️ Edit → Deploy
2. Или: Deploy → New deployment → Web app → Who has access: Anyone → Deploy

### Стъпка 3: Тествай с параметри и провери логовете
1. Отвори следния URL в браузъра:
   ```
   https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест&guest_name=Гост&children=Деца&attendance=С радост потвърждвам&menu=Месо
   ```

2. Провери Google Sheet дали има данни

3. Провери Execution logs:
   - Google Sheet → Разширения → Apps Script
   - Executions (Изпълнения) в лявата страна
   - Натисни на последното изпълнение
   - Провери логовете от Logger.log()

4. Копирай логовете и ми ги покажи

### Стъпка 4: Ако все още не работи
Провери:
- Дали deployment-ът е правилно конфигуриран (Who has access: Anyone)
- Дали имаш права да редактираш Google Sheet-а
- Дали Apps Script кода е правилно запазен
