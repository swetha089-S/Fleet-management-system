# Vehicle Model

## Table Name
vehicles

## Description
This table stores all vehicles registered by owners.
Each vehicle has a unique registration number.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | UUID | Primary Key |
| name | TEXT | Not Null |
| registration_number | TEXT | Unique, Not Null |
| allowed_passengers | INTEGER | Not Null |
| isAvailable | BOOLEAN | Default true |
| rate_per_km | INTEGER | Not Null |
| owner_id | UUID | Foreign Key → users.id |
| driver_id | UUID | Nullable, Foreign Key → users.id |
| created_at | TIMESTAMP | Default current timestamp |

## Business Rules
- Only owners can create vehicles
- Registration number must be unique
- Vehicle availability changes during trip lifecycle

## Relationships
- Vehicle belongs to one owner
- Vehicle can have one assigned driver
- Vehicle can be used in trips (one at a time)
