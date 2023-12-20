# Galactic API - High School Students Project

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Features](#api-features)
  - [Search](#search)
  - [Sort](#sort)
  - [Pagination](#pagination)
- [Caching Engine](#caching-engine)
  - [Dynamic Cache](#dynamic-cache)
- [CRON Job](#cron-job)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Assumptions](#assumptions)

## Getting Started

This Node.js project serves as a backend for a Star Wars API with additional features like search, sort, pagination, and caching.

## Github Repository Link

- [https://github.com/MahedialiBhatt/ANC-Backend]

### Prerequisites

- Node.js

### Installation

Follow these steps to set up and run the project:

1. Clone the repository (provide your repository link here).

2. Open the cloned folder in your preferred code editor.

3. Install npm dependencies: `npm install`

4. Start the application: `npm run start`

## API Features

### Search

The API supports searching for people based on their name.

### Sort

You can sort the results based on different attributes such as name, gender, height, mass, etc.

### Pagination

Paginate through the results using the `limit` and `offset` parameters.

## Caching Engine

The project includes a caching engine to store data dynamically based on API requests.

### Dynamic Cache

The caching engine dynamically stores data according to each unique request, optimizing response times.

## CRON Job

A CRON job pings the SWAPI API at regular intervals to keep the data up-to-date.

## API Endpoints

- `GET /api/people`: Fetch all people with options for search, sort, pagination.
- `GET /api/people/:id`: Fetch a specific person by ID.

## Usage

curl "http://localhost:3000/people?limit=10&offset=0&search=Luke&sortBy=name&orderBy=asc"

## Project Structure

- `server.js`: Entry point for the application.
- `controllers/`: Contains route handlers for different API endpoints.
- `utils/`: Utility functions and helpers.
- `scripts/`: SCRIPTS which includes Cron JOB.
- `model/`: DB-related files (using SWAPI API directly to mimic DB).

## Assumptions

- Database: The project treats SWAPI as the direct data source, not using a separate database.
- Additional SWAPI APIs: Focus on /people API: This project specifically focuses on implementing the /people API, as other SWAPI endpoints are expected to follow similar implementation patterns. This decision streamlines development and demonstrates core functionalities.
