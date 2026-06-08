# QuoteFlow AI

Smart Quotation, Billing, CRM & Marketing Platform

## Project Structure

```
QuoteFlow/
├── backend/          # Spring Boot 4.0.6 / Java 21 API
├── frontend/         # Web application (HTML/CSS/JS)
├── mobile/           # Flutter / React Native app
├── database/         # PostgreSQL schema & migrations
├── docs/             # Project documentation
├── docker-compose.yml
└── README.md
```

## Quick Start

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
```bash
docker-compose up -d postgres
```

## Tech Stack
- **Backend:** Spring Boot 4.0.6, Java 21, JWT
- **Database:** PostgreSQL 16, Redis 7
- **Frontend:** HTML/CSS/JS (modular)
- **Mobile:** Flutter (planned)
- **AI:** OpenAI API, Gemini API
- **Cloud:** AWS (ECS, RDS, S3)
