# About FootTracks

FootTracks is a web application inspired by Strava. It allows users to search for other users, create/read/update/delete activities and comments, create/read/delete likes for avtivities and follows for users, upload profile pictures using Amazon AWS, and record and create activities using Leaflet.js. [Click here to visit FootTracks's live site](https://foottracks.onrender.com).

<br>

# Wiki Links

- [Feature List](https://github.com/Murphyn5/FootTracks/wiki/MVP-Feature-List)
- [User Stories](https://github.com/Murphyn5/FootTracks/wiki/User-Stories)
- [Database Schema](https://github.com/Murphyn5/FootTracks/wiki/Database-Schema)
- [WireFrame](https://github.com/Murphyn5/FootTracks/wiki/Wireframe)

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

# Get Started

To run this project locally, please perform the following steps:

1. Clone the repository
   ```sh
   git clone https://github.com/Murphyn5/FootTracks.git
   ```
2. Install dependencies at the root directory
   ```sh
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your development environment (Amazon S3 credentials required to upload profile pictures)

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

# Usage

Arriving at the login screen, visitors can either login as a demo user or login using an email and password already saved to the database.

![Screen Shot 2023-04-04 at 11 57 50 AM](https://user-images.githubusercontent.com/63930644/229895426-1cc9a2dc-d9f0-48a3-906a-9136df7c823d.png)

Visitors can also login by signing up and create their own user profile.

![Screen Shot 2023-04-04 at 12 14 02 PM](https://user-images.githubusercontent.com/63930644/229896650-9dbfd712-0cd6-48b8-9099-c8f4b770659f.png)

After logging in, visitors arrive at their feed where they can view activities created by users that they follow. If a visitor is not currently following other users, they will be prompted to follow another user before they can view any activities in their feed.

![Screen Shot 2023-04-04 at 1 51 34 PM](https://user-images.githubusercontent.com/63930644/229917946-943fe0ec-8766-4d1d-8720-8b6ee928a0bc.png)

After clicking the button to "Find Friends" or by searching for friends using the search bar, visitors will be presented with a list of users that they can follow.

![Screen Shot 2023-04-04 at 1 50 44 PM](https://user-images.githubusercontent.com/63930644/229917700-9e3ac060-ab22-409b-891b-403e2ec4cd1f.png)

Returning to their feed, visitors will then be able to see activities in the "Following" Tab and the "My Activities" tab ordered by activity date. The "Following" tab includes activities created by the visitor and users that they follow. The "My Activities" tab includes activities created only by the user.

![Screen Shot 2023-04-04 at 12 36 03 PM](https://user-images.githubusercontent.com/63930644/229901034-c6817f87-51c7-4d0d-a874-78e0ad26e7db.png)

![Screen Shot 2023-04-04 at 1 50 18 PM](https://user-images.githubusercontent.com/63930644/229917520-079ef045-c846-4f32-9f96-84064c6abedc.png)




For recording activities, this applicates integrates into react a geotracker developed by [Anthony Ng](https://medium.com/@engineerng) that he shared in the article: [Make a running tracker with Geolocation API](https://medium.com/geekculture/make-a-running-tracker-with-geolocation-api-8b2ac541196e). 

[Demo on Youtube](https://www.youtube.com/watch?v=Un9sFEMaWf8)

[Github Link](https://github.com/ng-the-engineer/running-tracker)

# Contact

Project Link: [https://github.com/Murphyn5/FootTracks](https://github.com/Murphyn5/FootTracks)

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
