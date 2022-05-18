CREATE DATABASE aegis;

CREATE TABLE aegis.public.members (  
    callsign varchar(255) NOT NULL primary key,
    type varchar(255),
    squadron varchar(255),
    prev_duty_count int
);

CREATE TABLE aegis.public.qualifications (  
    callsign varchar(255) NOT NULL primary key,
    a2_day boolean,
    a2_day_stby boolean,
    a2_night_stby boolean,
    a2_trainee boolean,
    g4_comd boolean,
    g4_comd_stby boolean,
    g4_comd_trainee boolean,
    g4_cont boolean,
    g4_cont_stby boolean,
    g4_cont_trainee boolean
);

CREATE TABLE aegis.public.schedule (  
    date date,
    a2_day varchar(255),
    a2_day_stby varchar(255),
    a2_night_stby varchar(255),
    a2_trainee varchar(255),
    g4_comd varchar(255),
    g4_comd_stby varchar(255),
    g4_comd_trainee varchar(255),
    g4_cont varchar(255),
    g4_cont_stby varchar(255),
    g4_cont_trainee varchar(255)
);

CREATE TABLE aegis.public.requests (  
    callsign varchar(255) NOT NULL primary key,
    date date,
    reason varchar(255)
);