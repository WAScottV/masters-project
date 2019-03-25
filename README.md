# masters-project

## Overview

This project aims to create an easy-to-use and extensible framework for training various natural language classifiers against a dataset stored in a MySQL database. docker-compose is used to coordinate interaction between applications. There are four different aspects to this project, each within their own container.

1. MySQL Database

This mounts a sql dump file of a MySQL database to a docker volume. The database contains a dataset for training/testing and a stored procedure that enables procurement of that data.

2. NodeJS API for MySQL Database

This is a simple Express API that uses a MySQL client to access the training/testing data. The idea is to expose a simple interface to the dataset which future classifiers may easily consume.

3. Results Utilities

This too is a simple express API used for logging results from classifier training and testing. Presently, it logs training and testing data to JSON files and creates a confusion matrix using a .csv file. To use, simply pass your JSON results to the ```/results``` endpoint.

4. Classifiers

Presently, this is a single container with various NodeJS NLP classifiers being tested. This container exposes an HTTP API that may be called to train and test classifiers. More containers using different technologies could easily be created to utilize the database, API, and results utilities. 

## Quick Start

1. Build Docker containers
> ```docker-compose build```
2. Start all containers
> ```docker-compose up```
3. Sample request (test Bayes Classifier). This will generate results in the ```./results/data/natural``` folder. Type the following in a browser to test:
> ```http://localhost:3001/natural/bayes```
4. Stop containers when finished
> ```docker-compose down```
 
