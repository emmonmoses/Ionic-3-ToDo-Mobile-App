# Ionic-3-ToDo-Mobile-App

This is an Ionic 3 ToDo Mobile app developed using Typescript, CSS3, HTML 5, Bootstrap 4 and ASP.NET CORE REST API.
The app can perfom all the CRUD operations-for creating, reading, updating and deleting tasks. For the backend, 
I am using an ASP.NET Web API service.

This project was generated with [Ionic CLI](https://ionicframework.com/docs/cli/) version 3.20.0.

## Development server

Start the server using command -  `ionic serve(for browser view)` or `ionic lab(for mobile view)`.

## Steps to setup ToDo App 

1. Open the downloaded Todo App project
2. Install below mentioned packages

    i. npm install --save bootstrap@4.0.0-beta
    
    ii. npm install --save @ng-bootstrap/ng-bootstrap

3. Update the package.json to include Bootstrap CSS

"styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
