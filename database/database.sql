DROP DATABASE SHOPLET;

CREATE DATABASE SHOPLET;

USE SHOPLET;

CREATE TABLE Users(
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `desc` TEXT NULL,
    PRIMARY KEY (id) 
);


CREATE TABLE Categories(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `desc` TEXT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE Items(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `desc` TEXT NULL,
    `price` DECIMAL(10,2) NOT NULL
    `category_id` INT NOT NULL,
    `seller_id` INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (seller_id) REFERENCES Users(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);


CREATE TABLE Comments(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `comment` TEXT NOT NULL,
    `item_id` INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Likes(
    `user_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    PRIMARY KEY(user_id,item_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE Follows(
    `user_id` INT NOT NULL,
    `following_id` INT NOT NULL,
    PRIMARY KEY (user_id,following_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (following_id) REFERENCES Users(id)
)

CREATE TABLE Saves(
    `user_id` INT NOT NULL,
    `item_id` INT NOT NULL,
    PRIMARY KEY(user_id,item_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (item_id) REFERENCES Items(id)
)

