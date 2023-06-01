# About FootTracks

FootTracks is a web application inspired by Strava. It allows users to search for other users, create/read/update/delete activities and comments, create/read/delete likes for avtivities and follows for users, upload profile pictures using Amazon AWS, and record and create activities using Leaflet.js. [Click here to visit FootTracks's live site](https://foottracks-myao.onrender.com).

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
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)](https://leafletjs.com/)
[![Tailwind][tailwind.js]][tailwind-url]
[![MapBox][mapbox.js]][mapbox-url]


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

Returning to their feed, visitors will then be able to see activities in the "Following" Tab and the "My Activities" tab ordered by activity date. The "Following" tab includes activities created by the visitor and users that they follow. The "My Activities" tab includes activities created only by the user. For each activity, visitors will: be able to see the number of likes (displayed as kudos) and comments an activity has, have the option to like/unlike the activity if they are not the owner, and have the ability to open a modal to see comment and kudos details.

![Screen Shot 2023-04-04 at 1 52 23 PM](https://user-images.githubusercontent.com/63930644/229918078-770b7165-baef-4cf7-93f5-beb4037e1d15.png)

![Screen Shot 2023-04-04 at 1 50 18 PM](https://user-images.githubusercontent.com/63930644/229917520-079ef045-c846-4f32-9f96-84064c6abedc.png)

While viewing the comments modal, visitors will: have the ability to post/edit/ or delete comments they are the owner of, have the ability to delete any comment if they are the owner of the activity, and view details for users that have liked the activity.

![Screen Shot 2023-04-04 at 1 56 19 PM](https://user-images.githubusercontent.com/63930644/229918903-af451566-8403-4320-8295-0c54fe59bec7.png)

![Screen Shot 2023-04-04 at 1 59 14 PM](https://user-images.githubusercontent.com/63930644/229919783-a17e3c28-2281-49fb-8c4e-373b48746c8f.png)

To create an activity, visitors can access the dropdown in the top right corner of the window to either manually create an activity or to record an activity.

![Screen Shot 2023-04-04 at 2 00 57 PM](https://user-images.githubusercontent.com/63930644/229920452-6695a2e7-71f3-46e4-9191-50090531b21b.png)


For manually creating an activity, visitors will will be required to submit data for distance, duration, title, sport, and date of the activity.

![Screen Shot 2023-04-04 at 2 09 29 PM](https://user-images.githubusercontent.com/63930644/229923077-f4d34004-3c70-404f-bc6a-c2842e028bf8.png)

For recording activities, this applicates integrates into react a running tracker developed by [Anthony Ng](https://medium.com/@engineerng) that he shared in the article: [Make a running tracker with Geolocation API](https://medium.com/geekculture/make-a-running-tracker-with-geolocation-api-8b2ac541196e). Recording an activity using this feature allows the visitor to toggle on/off a tracker that tracks the distance, duration, and elevation gain of an activity. When recording is toggled off, visitors can then choose to save the activity with the recorded data along with a map including a polyline displaying the visitor's path during the activity.

[Demo on Youtube](https://www.youtube.com/watch?v=Un9sFEMaWf8)

[Github Link](https://github.com/ng-the-engineer/running-tracker)

![Screen Shot 2023-04-04 at 2 11 14 PM](https://user-images.githubusercontent.com/63930644/229923438-0610bf3b-3542-41ea-988c-fb3492d46bad.png)

![Screen Shot 2023-04-04 at 2 11 37 PM](https://user-images.githubusercontent.com/63930644/229923506-ffe2ea30-4a84-4614-9c9c-1d6f4ff9e48b.png)

The final feature included in FootTracks is the "My Activities" page where visitors have the option to edit/delete any of their owned activities.

![Screen Shot 2023-04-04 at 2 26 08 PM](https://user-images.githubusercontent.com/63930644/229926449-e89c3cad-8e01-4a59-ad82-25880fe2d7f8.png)

# Future Implementation Goals

Features that are planned to be built into FootTracks at a later date include a user profile page, the ability for users to create/read/delete images to their activities, an activity details page, and the implementation of a groups feature that users can join and interact with activities from other members of the group.

# Contact

# Contact

Email: nlimurphy@gmail.com

Portfolio: https://murphyn5.github.io/

LinkedIn: https://linkedin.com/in/nicholas-murphy-dev

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
[tailwind.js]: https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[mapbox.js]: https://img.shields.io/badge/Mapbox-2962ff?style=for-the-badge&logo=mapbox&logoColor=white
[mapbox-url]: https://www.mapbox.com/
