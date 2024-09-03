CREATE SCHEMA IF NOT EXISTS log;

CREATE TABLE log."event_log"
(
    id           UUID PRIMARY KEY NOT NULL,
    building_id  TEXT             NOT NULL,
    floor_id     TEXT,
    lift_id      TEXT,
    event_type   TEXT             NOT NULL,
    created_date TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP
);