# cs465-fullstack
CS-465 Full Stack Development with MEAN

Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?

For my project I used different type of frontend development inlcuding Express with HTML and Single Page Application(SPA) framework. Express HTML has Server-side rendering using express to serve HTML files with embedded Javascript making it easy to implement and SEO friendly. SPA uses a Javascript framework using Angular for this project to bring fast and responsive admin page to avoid full page reloads for any changes made while adding or deleting trips.

We used MongoDB for the database to easily store data in a JSON like format allowing for easy modifications, and allow up to scale the data for the future as the site grows.

Functionality

How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

JSON served as the connection between the fronend and backend. The UI send a API request using JSON the server then process the request in the MongoDB database sending it back to the client.

Testing

Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

We implemented the GET, POST, and PUT methods using postman to ensure functionality. Adding JWT OAuth there were some difficulties implementing the the login method for changing the travel cards. Having this Authorization allowing us to protect the data ensuring only authorized users can access the data. This security also allowing us to protect against SQL inject and prevent abuse from unauthorized users.

Reflection

How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

This course has helped me learn the MEAN stack mastering Node.JS, Express, MongoDB. Improved my frontend skills with JavaScript, HTML, and SPAs. Learned to intergrate frontend and backend through REST APIs. Developed skills in debugging API responses. This project also gave me the confidence to pick up new skills and learn them quickly and implement new changes and features I am unfimilar with.
