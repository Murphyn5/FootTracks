from flask import Blueprint, jsonify, request
from app.models import Activity, db, Comment, User
from flask_login import login_required, current_user
from app.models import User
from app.forms.profile_image_form import ImageForm
from app.api.aws_helpers import (
    upload_file_to_s3, get_unique_filename)


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

    user_dict = user.to_dict()

    activity_query = db.session.query(
        Activity).filter(Activity.owner_id == user.id)
    activities = activity_query.all()
    activities_to_return = []
    for activity in activities:
        comments_length = len(activity.comments)
        likes_length = len(activity.liked_users)
        activity_dict = activity.to_dict()
        activity_dict["owner_first_name"] = user_dict["first_name"]
        activity_dict["owner_last_name"] = user_dict["last_name"]
        activity_dict["owner_profile_picture"] = user_dict["profile_picture"]
        activity_dict["comments_length"] = comments_length
        activity_dict["likes_length"] = likes_length
        activity_dict["liked_users"] = []
        for user in activity.liked_users:
            activity_dict["liked_users"].append(user.to_dict())
        activities_to_return.append(activity_dict)

    user_dict['activities']  = [activity_dict for activity_dict in activities_to_return]

    return user_dict

# GET LIST OF WHO USER IS FOLLOWING BY USER ID


@user_routes.route('/current/following')
@login_required
def get_comments_by_activity_id():
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    if not user:
        return {
            "errors": ["error: User couldn't be found"],
            "status_code": 404
        }, 404

    return {"following": {user.id: user.to_dict() for user in user.following}}


# FOLLOW A USER
@user_routes.route('/<int:id>/follow', methods=["POST"])
@login_required
def user_follow(id):
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    user_to_follow = User.query.get(id)
    if not user_to_follow:
        return {
            "errors": ["error: User couldn't be found"],
            "status_code": 404
        }, 404

    if user_to_follow.id == user.id:
        return {
            "errors": ["error: Users can't follow themselves"],
            "status_code": 403
        }, 403

    user.following.append(user_to_follow)
    db.session.commit()
    return user_to_follow.to_dict(), 201

# UNFOLLOW A USER


@user_routes.route('/<int:id>/unfollow', methods=["DELETE"])
@login_required
def user_unfollow(id):
    user_id = int(current_user.get_id())
    user_to_unfollow = User.query.get(id)
    user = User.query.get(user_id)
    if not user_to_unfollow:
        return {
            "errors": ["error: User couldn't be found"],
            "status_code": 404
        }, 404

    if user_to_unfollow.id == user.id:
        return {
            "errors": ["error: Users can't unfollow themselves"],
            "status_code": 403
        }, 403

    user.following = [
        user for user in user.following if user.id != user_to_unfollow.id]
    db.session.commit()
    return {"following": {user.id: user.to_dict() for user in user.following}}

# SEARCH FOR A USER


@user_routes.route('/search')
@login_required
def user_search():
    if request.args:
        search_query = request.args['query']
        user_id = int(current_user.get_id())
        session_user = User.query.get(user_id)
        users = [user.to_dict() for user in User.query.all()
                 if user.id != session_user.id]
        if search_query == "undefined":
            pass
        else:
            users_query = User.query.filter(
                (User.first_name.ilike(f'%{search_query}%')) |
                (User.last_name.ilike(f'%{search_query}%'))
            )

            users = [user.to_dict() for user in users_query.all()
                     if user.id != session_user.id]

        for user in users:
            activities_query = db.session.query(Activity).filter(
                Activity.owner_id == user["id"])
            activities = activities_query.all()
            runs = [activity for activity in activities if activity.type == "Run"]
            rides = [activity for activity in activities if activity.type == "Ride"]
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

# ADD A PROFILE PICTURE


@user_routes.route('/<int:id>/profile', methods=["POST"])
@login_required
def upload_image(id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            # return render_template("post_form.html", form=form, errors=[upload])
            return "failed"

        url = upload["url"]
        session_user = User.query.get(int(current_user.get_id()))
        session_user.profile_picture = url
        db.session.commit()
        return {"url": url}

    if form.errors:
        print(form.errors)
        # return render_template("post_form.html", form=form, errors=form.errors)

    # return render_template("post_form.html", form=form, errors=None)
