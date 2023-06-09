from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import Activity, db, Comment, User
from app.forms.activities_form import ActivityForm
from app.forms.comments_form import CommentForm
from datetime import datetime

activity_routes = Blueprint('activities', __name__)

# GET ALL ACTIVITIES
@activity_routes.route('/')
@login_required
def get_activities():
    activities = Activity.query.all()
    activities_to_return = []

    for activity in activities:
        comments_length = len(activity.comments)
        likes_length = len(activity.liked_users)
        activity_dict = activity.to_dict()
        owner = User.query.get(activity.owner_id)
        activity_dict["owner_first_name"] = owner.first_name
        activity_dict["owner_last_name"] = owner.last_name
        activity_dict["owner_profile_picture"] = owner.profile_picture
        activity_dict["comments_length"] = comments_length
        activity_dict["likes_length"] = likes_length
        activity_dict["liked_users"] = []
        for user in activity.liked_users:
            activity_dict["liked_users"].append(user.to_dict())
        activities_to_return.append(activity_dict)


    return {'activities': {activity_dict["id"]: activity_dict for activity_dict in activities_to_return}}


# GET ALL ACTIVITIES FOR FOLLOWED USERS
@activity_routes.route('/following')
@login_required
def get_followed_activities():
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    activity_query = db.session.query(
        Activity).filter(Activity.owner_id == user_id)
    activities = activity_query.all()
    activities_to_return = []
    for activity in activities:
        owner = User.query.get(activity.owner_id)
        comments_length = len(activity.comments)
        likes_length = len(activity.liked_users)
        activity_dict = activity.to_dict()
        activity_dict["owner_first_name"] = owner.first_name
        activity_dict["owner_last_name"] = owner.last_name
        activity_dict["owner_profile_picture"] = owner.profile_picture
        activity_dict["comments_length"] = comments_length
        activity_dict["likes_length"] = likes_length
        activity_dict["liked_users"] = []
        for user in activity.liked_users:
            activity_dict["liked_users"].append(user.to_dict())
        activities_to_return.append(activity_dict)

    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    for user in user.following:
        for activity in user.activities:
            owner = User.query.get(activity.owner_id)
            comments_length = len(activity.comments)
            likes_length = len(activity.liked_users)
            activity_dict = activity.to_dict()
            activity_dict["owner_first_name"] = owner.first_name
            activity_dict["owner_last_name"] = owner.last_name
            activity_dict["owner_profile_picture"] = owner.profile_picture
            activity_dict["comments_length"] = comments_length
            activity_dict["likes_length"] = likes_length
            activity_dict["liked_users"] = []
            for user in activity.liked_users:
                activity_dict["liked_users"].append(user.to_dict())
            activities_to_return.append(activity_dict)



    return {'activities': {activity_dict["id"]: activity_dict for activity_dict in activities_to_return}}


# GET ALL ACTIVITIES BY CURRENT USER
@activity_routes.route('/current')
@login_required
def current_user_activities():
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    activity_query = db.session.query(
        Activity).filter(Activity.owner_id == user_id)
    activities = activity_query.all()
    activities_to_return = []
    for activity in activities:
        owner = User.query.get(activity.owner_id)
        comments_length = len(activity.comments)
        likes_length = len(activity.liked_users)
        activity_dict = activity.to_dict()
        activity_dict["owner_first_name"] = owner.first_name
        activity_dict["owner_last_name"] = owner.last_name
        activity_dict["owner_profile_picture"] = owner.profile_picture
        activity_dict["comments_length"] = comments_length
        activity_dict["likes_length"] = likes_length
        activity_dict["liked_users"] = []
        for user in activity.liked_users:
            activity_dict["liked_users"].append(user.to_dict())
        activities_to_return.append(activity_dict)

    return {'activities': {activity_dict["id"]: activity_dict for activity_dict in activities_to_return}}

