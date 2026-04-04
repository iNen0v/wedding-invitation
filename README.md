# 💐 Сватбена покана (wedding-invitation)

Уебсайт за сватбена покана с React и Vite.

## Функции

- **Покана** – вградена Canva покана на началната страница
- **Линк към картата** – единствен кликаем елемент на началната страница; отваря Google Maps в нов таб (адресът се задава в конфига)
- **Въпросник за присъствие** – на `/questionnaire`; линк към Google Forms за RSVP
- **Курсор** – навсякъде е обикновена стрелка (default)

## Технологии

- React 18, Vite 6, React Router 6

## Конфигурация

В `src/config/googleSheets.js`:

- **GOOGLE_FORM_RSVP_URL** – пълен линк към Google Forms за въпросника за присъствие

## Стартиране

```bash
npm install
npm run dev
```

Build за production:

```bash
npm run build
npm run preview
```

## Маршрути

- `/` и `/invitation` – покана (само линкът към картата е кликаем)
- `/questionnaire` – линк към Google Forms за RSVP

## Лиценз

MIT
