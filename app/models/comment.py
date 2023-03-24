from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("activities.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    owner = db.relationship("User", back_populates="comments")
    activity = db.relationship("Activity", back_populates = "comments")

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'owner_id': self.owner_id,
            'activity_id': self.activity_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
