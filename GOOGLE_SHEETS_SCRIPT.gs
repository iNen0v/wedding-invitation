/**
 * Google Apps Script за запис на RSVP данни в Google Sheets
 * 
 * Инструкции:
 * 1. Създай нов Google Sheet на https://sheets.google.com
 * 2. Заглавният ред ще се създаде автоматично с правилните колони
 * 3. В Google Sheet → Extensions → Apps Script
 * 4. Постави този код
 * 5. Запази проекта (Ctrl+S или Cmd+S)
 * 6. Натисни "Deploy" → "New deployment"
 * 7. Избери тип "Web app"
 * 8. Настройки:
 *    - Description: RSVP Webhook
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 9. Натисни "Deploy"
 * 10. Копирай Web App URL и го добави в src/config/googleSheets.js като GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Проверка и обновяване на заглавния ред, ако е необходимо
    const expectedHeaders = ['Име', 'Контакт', 'Присъствие', 'Има гост', 'Име на гост', 'Меню за гост', 'Има деца', 'Брой деца', 'Деца (детайли)', 'Меню', 'Специални изисквания'];
    
    if (sheet.getLastRow() === 0) {
      // Ако листът е празен, добави заглавен ред
      sheet.appendRow(expectedHeaders);
    } else {
      // Проверяваме дали заглавният ред е правилен
      const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
      const headersMatch = currentHeaders.length === expectedHeaders.length && 
                          currentHeaders.every((header, index) => header === expectedHeaders[index]);
      
      if (!headersMatch) {
        // Обновяваме заглавния ред
        sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
        Logger.log('Заглавният ред е обновен');
      }
    }
    
    // Парсване на данните - поддържа URL-encoded формат
    let name, contact, attendance, hasGuest, guestName, guestMenu, hasChildren, childrenCount, children, menu, specialRequirements;
    
    // Проверка дали e съществува
    if (!e) {
      Logger.log('ERROR: Event object is undefined');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Event object is undefined',
        message: 'Няма event object'
      }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Логване за дебъг
    Logger.log('=== doPost CALLED ===');
    Logger.log('e exists: ' + (e ? 'YES' : 'NO'));
    Logger.log('e.postData exists: ' + (e.postData ? 'YES' : 'NO'));
    Logger.log('e.parameter exists: ' + (e.parameter ? 'YES' : 'NO'));
    
    if (e.postData && e.postData.contents) {
      Logger.log('✅ Using POST data (e.postData.contents)');
      Logger.log('postData.contents length: ' + e.postData.contents.length);
      Logger.log('postData.contents preview: ' + e.postData.contents.substring(0, 200));
      
      // URL-encoded данни от POST заявка - парсване ръчно
      const contents = e.postData.contents;
      const params = {};
      const pairs = contents.split('&');
      Logger.log('Number of pairs: ' + pairs.length);
      
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        if (pair.length === 2) {
          const key = decodeURIComponent(pair[0]);
          const value = decodeURIComponent(pair[1]);
          params[key] = value;
          Logger.log('Parsed: ' + key + ' = ' + value);
        } else {
          Logger.log('Skipping invalid pair: ' + pairs[i]);
        }
      }
      
      Logger.log('Total parsed parameters: ' + Object.keys(params).length);
      name = params['name'] || 'Не е попълнено';
      contact = params['contact'] || 'Не е попълнено';
      attendance = params['attendance'] || 'Не е избрано';
      hasGuest = params['hasGuest'] || 'Не';
      guestName = params['guestName'] || 'Няма';
      guestMenu = params['guestMenu'] || 'Няма';
      hasChildren = params['hasChildren'] || 'Не';
      childrenCount = params['childrenCount'] || '0';
      children = params['children'] || 'Няма';
      menu = params['menu'] || 'Не е избрано';
      specialRequirements = params['specialRequirements'] || 'Няма';
      
      // Логване на всеки параметър поотделно
      Logger.log('--- Parsed POST Parameters ---');
      Logger.log('name: ' + name);
      Logger.log('contact: ' + contact);
      Logger.log('attendance: ' + attendance);
      Logger.log('hasGuest: ' + hasGuest);
      Logger.log('guestName: ' + guestName);
      Logger.log('guestMenu: ' + guestMenu);
      Logger.log('hasChildren: ' + hasChildren);
      Logger.log('childrenCount: ' + childrenCount);
      Logger.log('children: ' + children);
      Logger.log('menu: ' + menu);
      Logger.log('specialRequirements: ' + specialRequirements);
      Logger.log('--- End Parsed Parameters ---');
    } else if (e.parameter) {
      // Данни от GET заявка или URL параметри
      Logger.log('Using GET data (e.parameter)');
      name = e.parameter.name || 'Не е попълнено';
      contact = e.parameter.contact || 'Не е попълнено';
      attendance = e.parameter.attendance || 'Не е избрано';
      hasGuest = e.parameter.hasGuest || 'Не';
      guestName = e.parameter.guestName || 'Няма';
      guestMenu = e.parameter.guestMenu || 'Няма';
      hasChildren = e.parameter.hasChildren || 'Не';
      childrenCount = e.parameter.childrenCount || '0';
      children = e.parameter.children || 'Няма';
      menu = e.parameter.menu || 'Не е избрано';
      specialRequirements = e.parameter.specialRequirements || 'Няма';
      
      // Логване на всеки параметър поотделно
      Logger.log('--- Parsed GET Parameters ---');
      Logger.log('name: ' + name);
      Logger.log('contact: ' + contact);
      Logger.log('attendance: ' + attendance);
      Logger.log('hasGuest: ' + hasGuest);
      Logger.log('guestName: ' + guestName);
      Logger.log('guestMenu: ' + guestMenu);
      Logger.log('hasChildren: ' + hasChildren);
      Logger.log('childrenCount: ' + childrenCount);
      Logger.log('children: ' + children);
      Logger.log('menu: ' + menu);
      Logger.log('specialRequirements: ' + specialRequirements);
      Logger.log('--- End Parsed Parameters ---');
    } else {
      // Логване на грешка
      Logger.log('No data received. Event object: ' + JSON.stringify(e));
      throw new Error('Няма данни за запис. Получени: ' + JSON.stringify(e));
    }
    
    Logger.log('--- Final Data to Save ---');
    Logger.log('name: ' + name);
    Logger.log('contact: ' + contact);
    Logger.log('attendance: ' + attendance);
    Logger.log('hasGuest: ' + hasGuest);
    Logger.log('guestName: ' + guestName);
    Logger.log('guestMenu: ' + guestMenu);
    Logger.log('hasChildren: ' + hasChildren);
    Logger.log('childrenCount: ' + childrenCount);
    Logger.log('children: ' + children);
    Logger.log('menu: ' + menu);
    Logger.log('specialRequirements: ' + specialRequirements);
    
    // Записване на данните в sheet
    try {
      sheet.appendRow([
        name,
        contact,
        attendance,
        hasGuest,
        guestName,
        guestMenu,
        hasChildren,
        childrenCount,
        children,
        menu,
        specialRequirements
      ]);
      
      Logger.log('✅ Data saved successfully: ' + name);
      Logger.log('Row number: ' + sheet.getLastRow());
    } catch (appendError) {
      Logger.log('❌ ERROR appending row: ' + appendError.toString());
      Logger.log('Error stack: ' + appendError.stack);
      throw appendError;
    }
    
    // Добавяне на CORS headers за поддръжка от браузъри
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Данните са записани успешно',
      data: {
        name: name,
        contact: contact,
        attendance: attendance
      }
    }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    Logger.log('Request data: ' + JSON.stringify(e));
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Функция за GET заявки (за работа с no-cors режим от браузъри)
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Проверка и обновяване на заглавния ред, ако е необходимо
    const expectedHeaders = ['Име', 'Контакт', 'Присъствие', 'Има гост', 'Име на гост', 'Меню за гост', 'Има деца', 'Брой деца', 'Деца (детайли)', 'Меню', 'Специални изисквания'];
    
    if (sheet.getLastRow() === 0) {
      // Ако листът е празен, добави заглавен ред
      sheet.appendRow(expectedHeaders);
      Logger.log('Заглавният ред е създаден');
    } else {
      // Проверяваме дали заглавният ред е правилен
      const currentHeaders = sheet.getRange(1, 1, 1, expectedHeaders.length).getValues()[0];
      const headersMatch = currentHeaders.length === expectedHeaders.length && 
                          currentHeaders.every((header, index) => header === expectedHeaders[index]);
      
      if (!headersMatch) {
        // Обновяваме заглавния ред
        sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
        Logger.log('Заглавният ред е обновен');
      }
    }
    
    // Проверка дали e съществува
    if (!e) {
      Logger.log('ERROR: Event object (e) is undefined');
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Event object is undefined',
        message: 'Няма event object'
      }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Логване за дебъг
    Logger.log('=== doGet CALLED ===');
    Logger.log('e exists: ' + (e ? 'YES' : 'NO'));
    Logger.log('e.parameter exists: ' + (e.parameter ? 'YES' : 'NO'));
    Logger.log('e.queryString: ' + (e.queryString || 'EMPTY'));
    Logger.log('e type: ' + typeof e);
    if (e) {
      Logger.log('e keys: ' + Object.keys(e).join(', '));
    }
    
    // Проверка дали има параметри
    if (!e.parameter || Object.keys(e.parameter).length === 0) {
      Logger.log('WARNING: No parameters in e.parameter');
      Logger.log('e.parameter type: ' + typeof e.parameter);
      Logger.log('e.parameter value: ' + JSON.stringify(e.parameter));
      
      // Опитваме се да прочетем от queryString ако има
      if (e.queryString && e.queryString.length > 0) {
        Logger.log('Trying to parse queryString: ' + e.queryString);
        Logger.log('queryString length: ' + e.queryString.length);
        const params = {};
        const pairs = e.queryString.split('&');
        Logger.log('Number of pairs in queryString: ' + pairs.length);
        
        for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i].split('=');
          if (pair.length === 2) {
            const key = decodeURIComponent(pair[0]);
            const value = decodeURIComponent(pair[1]);
            params[key] = value;
            Logger.log('Parsed: ' + key + ' = ' + value);
          } else {
            Logger.log('Skipping invalid pair: ' + pairs[i]);
          }
        }
        Logger.log('Parsed from queryString: ' + JSON.stringify(params));
        Logger.log('Number of parsed parameters: ' + Object.keys(params).length);
        
        if (Object.keys(params).length > 0) {
          // Използваме параметрите от queryString
          e.parameter = params;
          Logger.log('✅ Using parameters from queryString');
        } else {
          Logger.log('❌ No valid parameters found in queryString');
        }
      } else {
        Logger.log('No queryString found');
      }
      
      // Ако все още няма параметри, връщаме статус
      if (!e.parameter || Object.keys(e.parameter).length === 0) {
        Logger.log('❌ No parameters found, returning status');
        Logger.log('Final check - e.parameter: ' + JSON.stringify(e.parameter));
        return ContentService.createTextOutput(JSON.stringify({
          status: 'RSVP Webhook is running',
          message: 'Няма параметри за запис',
          hasEvent: !!e,
          hasParameters: false,
          queryString: e.queryString || '',
          queryStringLength: (e.queryString || '').length,
          timestamp: new Date().toISOString()
        }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Логване за дебъг
    Logger.log('=== doGet CALLED ===');
    Logger.log('Number of parameters: ' + Object.keys(e.parameter).length);
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    
    // Извличане на параметрите
    const p = e.parameter;
    
    const name = p.name || 'Не е попълнено';
    const contact = p.contact || 'Не е попълнено';
    const attendance = p.attendance || 'Не е избрано';
    const hasGuest = p.hasGuest || 'Не';
    const guestName = p.guestName || 'Няма';
    const guestMenu = p.guestMenu || 'Няма';
    const hasChildren = p.hasChildren || 'Не';
    const childrenCount = p.childrenCount || '0';
    const children = p.children || 'Няма';
    const menu = p.menu || 'Не е избрано';
    const specialRequirements = p.specialRequirements || 'Няма';
    
    // Логване на извлечените данни
    Logger.log('--- Extracted Data ---');
    Logger.log('name: ' + name);
    Logger.log('contact: ' + contact);
    Logger.log('attendance: ' + attendance);
    Logger.log('hasGuest: ' + hasGuest);
    Logger.log('guestName: ' + guestName);
    Logger.log('guestMenu: ' + guestMenu);
    Logger.log('hasChildren: ' + hasChildren);
    Logger.log('childrenCount: ' + childrenCount);
    Logger.log('children: ' + children);
    Logger.log('menu: ' + menu);
    Logger.log('specialRequirements: ' + specialRequirements);
    
    // Записване на данните в sheet
    try {
      sheet.appendRow([
        name,
        contact,
        attendance,
        hasGuest,
        guestName,
        guestMenu,
        hasChildren,
        childrenCount,
        children,
        menu,
        specialRequirements
      ]);
      
      Logger.log('✅ Data saved successfully: ' + name);
      Logger.log('Row number: ' + sheet.getLastRow());
    } catch (appendError) {
      Logger.log('❌ ERROR appending row: ' + appendError.toString());
      Logger.log('Error stack: ' + appendError.stack);
      throw appendError;
    }
    
    // Връщаме успешен отговор
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Данните са записани успешно',
      data: {
        name: name,
        contact: contact,
        attendance: attendance
      }
    }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('❌ Error in doGet: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: 'Грешка при запис на данните'
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Тестова функция за проверка дали doGet работи правилно
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
  
  Logger.log('=== TESTING doGet ===');
  const result = doGet(testEvent);
  const resultText = result.getContent();
  Logger.log('Test result: ' + resultText);
  
  // Проверяваме дали данните са записани
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  Logger.log('Last row in sheet: ' + lastRow);
  
  if (lastRow > 1) {
    const testData = sheet.getRange(lastRow, 1, 1, 11).getValues()[0];
    Logger.log('Last row data: ' + JSON.stringify(testData));
  }
  
  return resultText;
}
