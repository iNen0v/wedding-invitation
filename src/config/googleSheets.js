// Google Sheets Configuration
// За да използваш Google Sheets интеграцията:
// 1. Създай Google Sheet на https://sheets.google.com
// 2. В Google Sheet → Extensions → Apps Script
// 3. Постави кода от GOOGLE_SHEETS_SCRIPT.gs в Apps Script редактора
// 4. Deploy → New deployment → Web app → Who has access: Anyone → Deploy
// 5. Копирай Web App URL и го постави долу като GOOGLE_APPS_SCRIPT_URL

// Zapier: URL за изпращане на данни от RSVP формата
export const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26734887/uxt1h58/'

export const GOOGLE_CONFIG = {
  // Google Apps Script Web App URL (от Google Apps Script deployment)
  // Пример: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
  GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwnFwYxTKMd7z3sogYw6zYHPJQNy56ciNDacBgu_kTc2eH44deOrYhQATpzoUlgftYS/exec',
  
  // Google API Key (опционално, за бъдещи разширения)
  API_KEY: 'AIzaSyCLcD6iONiiL7bMPEvI4aJ1c6aC9m1rtkU'
}
