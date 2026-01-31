# User Model

## Table Name
users

## Description
This table stores all the users of the fleet management system.
Only three roles are allowed: customer, owner, and driver.

## Columns

| Column Name | Data Type | Constraints |
|------------|----------|-------------|
| id | UUID | Primary Key |
| name | TEXT | Not Null |
| email | TEXT | Unique, Not Null |
| password | TEXT | Not Null |
| role | TEXT | customer / owner / driver |
| created_at | TIMESTAMP | Default current timestamp |

## Role Rules
- A user can have only ONE role
- Allowed roles:
  - customer
  - owner
  - driver

## Relationships
- Owner → can own multiple vehicles
- Driver → can be assigned to vehicles
- Customer → can create multiple trips
