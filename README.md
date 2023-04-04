# About Plate-Pal

Plate Pal is a web application inspired by Yelp. It allows users to search for businesses, view business pages, leave reviews and ratings. [Click here to visit Plate Pal's live site](https://plate-pal.onrender.com/).

<br>

# Wiki Links

- [Feature List](https://github.com/truham/Plate-Pal/wiki/Feature-List)
- [User Stories](https://github.com/truham/Plate-Pal/wiki/User-Stories)
- [Database Schema](https://github.com/truham/Plate-Pal/wiki/Database-schema)
- [API Routes](https://github.com/truham/Plate-Pal/wiki/API-Routes)
- [Redux Store State Shape](https://github.com/truham/Plate-Pal/wiki/Store-Shape)

<br>

# Tech Stack

Frameworks, Platforms and Libraries:

[![HTML][html.js]][html-url]
[![CSS][css.js]][css-url]
[![Javascript][javascript.js]][javascript-url]
[![React][react.js]][react-url]
[![Redux][redux.js]][redux-url]
[![Python][python.js]][python-url]
[![Flask][flask.js]][flask-url]

Database:

[![PostgreSQL][postgresql.js]][postgresql-url]

<br>

# Features Directions

Example [modify later]:
## Home Page Demo User

[Insert description of feature + photo]
![demo-user-features]

[demo-user-features]:

## Create Business as Logged-In User

Logged-in users will be able to create a new business.
![create-business-form]

[create-business-form]:

## Business Details Viewing Available For Anyone

Business details can be accessed by anyone with additional features for logged in users, such as writing a review for someone else's business.
![business-details]

[business-details]:

## Roadmap

- <input type="checkbox" checked> User Authentication
- <input type="checkbox" checked> Businesses (CRUD)
- <input type="checkbox"> Reviews (CRUD)
  - <input type="checkbox" checked> Create user reviews
  - <input type="checkbox" checked> Read user reviews
  - <input type="checkbox"> Update user reviews
  - <input type="checkbox" checked> Delete user reviews

<br>

# Get Started

To run this project locally, please perform the following steps:

1. Clone the repository
   ```sh
   git clone https://github.com/truham/Plate-Pal
   ```
2. Install dependencies at the root directory
   ```sh
   pipenv install -r requirements.txt
   ```
3. Create a **.env** file based on the example with proper settings for your development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory. Install the npm packages while inside of the `react-app` directory.
   ```bash
   npm install
   ```

6. Run the backend server at the root directory with pipenv run flask run
   ```bash
   pipenv run flask run
   ```
   
7. Run the frontend server inside the `react-app` with npm start
   ```bash
   npm start
   ```
   
<br>

# Contact

Project Link: [https://github.com/truham/Plate-Pal](https://github.com/truham/Plate-Pal)

Team Members:

- <input type="checkbox"> [Nick Murphy](https://github.com/Murphyn5)
- <input type="checkbox"> [Zak Beg](https://github.com/zakariya23)
- <input type="checkbox"> [Hamilton Truong](https://github.com/truham)

<!-- References and Icons -->

[html.js]: https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css.js]: https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[javascript.js]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[javascript-url]: https://www.javascript.com/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux.js]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[python.js]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[python-url]: https://www.python.org/
[flask.js]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[flask-url]: https://expressjs.com/
[postgresql.js]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
