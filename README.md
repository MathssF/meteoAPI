# Meteo-API Project

This project aims to fetch the Meteomatics API (https://www.meteomatics.com/en/weather-api/), and create its own persistence, so it can later be used as an API.

## Structure

### Database

The database contains some main tables:

**Local**: Locations, with id, name, latitude and longitude.

**Parameters**: Different measurement parameters, such as temperature, visibility, precipitation, available to be used and checked.

**Measurement**: The main table! It is a persistence that recalls all previous results.

**Schedule**: Table that performs scheduled measurements, on specific days of the week or on specific days of the month.

**Alerts**: Reminders for when a location presents some measure of a parameter greater or lesser than a certain value. To generate alerts this way.

Besides other secondary tables.

### API

Similar to the tables we have:

**Local**: To add records, or see registered locations.

**Parameters**: To add new parameters to searches, or verify existing ones.

**Measurement**: The most important API. It can both search and create new records in the database. As well as show all that have happened.

**Schedule**: To add a schedule or view schedules.

**Alerts**: To add an alert or view alerts.