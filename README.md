# General-Dashboard
A Jenkins-like dashboard for Gitlab 9.x

Created with:

* Angular 4
* Spark Java framework





## Running General-Dashboard

#### Prerequisite

* Gitlab 9.x or higher

General-Dashboard is based upon the Gitlab 9.x API. 
Hence older versions of Gitlab are not supported.

* Java JRE/SDK 8

* Using the executable jar:
```
* Download the jar file from the releases here:
https://github.com/ThijsNederlof/general-dashboard/releases

* From the terminal or script run the jar file with: java -jar general-dashboard-1.0.jar
* Visit localhost:8080
```

* Using Docker

```
* docker run -p 8080:8080 thijsnederlof/generaldashboard
* Visit localhost:8080
```

## Development

Dependencies:

* Java SDK 8.x
* Node.js 6.10.0 or higher
* NPM 3.10 or higher
* Maven 3 or higher

To generate the jar yourself:

```
* Clone the repository
* From the project root directory cd into the webdev directory
* run " npm run clean:install " to install the webdevelopment dependencies
* cd back to the project root directory
* run "mvn clean package"
* The build jar file resides in the new target folder
```

Run development environment:

```
* From the project root directory cd into the webdev directory
* Run " npm run server:dev " to run development server
* Start the main class in src/main/java/main to run the backend
```
