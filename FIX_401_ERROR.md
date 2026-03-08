# Как да поправиш грешката 401 (Unauthorized)

Грешката 401 означава, че Google Apps Script не приема заявката поради проблем с разрешенията.

## Стъпка 1: Провери deployment настройките

1. Отвори Google Sheet → **Разширения** → **Apps Script**
2. Натисни **Deploy** → **Manage deployments**
3. Натисни ✏️ (Edit) до deployment-а
4. **ВАЖНО:** Провери следните настройки:
   - **Execute as:** Me (мене)
   - **Who has access:** **Anyone** (важно! не "Only myself")
5. Ако не е "Anyone", смен го на "Anyone"
6. Натисни **Deploy**

## Стъпка 2: Дай разрешение отново (ако е необходимо)

1. След като направиш deployment, може да се покаже прозорец за разрешения
2. Натисни **Authorize access**
3. Избери твоя Google акаунт
4. Натисни **Advanced** → **Go to [Project Name] (unsafe)**
5. Натисни **Allow**

## Стъпка 3: Провери дали deployment-ът е правилен

1. В **Manage deployments**, провери дали виждаш:
   - **Type:** Web app
   - **Who has access:** Anyone
   - **Execute as:** Me

## Стъпка 4: Направи нов deployment (ако не помогне)

1. **Deploy** → **Manage deployments**
2. Изтрий стария deployment (🗑️)
3. **Deploy** → **New deployment**
4. Избери **Web app**
5. Настройки:
   - **Description:** RSVP Webhook
   - **Execute as:** Me
   - **Who has access:** **Anyone** (важно!)
6. Натисни **Deploy**
7. Дайте разрешение ако се поиска
8. Копирай новия Web App URL
9. Обнови URL-а в `src/config/googleSheets.js` ако е различен

## Стъпка 5: Тествай отново

1. Рестартирай сървъра
2. Тествай формата отново
3. Провери Google Sheet дали данните са записани
