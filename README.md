# Chaos Organizer - Глобальный бот-органайзер

[![CI/CD](https://github.com/AleksandrMuzhev/chaos-organizer/actions/workflows/ci.yml/badge.svg)](https://github.com/AleksandrMuzhev/chaos-organizer/actions/workflows/ci.yml)
[![Code Quality](https://github.com/AleksandrMuzhev/chaos-organizer/actions/workflows/code-quality.yml/badge.svg)](https://github.com/AleksandrMuzhev/chaos-organizer/actions/workflows/code-quality.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://AleksandrMuzhev.github.io/chaos-organizer/)
[![Heroku](https://heroku-badge.herokuapp.com/?app=chaos-organizer)](https://chaos-organizer.herokuapp.com)

## О проекте

**Chaos Organizer** - это инновационное веб-приложение, сочетающее функциональность мессенджера и персонального органайзера. Вдохновленное лучшими практиками Telegram, WhatsApp и Slack, приложение позволяет хранить, искать и организовывать информацию в удобном формате.

### Основная концепция

Ключевая идея - создать бота, предназначенного для хранения информации, поиска и других сервисов: напоминания, уведомления и интеграции с внешними сервисами. Вы закидываете туда всю информацию, которая вам нужна, а он сортирует, обеспечивает поиск, хранение и напоминание.

### Ключевые особенности

- 📝 **Текстовые сообщения** с поддержкой ссылок и emoji
- 📎 **Загрузка файлов** (изображения, видео, аудио) через Drag & Drop
- 🔍 **Полнотекстовый поиск** по всем сообщениям
- 📌 **Закрепление** важных сообщений
- ⭐ **Избранное** для быстрого доступа к важной информации
- 🤖 **Команды бота** для получения справки, погоды, времени
- 🔄 **Синхронизация** между вкладками в реальном времени
- 📱 **Адаптивный дизайн** для всех устройств

## Технологии

### Frontend
- **React 17** - Современная библиотека для UI
- **Webpack 5** - Сборка и оптимизация
- **Babel** - Транспиляция JavaScript
- **CSS Modules** - Стилизация компонентов
- **WebSocket** - Синхронизация в реальном времени
- **Emoji Mart** - Поддержка смайликов

### Backend
- **Koa** - Легковесный Node.js фреймворк
- **WebSocket (ws)** - Двусторонняя связь
- **Multer** - Обработка загрузки файлов
- **UUID** - Генерация уникальных идентификаторов

### DevOps & CI/CD
- **GitHub Actions** - Автоматическая сборка и деплой
- **GitHub Pages** - Хостинг фронтенда
- **Heroku** - Хостинг бэкенда
- **ESLint** - Проверка качества кода

## Установка и запуск

### Требования
- Node.js 16+
- npm 8+ или yarn 1.22+

### 1. Клонирование репозитория

```bash
git clone https://github.com/AleksandrMuzhev/chaos-organizer.git
cd chaos-organizer
```

### 2. Установка зависимостей

```bash
# Установка зависимостей для сервера
cd server
npm install

# Установка зависимостей для клиента
cd ../client
npm install
```

### 3. Настройка окружения

Создайте файл `.env` в папке `server`:

```env
PORT=3000
NODE_ENV=development
```

### 4. Запуск в режиме разработки

**Терминал 1 - Сервер:**
```bash
cd server
npm run dev
```

**Терминал 2 - Клиент:**
```bash
cd client
npm run dev
```

Приложение будет доступно по адресу `http://localhost:8080`

### 5. Сборка для продакшена

```bash
# Сборка клиента
cd client
npm run build

# Запуск сервера в продакшен режиме
cd ../server
npm start
```

## Использование

### Основные функции

#### 📝 Отправка сообщений
1. Введите текст в поле ввода внизу экрана
2. Нажмите Enter или кнопку отправки
3. Для вставки emoji нажмите на кнопку 😊

#### 📎 Загрузка файлов
- **Drag & Drop**: Перетащите файл в область загрузки
- **Клик**: Нажмите на область загрузки и выберите файл
- Поддерживаются: изображения, видео, аудио

#### 📌 Закрепление сообщений
1. Наведите на сообщение
2. Нажмите на иконку 📌
3. Закрепленное сообщение появится вверху чата

#### ⭐ Избранное
1. Наведите на сообщение
2. Нажмите на иконку ☆ (добавить) или ⭐ (удалить)
3. Просмотр избранного через кнопку в заголовке

#### 🔍 Поиск
1. Введите текст в поле поиска в боковой панели
2. Результаты отобразятся в основном окне
3. Очистить поиск - нажмите ✕

#### 🤖 Команды бота
Введите `@chaos: команда` в поле ввода:
- `@chaos: погода` - случайный прогноз
- `@chaos: время` - текущее время
- `@chaos: дата` - текущая дата
- `@chaos: привет` - приветствие
- `@chaos: справка` - список команд

### 🔄 Синхронизация
- При открытии приложения в нескольких вкладках
- Все действия синхронизируются в реальном времени
- Изменения применяются мгновенно

## Архитектура

```
chaos-organizer/
├── client/                      # Frontend React приложение
│   ├── src/
│   │   ├── components/          # React компоненты
│   │   │   ├── App.jsx          # Корневой компонент
│   │   │   ├── MessageList.jsx  # Список сообщений
│   │   │   ├── Message.jsx      # Отдельное сообщение
│   │   │   ├── MessageInput.jsx # Поле ввода
│   │   │   ├── FileUpload.jsx   # Загрузка файлов
│   │   │   ├── SearchBar.jsx    # Поиск
│   │   │   ├── FavoritesList.jsx# Избранное
│   │   │   └── PinnedMessage.jsx# Закрепленные сообщения
│   │   ├── services/
│   │   │   └── api.js           # API и WebSocket сервисы
│   │   ├── styles/              # CSS стили
│   │   ├── index.js             # Точка входа
│   │   └── index.html           # HTML шаблон
│   ├── public/                  # Статические файлы
│   ├── package.json
│   ├── webpack.config.js        # Конфигурация Webpack
│   ├── .babelrc                 # Конфигурация Babel
│   └── .eslintrc                # Конфигурация ESLint
├── server/                      # Backend Koa приложение
│   ├── src/
│   │   ├── index.js             # Точка входа сервера
│   │   └── routes/              # API маршруты
│   ├── uploads/                 # Загруженные файлы
│   ├── package.json
│   └── .env                     # Переменные окружения
├── .github/
│   └── workflows/
│       ├── ci.yml               # CI/CD для GitHub Actions
│       └── code-quality.yml     # Проверка качества кода
├── .gitignore
└── README.md
```

## API Endpoints

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/messages` | Получение сообщений с пагинацией |
| POST | `/api/messages` | Отправка текстового сообщения |
| POST | `/api/upload` | Загрузка файла |
| GET | `/api/messages/search` | Поиск по сообщениям |
| POST | `/api/messages/pin` | Закрепление сообщения |
| DELETE | `/api/messages/pin` | Открепление сообщения |
| GET | `/api/messages/pin` | Получение закрепленного |
| POST | `/api/messages/favorite` | Добавление в избранное |
| DELETE | `/api/messages/favorite` | Удаление из избранного |
| GET | `/api/messages/favorites` | Получение избранных |
| POST | `/api/bot/command` | Команда бота |

## Тестирование

```bash
# Запуск тестов клиента
cd client
npm test

# Запуск тестов сервера
cd server
npm test
```

## Деплой

### GitHub Pages (Frontend)

Автоматический деплой через GitHub Actions при пуше в main/master:

1. Убедитесь, что в репозитории включены GitHub Pages
2. Настройте ветку `gh-pages` как источник

### Heroku (Backend)

1. Создайте приложение на Heroku:
```bash
heroku create chaos-organizer
```

2. Настройте переменные окружения:
```bash
heroku config:set NODE_ENV=production
```

3. Добавьте секреты в GitHub:
- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

## Мониторинг

- **GitHub Actions**: Статус сборки и тестов
- **Heroku Logs**: `heroku logs --tail`
- **Performance**: Используйте Heroku Metrics