# Как да тестваш Google Apps Script директно

Преди да опиташ от формата, тествай Google Apps Script директно, за да видиш дали работи.

## Стъпка 1: Тествай с GET заявка

1. Отвори следния URL в браузъра (замени с твоя URL):
   ```
   https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест&guest_name=Гост&children=Деца&attendance=С радост потвърждвам&menu=Месо
   ```

2. Ако видиш JSON отговор като:
   ```json
   {"status":"RSVP Webhook is running","timestamp":"..."}
   ```
   Това означава, че Web App работи!

## Стъпка 2: Провери Execution logs в Apps Script

1. Отвори Google Sheet → Разширения → Apps Script
2. Натисни "Executions" (Изпълнения) в лявата страна
3. Там ще видиш всички изпълнения на скрипта
4. Ако има грешки, ще видиш какво точно се е случило
5. Ако има успешни изпълнения, ще видиш логовете от Logger.log()

## Стъпка 3: Провери дали данните са в Sheet-а

1. Отвори Google Sheet: https://docs.google.com/spreadsheets/d/1mc2z-ssl5yMGl37AME5eawSbxPggDEKMi4Lqv_QnOUE/edit
2. Провери дали има данни в Sheet-а
3. Ако няма, провери Execution logs дали има грешки

## Стъпка 4: Ако не работи

1. Провери Execution logs в Apps Script
2. Виж какво точно показва Logger.log()
3. Провери дали deployment-ът е правилно конфигуриран с "Anyone" достъп
4. Опитай да направиш нов deployment
