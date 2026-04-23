# Meteo-API

API for collecting, storing, and monitoring meteorological data using Meteomatics Weather API.

The project was developed focusing on **continuous monitoring** scenarios, allowing not only to query weather data, but also to:

- Persist measurement history
- Automate periodic data collection
- Define alerts based on specific conditions

---

> 🇧🇷 [Leia este README em português](./README_pt-br.md)

---

## 🚀 Technologies

- **Node.js + NestJS** → modular and scalable structure
- **TypeScript** → typing and greater security
- **MySQL + Prisma ORM** → persistence and relational modeling
- **Docker** → environment standardization
- **Swagger** → API documentation
- **Jest** → automated tests


## 📦 Data Model

The system was structured in a relational way, separating domain entities to allow flexibility in data collection and analysis.

- **Location**: Represents a geographic point (latitude/longitude) to be monitored.

- **Parameter**: Defines which weather variables can be collected (e.g., temperature, humidity, precipitation).

- **Measurement**: Stores the data collected over time, forming the measurement history.

- **Schedule**: Responsible for defining the periodicity of collections (e.g., daily, specific days of the week or month).

- **Alert**: Configurable rules that evaluate measurements and trigger events when conditions are met.

## 🌐 API

The API follows REST standard and exposes endpoints for managing the main entities:

- **Locations** → creation and query of geographic points  
- **Parameters** → management of monitored variables  
- **Measurements** → collection and query of weather data  
- **Schedules** → configuration of automatic collections  
- **Alerts** → definition and query of alert rules  

## 🧪 Tests

An example request for the **Measurement** endpoint can be found at:

```
src/tools/dev/resources/measurement.test.json
```

The expected response is similar to:

![Response Example](docs/response-measurement.png)

### Testing Alerts

1. Create a measurement
2. Note: `locationId`, `parameterId` and `value`
3. Create an alert based on these values:
   - Use `>` for values below expected
   - Use `<` for values above
4. Run the measurement again with the same parameters

If the condition is met, the system will return an **alert trigger**.

## ⚙️ Installation

### Prerequisites

- Docker
- Docker Compose

### Steps

```bash
git clone <URL>
cd meteo-api
cp .env.example .env
docker compose up -d --build
```

### Running migrations

```
docker exec -it meteoapi-api-1 sh
npx prisma migrate deploy
```

The application will be available at:

```
http://localhost:3000
```

## 🔄 How It Works

1. User defines a location (latitude/longitude)
2. A schedule is created
3. The system queries Meteomatics API periodically
4. Data is persisted in the database
5. Alert rules are evaluated
6. If conditions are met, an alert is triggered


## 🧠 Architecture

The application follows a NestJS module-based structure:

- Controllers → request entry points
- Services → business rules
- Repositories/ORM → database access
- Scheduler → periodic task execution


## Links

Meteomatics: https://www.meteomatics.com/en/weather-api/