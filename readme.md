# URL Shortening Microservice Documentation

## Introduction

Welcome to the documentation for the URL Shortening Microservice! This service allows you to shorten long URLs into concise, unique identifiers, making them easier to share.

The live deployment of the service can be accessed at [https://url-short-sgcf.onrender.com/](https://url-short-sgcf.onrender.com/).

## API Endpoints

### 1. Shorten URL

**Endpoint:** `POST /api/shorturl`

**Request:**

```json
{
  "url": "http://www.example.com"
}
```

**Response:**

```json
{
  "original_url": "http://www.example.com",
  "_id": "659c2127465d9135c98057f3",
  "short_url": "uVv_i",
  "__v": 0
}

```

1. Send a POST request with a long URL to get a shortened version.
2. The URL returns a JSON response with the original and shortened URLs if valid.
3. If the URL is invalid, it returns a JSON response with an error message: `{ "error": "invalid url" }`.
4. If the URL has been shortened before, it returns the existing shortened URL.

### 2. Redirect to Original URL

**Endpoint:** `GET /api/shorturl/<short_url>`

Visiting this endpoint redirects the user to the original URL associated with the given short URL.
If the short URL is not found, it returns a JSON response with an error message: `{ "error": "URL not found!" }`.

## Usage Examples

### Shorten URL

**Request:**

``` bash
curl -X POST -H "Content-Type: application/json" -d '{"url": "http://www.example.com"}' https://url-short-sgcf.onrender.com/api/shorturl
```

**Response:**

```json
{
  "original_url": "http://www.example.com",
  "_id": "659c2127465d9135c98057f3",
  "short_url": "uVv_i",
  "__v": 0
}

```

### 2. Redirects to Original URL

**URL:**
[https://url-short-sgcf.onrender.com/api/shorturl/uVv_i](https://url-short-sgcf.onrender.com/api/shorturl/uVv_i)

Visiting this URL will redirect you to the original URL associated with the short URL `uVv_i`.

## Error Handling

- If an invalid URL is provided during shortening, the response will contain an error message: `{ "error": "invalid url" }`.
- If the short URL is not found during redirection, the response will contain an error message: `{ "error": "URL not found!" }`.

## Tools Used

- **Node.js:** The server-side runtime environment for executing JavaScript code.
- **Express:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database used for storing URL data.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Render:** Platform used for deploying the live application.
- **Nanoid:** A tiny, secure, URL-friendly unique string ID generator.
- **dotenv:** A zero-dependency module that loads environment variables from a .env file.

## Challenges Faced

- **URL Validation:** Implementing robust URL validation to ensure only valid URLs are accepted.
- **Concurrency Issues:** Handling concurrent requests to ensure unique short URLs are generated.
- **Deployment:** Configuring and deploying the application on the Render platform.
- **Error Handling:** Designing effective error messages for various scenarios.
- **Security:** Ensuring the security of user data and preventing potential exploits.

## Running Locally

To run the microservice locally, follow these steps:

1. Clone the GitHub repository:

```bash
git clone https://github.com/chuba-cn/UrlShortener.git
```

2. Install dependencies:

``` bash
npm install
```

3. Create a .env file with your MongoDB connection string:

```bash
DB_URL=your_mongodb_connection_string
```

4. Start the server: 

```bash
npm start
```

The server will be running on <http://localhost:3000>
