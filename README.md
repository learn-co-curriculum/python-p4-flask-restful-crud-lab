# REST CRUD Lab

## Learning Goals

- Build RESTful APIs that are easy to navigate and use in applications.
- Develop a Flask API with successful frontend connections via `fetch()`.
- Integrate update and delete routes with the associated actions to return the
  appropriate JSON data.

---

## Key Vocab

- **Representational State Transfer (REST)**: a convention for developing
  applications that use HTTP in a consistent, human-readable, machine-readable
  way.
- **Application Programming Interface (API)**: a software application that
  allows two or more software applications to communicate with one another. Can
  be standalone or incorporated into a larger product.
- **HTTP Request Method**: assets of HTTP requests that tell the server which
  actions the client is attempting to perform on the located resource.
- **`GET`**: the most common HTTP request method. Signifies that the client is
  attempting to view the located resource.
- **`POST`**: the second most common HTTP request method. Signifies that the
  client is attempting to submit a form to create a new resource.
- **`PATCH`**: an HTTP request method that signifies that the client is
  attempting to update a resource with new information.
- **`PUT`**: an HTTP request method that signifies that the client is attempting
  to update a resource with new information contained in a complete record.
- **`DELETE`**: an HTTP request method that signifies that the client is
  attempting to delete a resource.

---

## Introduction

In this lab, we'll continue building an API for the plant store! The code for
the frontend React application is done; you can find it in the `client`
directory. Your job is to create the Flask API so that the `fetch` requests on
the frontend work successfully.

## Instructions

To set up the frontend and backend dependencies, from the root directory, run:

```console
$ npm install --prefix client
$ pipenv install
$ pipenv shell
```

In `server/`, run:

```console
$ flask db upgrade
$ python seed.py
```

To see how the React application and Flask API are interacting, you can run the
Flask application in one terminal by running:

```console
$ python app.py
```

Then, **open another terminal** and run React:

```console
$ npm start --prefix client
```

Each application will run on its own port on `localhost`:

- React: [http://localhost:4000](http://localhost:4000)
- Flask: [http://localhost:5555](http://localhost:5555)

## Deliverables

### Routes

Your API should have the following routes as well as the associated controller
actions that return the appropriate JSON data:

#### Update Route

Making a PATCH request to this route with an object in the body should update
one plant, and return the updated plant in the response.

```txt
PATCH /plants/:id


Headers
-------
Content-Type: application/json


Request Body
------
{
  "is_in_stock": false
}


Response Body
-------
{
  "id": 1,
  "name": "Aloe",
  "image": "./images/aloe.jpg",
  "price": 11.50,
  "is_in_stock": false
}
```

#### Destroy Route

Making a DELETE request to this route should delete one plant from the database.
You should return a response of an empty string with the status code 204 (No
Content) to indicate a successful deletion.

```txt
DELETE /plants/:id


Response Body
------
no content
```

---

## Resources

- [What RESTful Actually Means](https://codewords.recurse.com/issues/five/what-restful-actually-means)
- [Flask-RESTful][frest]
- [HTTP request methods - Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [Proxying API Requests in Development - React][proxying]

[frest]: https://flask-restful.readthedocs.io/en/latest/
[proxying]: https://create-react-app.dev/docs/proxying-api-requests-in-development/
