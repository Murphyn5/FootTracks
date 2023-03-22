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
    activity_query = db.session.query(
        Activity).filter(Activity.owner_id == user_id)
    activities = [activity.to_dict() for activity in activity_query.all()]

    # for activity in activities:
    #     comments_query = db.session.query(Comment).filter(
    #         Comment.activity_id == activity["id"])
    #     comments = comments_query.all()
    #     activity["comments"] = [comment.to_dict() for comment in comments]

    return {'activities': {activity["id"]: activity for activity in activities}}

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
    activity_comments = [review.to_dict() for review in comment_query.all()]

    for comment in activity_comments:
        owner = User.query.get(comment["owner_id"])
        owner = owner.to_dict()
        comment['owner_first_name'] = owner["first_name"]
        comment['owner_last_name'] = owner["last_name"]

    return {"activityComments": {review['id']: review for review in activity_comments}}

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
        return activity.to_dict()

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
