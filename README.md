# nodejs-dummy-data-project with MongoDB
This project demonstrates how to set up a Node.js server that retrieves dummy JSON data, stores it in MongoDB, and provides an API for accessing, filtering, and sorting the data.

# Implementation Details
- *MongoDB Integration:* Uses MongoDB for storing and retrieving data. Data is fetched from an external source and initialized in the database.
- *Data Processing:* Filtering and sorting operations are performed in-memory after retrieving data from MongoDB.
- *Error Logging:* Errors are logged to the console for debugging purposes.

# To run this project, we'll need:

- Node.js (version 12.0.0 or above)
- npm (version 6.0.0 or above)
- MongoDB (version 4.0 or above)

# Instructions to Setup
- 1. Clone the repository:
```bash
   git clone https://github.com/jiya-singhal/nodejs-dummy-data-project.git
   cd nodejs-dummy-data-project
```
- 2. Create a `.env` file:
In the root directory, create a .env file and add the following environment variables:
 DATA_URL=<insert_data_source_url_here>
 PORT=3000
 MONGO_URI=<your_mongodb_connection_string>

- 3. Install dependencies:

1. dotenv - For managing environment variables:
```bash
npm install dotenv
``` 
2. axios - For making HTTP requests:
```bash
npm install axios
``` 
3. mongodb - For interacting with MongoDB:
```bash
npm install mongodb
``` 
- 4. Initialize the database:
Run the script to fetch and store the initial data in MongoDB:

```bash
node initialize.js
``` 
- 5. Start the server:
```bash
node server.js
```
The server will be available at http://localhost:3000

## Structure of Project

- server.js: Initializes the Express application.
- initialize.js: Fetches and inserts initial data into the database.
- routes/dataRoute.js: Defines the API endpoints.
- controllers/dataController.js: Contains the business logic for data handling.
- services/dataService.js: Manages database interactions.
- utils/dataUtils.js: Utility functions for processing data.


# API Endpoints
- 1. Retrieve All Data

*Function:* getData
*Endpoint:* GET /api/data
*Description:* Retrieves all records from the database. No query parameters are required.

- 2. Filter Data

*Function:* filterData
*Endpoint:* GET /api/data?filter=key:value[,key:value]
*Description:* Filters data based on the provided key-value pairs. Multiple filters can be applied, separated by commas.
Example: GET /api/data?filter=language:Sindhi

- 3. Sort Data

*Function:* sortData
*Endpoint:* GET /api/data?sort=key:order
*Description:* Sorts data by the specified field (key) and order (asc or desc).
Example: GET /api/data?sort=version:asc

- 4. Filter and Sort Data

*Function:* Combination of filterData and sortData
*Endpoint:* GET /api/data?filter=key:value[,key:value]&sort=key:order
*Description:* Applies both filtering and sorting to the data.
Example: GET /api/data?filter=language:Hindi&sort=id:desc


# Error Handling

- 1. Unrecognized Query Parameters:
*Description:* Handles cases where query parameters are not recognized.
*Response:* { "error": "Invalid query parameter", "message": "The following query parameter(s) are not recognized: <param>" }

- 2. Invalid Filter Format:
*Description:* Handles invalid filter formats.
*Response:* { "error": "Filter error", "message": "Filter error: Invalid filter format: <filter>" }

- 3. No Matching Items:
*Description:* Handles cases where no items match the filter.
*Response:* { "error": "Filter error", "message": "Filter error: No items match this filter: <filter>" }

- 4. Invalid Sort Format:
*Description:* Handles invalid sort formats.
*Response:* { "error": "Sort error", "message": "Sort error: Invalid sort format. Expected 'field:asc' or 'field:desc', got '<sort>'" }

# Postman Collection
 
 ### Testing the API with Postman

- Launch Postman and create a new request.
- Set the request type to GET.
- Enter the appropriate URL (e.g., http://localhost:3000/api/data).
- Add query parameters as needed.
- Click Send to execute the request and view the response.

### Retrieve All Data

- *url* : `http://localhost:3000/api/data`
*Description*: Fetches all records from the database.

   * *output*![Retrieve All Data](PostmanImages/getData.png)

### Filter data according to the format requested
- *url* :  `http://localhost:3000/api/data?filter=language:Sindhi` 
*Description*: Retrieves records where the language is Sindhi.
   * *output*![Filter data](PostmanImages/languageFilter.png)

### Sort data according to the format requested
*Description*: Sorts the records by the version in ascending order.
- *url* : `http://localhost:3000/api/data?sort=version:asc`
  
    * *output* ![Sort data](PostmanImages/AscSort.png)

### Filter and sort
**Description:** Retrieves records where the language is Uyghur and sorts them by ID in descending order.

- *url* : `http://localhost:3000/api/data?filter=language:Uyghur&sort=id:desc`

    * *output* ![Filter and sort](PostmanImages/filter&Sort.png)


# Errors

- *Unknown query parameters*
  - *URL*: `http://localhost:3000/api/data?unknownParam=test`
  - *Response*: ![The following query parameter(s) are not recognized: sorted](PostmanImages/InvalidQuery.png)

- *Invalid sort format*
  - *URL*: `http://localhost:3000/api/data?sort=version:asec`
  - *Response*: ![Sorting error: An invalid sort format!, received 'version:asec'](PostmanImages/SortFormatError.png)

- *No matching items*
  - *URL*: `http://localhost:3000/api/data?filter=language=English`
  - *Response*: ![Filter error: No items match this filter: language=English](PostmanImages/noMatchingFound.png)

- *Invalid filter format*
  - *URL*: `http://localhost:3000/api/data?filter=language`
  - *Response*: ![Filter error: Invalid filter format: language](PostmanImages/FilterFormatError.png)
