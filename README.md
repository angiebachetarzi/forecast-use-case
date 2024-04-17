# forecast-use-case

Backend case - AppTweak

## How to run

Clone the repo

```
git clone https://github.com/angiebachetarzi/forecast-use-case.git
```

Install npm modules

```
npm install
```

Create env file for MongoDB Atlas credentials

```
vi .env
```

Run the API in a terminal tab

```
npm run start
```

Run the cron job in another terminal tab

```
npm run start-cron-job
```

## Code structure

```
.
├── README.md
├── assets
│   ├── postman_import.png
│   └── run_collection.png
├── keys.js
├── package-lock.json
├── package.json
├── src
│   ├── configs
│   │   ├── index.js
│   │   ├── mongoDB.config.js
│   │   └── server.config.js
│   ├── controllers
│   │   ├── index.js
│   │   ├── location
│   │   │   ├── create.controller.js
│   │   │   ├── get.controller.js
│   │   │   ├── getAll.controller.js
│   │   │   ├── index.js
│   │   │   ├── remove.controller.js
│   │   │   └── update.controller.js
│   │   └── temperature
│   │       ├── get.controller.js
│   │       └── index.js
│   ├── index.js
│   ├── jobs
│   │   └── updateTemperatures.jobs.js
│   ├── models
│   │   ├── index.js
│   │   ├── location.model.js
│   │   └── temperature.model.js
│   ├── routes.js
│   ├── services
│   │   ├── create.service.js
│   │   ├── findAll.service.js
│   │   ├── findOne.service.js
│   │   ├── index.js
│   │   ├── remove.service.js
│   │   └── update.service.js
│   └── utils
│       ├── errorResponse.js
│       ├── helpers.js
│       ├── index.js
│       ├── logger.js
│       └── successResponse.js
└── tests
    ├── Forecast_Fix.postman_collection.json
    ├── mock_data_locations.json
````

## API documentation

### General responses

#### Success response

```
{
  "ok": true,
  "code": 200,
  "payload": {}
}
```

#### Error response

```
{
  "ok": false,
  "code": <error_code>,
  "message": ""
}
```

### Location

`` POST /location``

Creates new location

*Example request*

```
{
    "slug": <slug_name>,
    "longitude": <longitude>,
    "latitude": <latitude>
}
```
***slug value must be unique***

*Example response*

```
{
    "ok": true,
    "code": 200,
    "payload": {
        "slug": "locationTest"
    }
}
```

``PUT /location/:slug``

Updates existing location by slug

Longitude and latitude are optional

*Example request*

```
{
    "slug": <updated_slug>
    "longitude": <updated_longitude>,
    "latitude": <updated_latitude>
}
```

***slug must be in request body***

*Example response*

```
{
    "ok": true,
    "code": 200,
    "payload": "Successfully updated location with slug locationTest"
}
```

***Updating a location DOES NOT REMOVE the corresponding temperatures' list***

``GET /location/:slug``

Returns existing location

*Example response*

```
{
    {
    "ok": true,
    "code": 200,
    "payload": {
        "location": {
            "_id": "6605c3c85486440b19ebb17c",
            "slug": "locationTest",
            "longitude": 102.11,
            "latitude": 25.2,
            "__v": 0
        }
    }
}
}
```

``GET /locations``

Returns list of locations

*Example response*

```
{
    "ok": true,
    "code": 200,
    "payload": {
        "locations": [
            {
                "_id": "6604a38bcc030b40d08378a4",
                "slug": "location1",
                "longitude": 102.11,
                "latitude": 25.2,
                "__v": 0
            },
            {
                "_id": "6605c3c85486440b19ebb17c",
                "slug": "locationTest",
                "longitude": 10.2,
                "latitude": 25.2,
                "__v": 0
            }
        ]
    }
}
```

``DELETE /location/:slug``

Deletes a location by slug

*Example response*

```
{
    "ok": true,
    "code": 200,
    "payload": "Successfully deleted location with slug locationTest"
}
```

***Deleting a location DOES NOT REMOVE the corresponding temperatures' list***

### Temperature

``GET /temerature?slug=<slug>&startDate=<start_date>&endDate=<end_date>``

returns forecast for a given location between start date and end date (if data not available for that time period, returns empty array, if partial data available, returns it)


*Example response*

```
{
    "ok": true,
    "code": 200,
    "payload": {
        "forecast": [
            {
                "date": "2024-03-27",
                "min-forecasted": 9,
                "max-forecasted": 24
            },
            {
                "date": "2024-03-28",
                "min-forecasted": 7,
                "max-forecasted": 24
            },
            {
                "date": "2024-03-29",
                "min-forecasted": 9,
                "max-forecasted": 26
            }
        ]
    }
}
```

## Testing

A test plan has been writen in [Postman](https://www.postman.com/). The file *tests/Forecast_Fix.postman_collection.json* needs to be imported to the Postman workspace before running the tests.

### Import file to Postman

![Import Postman!](/assets/postman_import.png "Import Postman")

### Run collection

![Run Postman!](/assets/run_collection.png "Run Postman")

### MongoDB mock data

The file *tests/mock_data_locations.json* has been generated using [Mockaroo](https://www.mockaroo.com/)

![Mockaroo fields!](/assets/mockaroo_fields.png "Mockaroo fields")


