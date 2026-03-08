# Проверка на съвпадение на ключовете

## Ключове, които изпраща формата (Questionnaire.jsx):

1. `name` - Име
2. `contact` - Контакт
3. `attendance` - Присъствие
4. `hasGuest` - Има гост
5. `guestName` - Име на гост
6. `guestMenu` - Меню за гост
7. `hasChildren` - Има деца
8. `childrenCount` - Брой деца
9. `children` - Деца (детайли)
10. `menu` - Меню
11. `specialRequirements` - Специални изисквания

## Ключове, които очаква Apps Script (GOOGLE_SHEETS_SCRIPT.gs):

1. `name` ✓
2. `contact` ✓
3. `attendance` ✓
4. `hasGuest` ✓
5. `guestName` ✓
6. `guestMenu` ✓
7. `hasChildren` ✓
8. `childrenCount` ✓
9. `children` ✓
10. `menu` ✓
11. `specialRequirements` ✓

## ✅ Заключение: Всички ключове съвпадат!

Всички ключове от формата съвпадат с тези, които очаква Apps Script.

## Как да провериш дали данните пристигат правилно:

1. Отвори Developer Tools (F12) → Console
2. Попълни формата и изпрати
3. Провери конзолата за `Full URL: ...`
4. Копирай URL-а и го отвори директно в браузъра
5. Провери Google Apps Script → Executions → последното изпълнение → Logs
6. Там ще видиш точно какви параметри са пристигнали
