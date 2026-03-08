# Настройка на Google Sheets интеграция - Стъпка по стъпка

## Стъпка 1: Отвори твоя Google Sheet

Отвори: https://docs.google.com/spreadsheets/d/1mc2z-ssl5yMGl37AME5eawSbxPggDEKMi4Lqv_QnOUE/edit

## Стъпка 2: Добави заглавни колони (ако няма)

В първия ред на Sheet-а, добави следните колони:
| Име | Име на гост | Деца | Присъствие | Меню | Дата/Час |

## Стъпка 3: Отвори Apps Script

1. В Google Sheet → **Extensions** (Разширения) → **Apps Script**
2. Ще се отвори нов прозорец с Apps Script редактор

## Стъпка 4: Постави кода

1. Изтрий всичко в редактора
2. Копирай целия код от файла `GOOGLE_SHEETS_SCRIPT.gs`
3. Постави го в Apps Script редактора
4. Натисни **Ctrl+S** (или Cmd+S на Mac) за запазване
5. Дай име на проекта (например "RSVP Webhook")

## Стъпка 5: Deploy като Web App

1. Натисни бутона **Deploy** (в горния десен ъгъл)
2. Избери **New deployment**
3. Натисни иконата за настройки (⚙️) до "Select type"
4. Избери **Web app**
5. Попълни настройките:
   - **Description**: RSVP Webhook (или каквото искаш)
   - **Execute as**: Me (мене)
   - **Who has access**: **Anyone** (важно!)
6. Натисни **Deploy**
7. Първия път ще трябва да дадеш разрешение:
   - Натисни **Authorize access**
   - Избери твоя Google акаунт
   - Натисни **Advanced** → **Go to [Project Name] (unsafe)**
   - Натисни **Allow**
8. След като дадеш разрешение, ще видиш прозорец с **Web App URL**
9. **ВАЖНО**: Копирай целия URL (започва с `https://script.google.com/macros/s/...`)

## Стъпка 6: Добави URL в кода

1. Отвори файла: `src/config/googleSheets.js`
2. Намери реда: `GOOGLE_APPS_SCRIPT_URL: ''`
3. Постави копирания URL между кавичките:
   ```javascript
   GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```
4. Запази файла

## Стъпка 7: Тествай

1. Рестартирай сървъра (ако работи)
2. Отвори формата във браузъра
3. Попълни формата и изпрати
4. Провери в Google Sheet дали данните са записани

## Често срещани проблеми

### Данните не се записват
- Провери дали URL-ът е правилно копиран (трябва да завършва на `/exec`)
- Провери дали "Who has access" е настроено на "Anyone"
- Провери конзолата на браузъра за грешки (F12 → Console)

### Получаваш грешка за разрешения
- Увери се, че си дал разрешение в Apps Script
- Опитай отново "Deploy" → "Manage deployments" → "Edit" → "Deploy"

### Кодът не работи след промени
- След всяка промяна в Apps Script код, трябва да направиш нов deployment
- Или редактираш съществуващия: "Deploy" → "Manage deployments" → "Edit" → "Deploy"
