# serviceApp

Simple Node JS Service API Application.

## Getting Started


Please ensure Node JS is installed.


  1.  git clone https://github.com/akinmaurice/serviceProviders.git
  2.  cd serviceProviders
  3.  Create a Mysql Database schema
  4.  Create the necessary tables using the sql file [here](/migrations/sqls/20190111211503-add-table-up.sql)
  5.  Provide connection details to Database. Example:
  ```
    export DATABASE_DEV_URL='mysql://user:password@host:port/database'
  ```


  6.  visit http://localhost:3023 to view!


The above will get you a copy of the project up and running on your local machine for development and testing purposes.


## API Endpoints

All API endpoints return a status code of 200 for successful calls and 400 including an error object for unsuccessful calls.

```
| EndPoint                                |   Functionality                      |
| --------------------------------------- | ------------------------------------:|
| GET /provider/services/:service         | Get Providers by service name        |
| GET /provider/location/:city            | Get Providers by location            |
| GET /service/                           | Get all Services                     |
| POST /service/                          | Create Service                       |
| POST /provider/                         | Create Provider                      |
```



## Dependencies
```
  1. MySql
  2. NodeJS
  3. ExpressJS
```

## Improvements

```
  1. Pagination
  2. Update Services and Providers
  3. Delete Services and Providers
  4. Multiple services for providers
```



## License

This project is licensed under the MIT License - see the [LICENSE.md](https://opensource.org/licenses/MIT) file for details
