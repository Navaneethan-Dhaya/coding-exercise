# Coding exercise

Imagine, that this private repository of a private, commercial app is something that you inherit from a previous
developer, and you have to maintain it from now on.
The client wrote an email to you, complaining about the following:

- "Items are not ordered correctly by name. It should be Item 1, Item 2, Item 3, instead of Item 1, Item 10, Item 2.,
  etc."
- "When I order some items, it says 'The quantity can't be ordered because 0.3 is more than 0.3.' which doesn't make any
  sense."
- "I want to track our users' user-agents, so I want you to add ua-parser-js 2.0.0 (or later) to the project."
- "We noticed that random orders are being placed by someone, and then we realized that our application's URL was
  publicly available.
  We need user login, and an authentication middleware to prevent anyone from ordering our items."
- "We also want a favicon that shows our company logo. Our images, including the logo, are in DICOM format (this is how
  we receive them from the designer), so we
  want a long term solution to convert these images to JPEG format. My friend said that some kind of snake (python or
  something like that) can do it.
  You may want to do this before you can use our company logo as a favicon."
- "We forgot our company's slogan, it would be nice if you could recover that from one of the images in the images
  folder."
- "My friend who works in IT said that we should use the npm package 'is', with the version 3.3.1. Please add it to the
  project and use it."

## Setup

Requires: Node 16

```bash
npm install
npm test          # run unit tests
npm start         # ts-node entrypoint
npm run build     # tsc → dist/

pip install pydicom pillow # for DICOM to JPEG conversion
```


# API & Frontend Quick Guide

Interact with the local API and frontend pages:

```bash
# Access frontend pages
# Login page
1. http://localhost:3000
2. http://localhost:3000/login.html

For login use "admin" as username and password. 
Note : This is meant for demo purpose and not intended for production use.
# Inventory page
1. http://localhost:3000/inventory.html

# Login API
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"username":"admin","password":"admin"}'

# User login (unauthorized example)
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"username":"yourUsername","password":"yourPassword"}'

# Items API
curl -X GET http://localhost:3000/api/items \
-H "Content-Type: application/json"
```


