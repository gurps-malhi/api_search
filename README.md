# Search_api

Using randomuser api to filter searches, primary focus was creating something using vue.js, styling was not the focus for this project.

## About Search API

Api request is made to [Randomuser.me api](https://randomuser.me/api/?results=50).

Onload, a fresh request is made to randomuser api via an ajax request using axios, once we have the dataset, you can filter the results, filtering does not make a new ajax request. This was done intentionally as I wanted the filtering process to happen client side.

### Filters
- The name filter lets a user type in text and if any of the characters match a profile, it returns a result.
- The age filter is a dropdown that has age range options. If the age is within one of these brackets it returns a result.
- The gender filter are radio buttons and match to a profile’s gender

## Installation

Used the package manager parcel, once all the dependencies have been installed i.e. npm install, run the following command.

```bash
npm run dev
```
