# Trip Model

## Table Name
trips

## Description
This table stores all trips created by customers.
Trip cost is calculated only when the trip is completed.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | UUID | Primary Key |
| customer_id | UUID | Foreign Key → users.id |
| vehicle_id | UUID | Foreign Key → vehicles.id |
| location | TEXT | Nullable |
| distance_km | INTEGER | Not Null |
| passengers | INTEGER | Not Null |
| tripCost | INTEGER | Default 0 |
| isCompleted | BOOLEAN | Default false |
| created_at | TIMESTAMP | Default current timestamp |

## Business Rules
- Only customers can create trips
- Vehicle must be available to start a trip
- Trip cost = distance_km × rate_per_km
- Vehicle is released after trip completion

## Relationships
- Each trip belongs to one customer
- Each trip uses one vehicle
# Trip Model

## Table Name
trips

## Description
This table stores all trips created by customers.
Trip cost is calculated only when the trip is completed.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | UUID | Primary Key |
| customer_id | UUID | Foreign Key → users.id |
| vehicle_id | UUID | Foreign Key → vehicles.id |
| location | TEXT | Nullable |
| distance_km | INTEGER | Not Null |
| passengers | INTEGER | Not Null |
| tripCost | INTEGER | Default 0 |
| isCompleted | BOOLEAN | Default false |
| created_at | TIMESTAMP | Default current timestamp |

## Business Rules
- Only customers can create trips
- Vehicle must be available to start a trip
- Trip cost = distance_km × rate_per_km
- Vehicle is released after trip completion

## Relationships
- Each trip belongs to one customer
- Each trip uses one vehicle
