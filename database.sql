CREATE DATABASE aegis;

CREATE TABLE aegis.public.users (  
    userID varchar(255) NOT NULL primary key,
    callsign varchar(255),
    role varchar(255),
    squadron varchar(255),
    duty_count int
);

CREATE TABLE aegis.public.qualifications (  
    callsign varchar(255) NOT NULL primary key,
    a2_day boolean,
    a2_day_stby boolean,
    a2_night boolean,
    a2_night_stby boolean,
    a2_trainee boolean,
    g4_comd boolean,
    g4_comd_stby boolean,
    g4_comd_trainee boolean,
    g4_cont boolean,
    g4_cont_stby boolean,
    g4_cont_trainee boolean
);

CREATE TABLE aegis.public.daysWithinMonth (  
    date date primary key,
    scheduleID varchar(255),
    a2_day varchar(255),
    a2_day_stby varchar(255),
    a2_night varchar(255),
    a2_night_stby varchar(255),
    a2_trainee varchar(255),
    g4_comd varchar(255),
    g4_comd_stby varchar(255),
    g4_comd_trainee varchar(255),
    g4_cont varchar(255),
    g4_cont_stby varchar(255),
    g4_cont_trainee varchar(255)
);

CREATE TABLE aegis.public.schedule (  
    scheduleID varchar(255),
    is_published boolean
);

CREATE TABLE aegis.public.requests (  
    requestsID varchar(255) NOT NULL primary key,
    callsign varchar(255),
    date date,
    reason varchar(255)
);