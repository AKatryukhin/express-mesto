# Проектная работа "Mesto фронтенд + бэкенд"

В 13 проектной работе началась реализация бэкенда для приложения Mesto.
Создано приложение на Express. Созданы контроллеры и роуты для пользователей и карточек.
"`/routes` — папка с файлами роутера  \r `/controllers` — папка с файлами контроллеров пользователя и карточки   \r `/models` — папка с файлами описания схем пользователя и карточки"

В 14 проектной работе реализована возможность регистрации и авторизации.
К схеме пользователя добавлены password и уникальный email. Доработан контроллер createUser.
Создан контроллер login, который получает из запроса почту и пароль и проверяет их. Если почта и пароль правильные, контроллер создаtn JWT сроком на неделю, и записывает в в httpOnly куку.
Созданы роуты для логина и регистрации.
Создан мидлвэр auth для авторизации.
Создан контроллер и роут для получения информации о пользователе.
Защены авторизацией все маршруты, кроме страницы регистрации и логина.
Реализована централизованная обработка ошибок.
Настроена валидация приходящих на сервер запросов.
Посредством регулярных выражений настроена валидация полей avatar и link на уровне схемы.

Проект взаимодействует с фронтенд частью: mesto.front.nomoredomains.monster

