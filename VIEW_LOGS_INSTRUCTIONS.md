# Как да видиш логовете в Google Apps Script

## Проблем: Не можеш да отвориш execution-а

Ако не можеш да отвориш execution-а, ето алтернативни начини:

### Метод 1: Използвай Logger.log() и виж в Execution logs

1. В Apps Script редактора → View → Logs (или Executions)
2. Там ще видиш всички `Logger.log()` съобщения
3. Ако не виждаш нищо, изпрати нова заявка и провери отново

### Метод 2: Добави временен код за тестване

Добави този код в Apps Script за да видиш какво пристига:

```javascript
function testDoGet() {
  // Симулираме заявка
  const testEvent = {
    parameter: {
      name: 'Тест',
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
  
  doGet(testEvent);
}
```

След това:
1. Избери функцията `testDoGet` от dropdown-а
2. Натисни "Run"
3. Провери логовете

### Метод 3: Провери директно в браузъра

1. Отвори Developer Tools (F12) → Console
2. Попълни формата и изпрати
3. Провери конзолата за `Full URL: ...`
4. Копирай URL-а
5. Отвори го директно в нов таб
6. Там ще видиш JSON отговора от Apps Script

### Метод 4: Добави временен Sheet за дебъг

Добави този код в Apps Script за да записва всичко в отделен Sheet:

```javascript
function debugLog(message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let debugSheet = ss.getSheetByName('Debug Logs');
  if (!debugSheet) {
    debugSheet = ss.insertSheet('Debug Logs');
    debugSheet.appendRow(['Timestamp', 'Message']);
  }
  debugSheet.appendRow([new Date(), message]);
}
```

И използвай го вместо Logger.log():
```javascript
debugLog('Received: ' + JSON.stringify(e.parameter));
```

### Метод 5: Провери дали данните се записват в Sheet-а

1. Отвори Google Sheet
2. Провери дали има нови редове след изпращане на формата
3. Ако има данни, значи Apps Script работи
4. Ако няма данни, провери Execution logs за грешки

## Най-бърз начин:

1. Отвори формата в браузъра
2. F12 → Console
3. Попълни формата и изпрати
4. Провери конзолата за `Full URL: ...`
5. Копирай URL-а и го отвори в нов таб
6. Там ще видиш JSON отговора

Ако видиш `{"success":true}`, значи работи!
Ако видиш грешка, копирай я и ми я покажи.
