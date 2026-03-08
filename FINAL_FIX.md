# Важно: Обнови Apps Script кода за GET заявки

Промених кода да използва GET заявка вместо POST, защото Google Apps Script Web App не получава POST данни правилно с no-cors режим.

## Стъпка 1: Обнови Apps Script кода

Apps Script кода вече поддържа GET заявки чрез `e.parameter`. Не е нужно да променяш Apps Script кода - той вече работи с GET заявки.

## Стъпка 2: Тествай формата

1. Рестартирай сървъра (ако работи)
2. Тествай формата отново
3. Провери Google Sheet дали данните са записани

## Стъпка 3: Тествай директно

Отвори следния URL в браузъра (замени данните с твои):
```
https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec?name=Тест&guest_name=Гост&children=Деца&attendance=С радост потвърждвам&menu=Месо
```

Ако това работи, значи Apps Script кодът е правилен и формата ще работи също.
