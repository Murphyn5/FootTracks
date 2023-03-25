from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Comment, User, Activity
from app.forms.comments_form import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# UPDATE ACTIVITY
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return {
            "errors": ["Comment couldn't be found"],
            "status_code": 404
        }, 404
    user_id = int(current_user.get_id())
    user = User.query.get(user_id)

    data = request.get_json()
    if int(current_user.get_id()) == comment.owner_id:
        comment.body = data['body']
        db.session.commit()
        comment = comment.to_dict()
        comment["owner_first_name"] = user.first_name
        comment["owner_last_name"] = user.last_name

        return comment

    else:
        return {
            "errors": ["Forbidden"],
            "status_code": 403
        }, 403


# DELETE AN ACTIVITY
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    activity = Activity.query.get(comment.activity_id)

    if not comment:
        return {
            "errors": "Comment couldn't be found",
            "status_code": 404
        }, 404

    if int(current_user.get_id()) == comment.owner_id or int(current_user.get_id()) == activity.owner_id:
        db.session.delete(comment)
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
