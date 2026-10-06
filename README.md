# HBI Medical Analytics

Платформа мониторинга и аналитики для медицинских организаций (емханалар / ауруханалар): импорт данных, контроль аутсорсинга, антифрод-аналитика, риски по оборудованию и кадрам, КРИ — плюс AI-отчёты на базе Gemini.

Интерфейс и генерируемые аналитические нарративы — на казахском языке.

## Возможности

- **Аутсорсинг-дашборд** — расходы на внешние подрядчиков, доля частного сектора, HHI-индекс концентрации, дубликаты услуг (actVsRegistryMismatch).
- **Антифрод-аналитика** — сигналы аномалий: overloading исполнителей, дублирующие манипуляции, upcoding, с суммами и участниками.
- **Оборудование** — downtime по подразделениям, износ, количество ремонтов, планирование Outsource vs Buy (payback period, прогноз экономии).
- **Кадровые риски** — обеспеченность штата, дефицит на фоне отпусков по уходу и выходов на пенсию.
- **Качество данных** — контроль полноты и согласованности реестра.
- **AI-отчёт (Decision Memo)** — генерация структурированного аналитического нарратива для руководства на Gemini: статус рисков, конфликт интересов, фрод-угрозы, кадрово-технические прогнозы, ROI-рекомендации и план действий.

## Стек

- **Frontend:** React 19, Vite 6, TypeScript, Tailwind CSS 4, Motion (анимации), lucide-react
- **Backend:** Express + tsx, Vite в middleware-режиме (dev)
- **AI:** Google Gemini (`@google/genai`), модель `gemini-3.5-flash`

## Быстрый старт

Требуется Node.js 20+.

```bash
npm install
```

Создайте `.env.local` (см. `.env.example`):

```env
GEMINI_API_KEY=ваш_ключ
```

Запуск dev-сервера:

```bash
npm run dev
# → http://localhost:3000
```

> Без `GEMINI_API_KEY` приложение запускается и все дашборды работают,
> но AI-генерация отчётов будет возвращать ошибку.

## Прод-сборка

```bash
npm run build   # vite build + esbuild server.ts → dist/server.cjs
npm start       # node dist/server.cjs
```

## API

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/gemini/analyze` | Генерация AI-отчёта (Decision Memo) на основе KPI, алертов, downtime и ROI-данных организации |

Request body:

```json
{
  "orgName": "Название организации",
  "metrics": { "totalOutsourceSpend": 0, "privateSharePercent": 0, "hhiIndex": 0, "duplicateRate": 0, "equipmentDowntimeTotal": 0, "staffCoveragePercent": 0, "projectedAnnualSavings": 0 },
  "alerts": [{ "severity": "HIGH", "title": "", "description": "", "doctorName": "", "flaggedAmount": 0 }],
  "equipmentDowntime": [{ "name": "", "department": "", "depreciationPercent": 0, "repairCount": 0, "downtimeDays": 0 }],
  "roiPlanner": [{ "equipmentName": "", "category": "", "monthlyOutsourceCost": 0, "internalPurchasePrice": 0, "paybackPeriodMonths": 0, "recommendation": "" }],
  "requestDetails": "Текст запроса аналитика"
}
```

## Структура

```
server.ts                      # Express: /api/gemini/analyze + Vite-прокси
src/
  App.tsx                      # Каркас приложения и навигация
  mockData.ts                  # Демо-данные KPI, алерты, downtime, ROI
  types.ts                     # Доменные типы
  components/
    OutsourcingDashboard.tsx   # Аутсорсинг и концентрация
    FraudDashboard.tsx         # Антифрод-сигналы
    EquipmentDashboard.tsx     # Оборудование и Outsource vs Buy
    HrDashboard.tsx            # Кадровые риски
    DataQualityDashboard.tsx   # Качество данных
    ReportGenerator.tsx        # AI-отчёт через Gemini
    DocumentUploadWizard.tsx   # Импорт документов
    SettingsPanel.tsx          # Настройки организации
```
