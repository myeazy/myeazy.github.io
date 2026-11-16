# EAZY — разборы ЕГЭ по информатике

Статический сайт-объяснялка: каталог 27 заданий, полные разборы (теория, пример, видео, код, тренировка), поиск, тёмная тема, локальный прогресс.

## Локальный запуск

```bash
python3 -m http.server 8080
# открыть http://localhost:8080
```

## Структура

- `index.html` — главная
- `tasks.html` — каталог 27 заданий
- `task.html?id=N` — страница разбора (рендерится из данных)
- `about.html` — о проекте
- `assets/tasks.js` — единственный источник контента (массив `TASKS`)
- `assets/app.js` — тема, поиск, карточки, каталог
- `assets/task.js` — рендер разбора: видео, код, практика, прогресс
- `assets/styles.css`, `assets/task.css` — стили

## Деплой на GitHub Pages

```bash
git init && git add . && git commit -m "init"
git branch -M main
git remote add origin git@github.com:<user>/ege-yasno.git
git push -u origin main
# Settings → Pages → Deploy from branch → main / root
```

## Как добавить разбор

1. В `assets/tasks.js` найди задание по `id`.
2. Поставь `ready: true` и заполни поля: `intro`, `theory`, `formulas`, `steps`, `example`, `errors`, `code`, `practices`, опционально `video` (YouTube/RuTube — вставится как embed по клику).
3. Ответы в `practices.accepted` — массив допустимых строк; сравнение нечувствительно к регистру и пробелам.

## Проверки контента

```bash
node --check assets/tasks.js && node --check assets/app.js && node --check assets/task.js
python3 - <<'PY'
import re,json
src=open('assets/tasks.js').read()
ids=re.findall(r'\{id:(\d+)', src)
assert len(ids)==27 and len(set(ids))==27, 'нужно 27 уникальных id'
print('ok: 27 заданий')
PY
```
