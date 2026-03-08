# Обяснение за Library URL vs Web App URL

## Какво е Library URL?

Library URL (`1W4LFYKbJ7nkyuYe24bQfkS6qAW03aRZWgIQZ8DpgEuFvDkUP00aWpL_V`) се използва когато искаш да споделиш Apps Script проект като **библиотека**, която други Apps Script проекти могат да използват.

## Какво е Web App URL?

Web App URL (`https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec`) се използва за **директни HTTP заявки** от браузъри, форми, и други приложения.

## За нашия случай:

✅ **Нуждаем се от:** Web App URL (вече е в `src/config/googleSheets.js`)
❌ **НЕ нуждаем се от:** Library URL

## Заключение:

Library ID `1W4LFYKbJ7nkyuYe24bQfkS6qAW03aRZWgIQZ8DpgEuFvDkUP00aWpL_V` **НЕ липсва** - просто не е необходим за текущата функционалност.

Ако в бъдеще искаш да споделиш този код като библиотека за други Apps Script проекти, тогава ще го използваш. Но за сега не е нужно.

## Текуща конфигурация:

В `src/config/googleSheets.js` имаме:
- ✅ `GOOGLE_APPS_SCRIPT_URL` - това е Web App URL, който използваме
- ✅ `API_KEY` - Google API ключ (опционално)

Това е всичко, от което се нуждаем!
