# Daily Focus Server
An API server containing endpoints for logging in and signing up a user, as well as CRUD endpoints required for the To-Do List widget in the client.

This server runs on http://localhost:9000/
## Installation

Install node.js from https://nodejs.org/en/.

Run the following commands:
```bash
npm install
npm install -g firebase-tools.
firebase login
```

You will need to login with an email that has access to this 
[firebase console](https://console.firebase.google.com/u/2/project/daily-focus-a7423/overview).

To request access to the firebase console you must first open a Github issue as per the [guidelines](https://github.com/SE701Group2/daily-focus/wiki/Environment-setup#requesting-access-to-the-firebase-console) in the wiki.


## Usage

```bash
npm start
```

### Endpoints:
***
* Logging in a user:  
http://localhost:9000/login

* Signing up a user:  
http://localhost:9000/signup

* CRUD endpoints for To-Do List items:  
http://localhost:9000/todo

***

For more information regarding endpoints, please see:  
https://github.com/SE701Group2/daily-focus/wiki/Back-End#api-endpoints


## Testing

For unit testing, Jest and Supertest are being used.


To run tests: 
```
npm test
```

For more information regarding testing, please see:
https://github.com/SE701Group2/daily-focus/wiki/Back-End-Testing


## Contributing
Pull requests are welcome. Please open an issue first as per the guidelines in the [wiki](https://github.com/SE701Group2/daily-focus/wiki).

Please make sure to update unit tests as appropriate.  

## License
[MIT](https://choosealicense.com/licenses/mit/)