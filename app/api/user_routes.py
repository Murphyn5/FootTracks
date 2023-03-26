from flask import Blueprint, jsonify, request
from app.models import Activity, db, Comment, User
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)

# GET ALL USER
@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# GET USER BY USER ID
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# SEARCH FOR A USER
@user_routes.route('/search')
@login_required
def user_search():
    if request.args:
        search_query = request.args['query']
        user_id = int(current_user.get_id())
        session_user = User.query.get(user_id)
        if not search_query:
            return {'users': {}}

        users_query = User.query.filter(
            (User.first_name.ilike(f'%{search_query}%')) |
            (User.last_name.ilike(f'%{search_query}%'))
        )

        users = [user.to_dict() for user in users_query.all() if user.id != session_user.id]


        for user in users:
            activities_query = db.session.query(Activity).filter(
                Activity.owner_id == user["id"])
            activities = activities_query.all()
            runs = [ activity for activity in activities if activity.type == "Run" ]
            rides = [ activity for activity in activities if activity.type == "Ride" ]
            user["ride_count"] = len(rides)
            user["run_count"] = len(runs)
            # Handle reviews
            # review_query = db.session.query(Review).filter(
            #     Review.user_id == user["id"])
            # user_reviews = review_query.all()
            # stars = [review.stars for review in user_reviews]
            # if len(user_reviews) > 0:
            #     avg_rating = sum(stars) / len(user_reviews)
            # else:
            #     avg_rating = 0
            # user['avg_rating'] = avg_rating
            # user['number_of_reviews'] = len(user_reviews)

        return {'users': {user["id"]: user for user in users}}

    return {'users': {}}
