CREATE TABLE users (
    userID int AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (userID)
)

CREATE TABLE storage (
    storageID int AUTO_INCREMENT,
    userID int,
    dest VARCHAR(255),
    dir VARCHAR(255),
    PRIMARY KEY (storageID),
    FOREIGN KEY (userID) REFERENCES users(userID)
)

CREATE TABLE limits (
    userID int UNIQUE,
    storageLimit DECIMAL (65, 30),
    PRIMARY KEY (userID),
    FOREIGN KEY (userID) REFERENCES users(userID)
)