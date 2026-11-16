# EAZY — разборы заданий ЕГЭ и ОГЭ

Статический сайт-объяснялка. PWA: устанавливается как приложение, работает офлайн.

## Структура URL

- `/` — промо-страница
- `/app/` — каталог (PWA start_url)
- `/info/` — о проекте
- `/support/` — поддержать, спонсоры, контрибьюторы
- `/ege/informatika/N/` — разбор задания N (1–27)
- `404.html` — страница ошибки с мотивацией

## Технически

- Без сборки: чистый HTML/CSS/JS
- Шрифт логотипа: Zero Cool (субсет woff2 в `assets/fonts.css`, также Exotica)
- Тема: светлая/тёмная, системная по умолчанию, переключение с анимацией от точки нажатия
- Ответы в тренировках проверяются локально, без сервера
- Service worker: network-first, офлайн-запас из кэша

## Контент — как добавить разбор

Архитектура разделена на два слоя:

1. **Метаданные** — `assets/tasks.js`: массив из 27 заданий (`id, title, short, category, level, time, ready, tags`). Чтобы задание открылось — поставь `ready: true`.
2. **Контент разбора** — `assets/tasks/NN.js` (например `08.js`). Файл вида:

```js
window.EAZY_CONTENT = window.EAZY_CONTENT || {};
window.EAZY_CONTENT[8] = {
  intro: '...',           // лид под заголовком
  theory: '...',          // HTML: теория без воды
  formulas: [['Название', 'HTML-формула'], ...],
  steps: ['шаг 1', ...],  // алгоритм решения
  example: { text, solution, answer },
  errors: ['ошибка 1', ...],
  code: 'python-код строкой',
  practices: [{ text, hint, answer, accepted: ['...'], explanation }],
  video: 'https://...',   // опционально (YouTube/RuTube)
  videoTitle: '...', videoAuthor: '...'
};
```

Страница `/ege/informatika/NN/` сама подхватит `assets/tasks/NN.js`.

Проверки перед пушем: `node --check assets/tasks.js assets/tasks/NN.js` и открыть страницу задания локально.

## Деплой

GitHub Pages из ветки `main`, корень репозитория.
