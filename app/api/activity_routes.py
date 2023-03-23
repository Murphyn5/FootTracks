from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import Activity, db, Comment, User
from app.forms.activities_form import ActivityForm
from datetime import datetime

activity_routes = Blueprint('activities', __name__)

# GET ALL ACTIVITIES BY CURRENT USER


@activity_routes.route('/current')
@login_required
def current_user_activities():
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    activity_query = db.session.query(
        Activity).filter(Activity.owner_id == user_id)
    activities = [activity.to_dict() for activity in activity_query.all()]

    for activity in activities:
        activity["owner_first_name"] = user.first_name
        activity["owner_last_name"] = user.last_name

    return {'activities': {activity["id"]: activity for activity in activities}}

# GET Activity DETAILS BY ID

@activity_routes.route('/<int:id>')
def get_activity_details(id):
    # Single activity
    activity = Activity.query.get(id).to_dict()

    if not activity:
        return {
            "errors": "Activity couldn't be found",
            "status_code": 404
        }, 404

    # Handle comments
    # comment_query = db.session.query(Comment).filter(Comment.activity_id == id)
    # activity_comments = comment_query.all()
    # activity['number_of_comments'] = len(activity_comments)

    # Handle images
    # images_query = db.session.query(Image).filter(Image.activity_id == id)
    # images = images_query.all()
    # activity['images'] = [image.to_dict() for image in images]
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    activity["owner_first_name"] = user.first_name
    activity["owner_last_name"] = user.last_name
    return jsonify(activity)


# CREATE NEW ACTIVITY

@activity_routes.route('/', methods=['POST'])
@login_required
def create_new_activity():
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = request.get_json()
    if form.validate_on_submit():
        new_activity = Activity(
            owner_id=int(current_user.get_id()),
            title=data['title'],
            type=data['type'],
            description=data['description'],
            distance=data['distance'],
            duration=data['duration'],
            calories=data['calories'],
            elevation=data['elevation'],
        )
        db.session.add(new_activity)
        db.session.commit()
        return new_activity.to_dict()
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET COMMENTS BY ACTIVITY ID


@activity_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def get_comments_by_activity_id(id):
    comment_query = db.session.query(Comment).filter(Comment.activity_id == id)
    activity_comments = [comment.to_dict() for comment in comment_query.all()]

    for comment in activity_comments:
        owner = User.query.get(comment["owner_id"])
        owner = owner.to_dict()
        comment['owner_first_name'] = owner["first_name"]
        comment['owner_last_name'] = owner["last_name"]

    return {"activityComments": {comment['id']: comment for comment in activity_comments}}

# CREATE NEW COMMENT FOR AN  ACTIVITY
# @login_required
# def create_new_comment():
#     pass

# UPDATE ACTIVITY


@login_required
@activity_routes.route('/<int:id>', methods=['PUT'])
def update_activity(id):
    activity = Activity.query.get(id)
    if not activity:
        return {
            "errors": ["Activity couldn't be found"],
            "status_code": 404
        }, 404
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)

    data = request.get_json()
    if int(current_user.get_id()) == activity.owner_id:
        activity.description = data['description']
        activity.title = data['title']
        activity.type = data['type']
        activity.distance = data['distance']
        activity.duration = data['duration']
        activity.calories = data['calories']
        activity.elevation = data['elevation']
        db.session.commit()
        activity = activity.to_dict()
        activity["owner_first_name"] = user.first_name
        activity["owner_last_name"] = user.last_name

        return activity

    else:
        return {
            "errors": ["Forbidden"],
            "status_code": 403
        }, 403


# DELETE AN ACTIVITY
@login_required
@activity_routes.route('/<int:id>', methods=['DELETE'])
def delete_activity(id):
    activity = Activity.query.get(id)

    if not activity:
        return {
            "errors": "Activity couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) == activity.owner_id:
        db.session.delete(activity)
        db.session.commit()
        return {
            "errors": "Successfully deleted",
            "status_code": 200
        }
    else:
        return {
            "errors": "Forbidden",
            "status_code": 403
        }, 403
