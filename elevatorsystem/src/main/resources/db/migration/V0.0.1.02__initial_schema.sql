CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS elevator;

CREATE TABLE elevator."building"
(
    id   UUID PRIMARY KEY NOT NULL,
    name TEXT unique      NOT NULL
);

CREATE TABLE elevator."floor"
(
    id          UUID PRIMARY KEY NOT NULL,
    number      integer          NOT NULL,
    building_id UUID REFERENCES elevator."building" (id),
    CONSTRAINT unique_number_per_building UNIQUE (number, building_id)
);

CREATE INDEX idx_floor_building_id ON elevator."floor" (building_id);

CREATE TABLE elevator."lift"
(
    id          UUID PRIMARY KEY NOT NULL,
    name        TEXT unique      NOT NULL,
    status      TEXT             NOT NULL,
    floor_id    UUID REFERENCES elevator."floor" (id),
    building_id UUID REFERENCES elevator."building" (id),
    CONSTRAINT unique_name_per_building UNIQUE (name, building_id)
);

CREATE INDEX idx_lift_building_id ON elevator."lift" (building_id);
CREATE INDEX idx_lift_floor_id ON elevator."lift" (floor_id);

CREATE TABLE elevator."lift_to_floor_stops"
(
    lift_id  UUID NOT NULL REFERENCES elevator."lift" (id),
    floor_id UUID NOT NULL REFERENCES elevator."floor" (id),
    PRIMARY KEY (lift_id, floor_id)
);
CREATE INDEX idx_stops_lift ON elevator."lift_to_floor_stops" (lift_id);
CREATE INDEX idx_stops_floor ON elevator."lift_to_floor_stops" (floor_id);

-- Add data

-- Building 1
-- Insert into the 'building' table
INSERT INTO elevator."building" (id, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'Building 1');

-- Insert into the 'floor' table for 10 floors
DO
$$
BEGIN
FOR i IN 1..10 LOOP
        INSERT INTO elevator."floor" (id, number, building_id)
        VALUES (uuid_generate_v4(), i, '00000000-0000-0000-0000-000000000001');
END LOOP;
END $$;

-- Insert a lift into the 'lift' table
INSERT INTO elevator."lift" (id, name, status, floor_id, building_id)
VALUES ('00000000-0000-0000-0000-000000000011', 'Lift A', 'IDLE',
        (SELECT id FROM elevator."floor" WHERE number = 1 AND building_id = '00000000-0000-0000-0000-000000000001'),
        '00000000-0000-0000-0000-000000000001');

-- Building 2

-- Insert into the 'building' table
INSERT INTO elevator."building" (id, name)
VALUES ('00000000-0000-0000-0000-000000000002', 'Building 2');

-- Insert into the 'floor' table for 100 floors in 'Building 2'
DO
$$
BEGIN
FOR i IN 1..100 LOOP
        INSERT INTO elevator."floor" (id, number, building_id)
        VALUES (uuid_generate_v4(), i, '00000000-0000-0000-0000-000000000002');
END LOOP;
END $$;

-- Insert the first lift into the 'lift' table for 'Building 2'
INSERT INTO elevator."lift" (id, name, status, floor_id, building_id)
VALUES ('00000000-0000-0000-0000-000000000021', 'Lift B1', 'IDLE',
        (SELECT id FROM elevator."floor" WHERE number = 1 AND building_id = '00000000-0000-0000-0000-000000000002'),
        '00000000-0000-0000-0000-000000000002');

-- Insert the second lift into the 'lift' table for 'Building 2'
INSERT INTO elevator."lift" (id, name, status, floor_id, building_id)
VALUES ('00000000-0000-0000-0000-000000000022', 'Lift B2', 'IDLE',
        (SELECT id FROM elevator."floor" WHERE number = 1 AND building_id = '00000000-0000-0000-0000-000000000002'),
        '00000000-0000-0000-0000-000000000002');
