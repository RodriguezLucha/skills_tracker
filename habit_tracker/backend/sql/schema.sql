DROP TABLE IF EXISTS day CASCADE;

DROP TABLE IF EXISTS calender CASCADE;

DROP TYPE IF EXISTS weekday CASCADE;

DROP TYPE IF EXISTS month CASCADE;

DROP TYPE IF EXISTS status CASCADE;

CREATE TYPE weekday AS ENUM (
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
);

CREATE TYPE month AS ENUM (
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
);

CREATE TYPE status AS ENUM ('Not Set', 'Complete', 'Incomplete');

CREATE TABLE calender (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    year INTEGER
);

CREATE TABLE day (
    id SERIAL PRIMARY KEY,
    day INTEGER,
    month month,
    year INTEGER,
    grid_position INTEGER,
    day_of_week weekday,
    status status,
    note text,
    calender_id INTEGER,
    FOREIGN KEY (calender_id) REFERENCES calender (id) ON DELETE CASCADE
);