DROP TYPE IF EXISTS ht_weekday CASCADE;

CREATE TYPE ht_weekday AS ENUM (
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
);

DROP TYPE IF EXISTS ht_month CASCADE;

CREATE TYPE ht_month AS ENUM (
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

DROP TYPE IF EXISTS ht_status CASCADE;

CREATE TYPE ht_status AS ENUM ('Not Set', 'Complete', 'Incomplete');

DROP TABLE IF EXISTS ht_day CASCADE;

CREATE TABLE ht_day (
    id SERIAL PRIMARY KEY,
    day INTEGER,
    month ht_month,
    year INTEGER,
    grid_position INTEGER,
    day_of_week ht_weekday,
    status ht_status,
    note text
);

DROP TABLE IF EXISTS ht_calender CASCADE;

CREATE TABLE ht_calender (
    id SERIAL PRIMARY KEY,
    ht_day_id INTEGER,
    calender_name varchar(255),
    FOREIGN KEY (ht_day_id) REFERENCES ht_day (id)
);