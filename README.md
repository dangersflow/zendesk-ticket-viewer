# Zendesk Ticket Viewer
Zendesk ticket viewer; contacts api, grabs JSON, then outputs it in a list on an index page.

##Pre-requisites
1. Make sure that you have a Zendesk account.
2. From this account you will need your username (e-mail) and
3. An API access token; a tutorial can be found [here](https://support.zendesk.com/hc/en-us/articles/226022787-Generating-a-new-API-token-)

##Installation
1. First install the latest version of NodeJS
2. Once installed; clone this repository to a directory of your choice
3. Once cloned, open the folder with an IDE of your choice (make sure the IDE contains a terminal)
4. With your username and API access token in hand, go inside `routes/index.js`
    1. Replace `username` string with your actual username
    2. Replace `access_token` with your API access token
5. Very similarly, go inside `test/test.js`
    1. On line 12, replace the "xxx" strings with your username and API access token respectively
6. Save both files
7. Once the two files have been saved, open your IDE terminal, or a regular terminal inside of the root of the project
8. Perform the `npm install` command to install all of the required dependencies

##Execution
1. To start the application, perform the `npm start` command in the terminal
    a. To view the application, on any browser, navigate to `localhost:3000`
2. To test the application, perform the `npm test` command in the terminal (when the application is not running)
    a. All of the tests should currently pass.