# GET ACTIVITY DETAILS BY ID
@activity_routes.route('/<int:id>')
def get_activity_details(id):
    # Single activity
    activity = Activity.query.get(id).to_dict()

    if not activity:
        return {
            "errors": "error: Activity couldn't be found",
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
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    dt = datetime.strptime(data['date_time'], '%Y-%m-%d %H:%M:%S')
    if form.validate_on_submit():
        new_activity = Activity(
            owner_id=user_id,
            title=data['title'],
            type=data['type'],
            description=data['description'],
            distance=data['distance'],
            duration=data['duration'],
            coordinates= data['coordinates'],
            calories=data['calories'],
            elevation=data['elevation'],
            activity_date=dt,
            updated_at=datetime.utcnow(),
            created_at=datetime.utcnow()
        )
        db.session.add(new_activity)
        db.session.commit()
        new_activity = new_activity.to_dict()
        new_activity['owner_first_name'] = user.first_name
        new_activity['owner_last_name'] = user.last_name
        return new_activity
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET COMMENTS BY ACTIVITY ID
@activity_routes.route('/<int:id>/comments')
@login_required
def get_comments_by_activity_id(id):
    comment_query = db.session.query(Comment).filter(Comment.activity_id == id)
    activity_comments = [comment.to_dict() for comment in comment_query.all()]

    for comment in activity_comments:
        owner = User.query.get(comment["owner_id"])
        owner = owner.to_dict()
        comment['owner_first_name'] = owner["first_name"]
        comment['owner_last_name'] = owner["last_name"]
        comment['owner_profile_picture'] = owner["profile_picture"]

    return {"comments": {comment['id']: comment for comment in activity_comments}}

# CREATE NEW COMMENT FOR AN  ACTIVITY
@activity_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def create_new_comment(id):
    activity = Activity.query.get(id)
    if not activity:
        return {
            "errors": ["error: Activity couldn't be found"],
            "status_code": 404
        }, 404
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    data = request.get_json()
    if form.validate_on_submit():
        new_comment = Comment(
            owner_id=int(current_user.get_id()),
            activity_id=id,
            body=data['body'],
        )
        db.session.add(new_comment)
        db.session.commit()
        new_comment = new_comment.to_dict()
        new_comment['owner_first_name'] = user.first_name
        new_comment['owner_last_name'] = user.last_name
        new_comment['owner_profile_picture'] = user.profile_picture
        return new_comment
    if form.errors:
        return {
            "message": "Validation error",
            "statusCode": 400,
            'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET LIKED USERS BY ACTIVITY ID
@activity_routes.route('/<int:id>/likes')
@login_required
def get_likes_by_activity_id(id):
    activity = Activity.query.get(id)
    if not activity:
        return {
            "errors": ["error: Activity couldn't be found"],
            "status_code": 404
        }, 404

    return {"liked_users": {user.id: user.to_dict() for user in activity.liked_users}}

# CREATE A NEW LIKE FOR AN  ACTIVITY
@activity_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def create_new_like(id):
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    activity = Activity.query.get(id)
    if not activity:
        return {
            "errors": ["error: Activity couldn't be found"],
            "status_code": 404
        }, 404

    if activity.owner_id == user.id:
        return {
            "errors": ["error: Users can't like their own activities"],
            "status_code": 403
        }, 403
    activity.liked_users.append(user)
    db.session.commit()
    return user.to_dict(), 201

# DELETE A NEW LIKE FOR AN ACTIVITY
@activity_routes.route('/<int:id>/likes', methods=["DELETE"])
@login_required
def delete_like(id):
    user_id = int(current_user.get_id())
    session_user = User.query.get(user_id)
    activity = Activity.query.get(id)
    if not activity:
        return {
            "errors": ["error: Activity couldn't be found"],
            "status_code": 404
        }, 404

    activity.liked_users = [
        user for user in activity.liked_users if user.id != session_user.id]
    db.session.commit()
    return {"liked_users": {user.id: user.to_dict() for user in activity.liked_users}}


# UPDATE ACTIVITY
@activity_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_activity(id):
    activity = Activity.query.get(id)
    if not activity:
        return {
            "errors": ["error: Activity couldn't be found"],
            "status_code": 404
        }, 404
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)
    data = request.get_json()
    dt = datetime.strptime(data['date_time'], '%Y-%m-%d %H:%M:%S')
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if int(current_user.get_id()) == activity.owner_id:
        if form.validate_on_submit():
            activity.title = data['title']
            activity.type = data['type']
            activity.description = data['description']
            activity.distance = data['distance']
            activity.duration = data['duration']
            activity.calories = data['calories']
            activity.elevation = data['elevation']
            activity.activity_date = dt
            activity.updated_at = datetime.utcnow()
            activity_dict = activity.to_dict()
            activity_dict['owner_first_name'] = user.first_name
            activity_dict['owner_last_name'] = user.last_name
            activity_dict["liked_users"] = []
            activity_dict["likes_length"] = len(activity.liked_users)
            for user in activity.liked_users:
                activity_dict["liked_users"].append(user.to_dict())

            db.session.commit()
            return activity_dict, 200
        if form.errors:
            return {
                "message": "Validation error",
                "statusCode": 400,
                'errors': validation_errors_to_error_messages(form.errors)}, 400

    else:
        return {
            "errors": ["error: Forbidden"],
            "status_code": 403
        }, 403


# DELETE AN ACTIVITY
@activity_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_activity(id):
    activity = Activity.query.get(id)

    if not activity:
        return {
            "errors": "error: Activity couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) == activity.owner_id:
        db.session.delete(activity)
        db.session.commit()
        return {
            "message": "Successfully deleted",
            "status_code": 200
        }
    else:
        return {
            "errors": "error: Forbidden",
            "status_code": 403
        }, 403
