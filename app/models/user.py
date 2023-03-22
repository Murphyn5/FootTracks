from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

# follows = db.Table(
#     "follows",
#     db.Model.metadata,
#     db.Column("followed_id", db.Integer, add_prefix_for_prod(db.ForeignKey("users.id")), primary_key=True),
#     db.Column("follower_id", db.Integer, add_prefix_for_prod(db.ForeignKey("users.id")), primary_key=True))

# if environment == "production":
#     follows.schema = SCHEMA

# likes = db.Table(
#     "likes",
#     db.Model.metadata,
#     db.Column("users", db.Integer, add_prefix_for_prod(db.ForeignKey("users.id")), primary_key=True),
#     db.Column("activities", db.Integer, add_prefix_for_prod(db.ForeignKey("activities.id")), primary_key=True)
# )

# if environment == "production":
#     likes.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255))
    gender = db.Column(db.String(10), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    activities = db.relationship("Activity", cascade="all, delete", back_populates="owner")
    comments = db.relationship("Comment", cascade="all, delete", back_populates = "owner")
    # liked_activities = db.relationship("Activity", secondary=likes, back_populates="liked_users")
    # followers = db.relationship("User", secondary=follows, back_populates="following")
    # following = db.relationship("User", secondary=follows, back_populates="followers")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'profile_picture' : self.profile_picture,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

class Activity(db.Model, UserMixin):
    __tablename__ = 'activities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    distance = db.Column(db.Float(precision=1, asdecimal=True), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    calories = db.Column(db.Integer, nullable=False)
    elevation = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    owner = db.relationship("User", back_populates="activities")
    comments = db.relationship("Comment", cascade="all, delete", back_populates = "activity")
    # liked_users = db.relationship("User", secondary=likes, back_populates="liked_activities")
    # photos = db.relationship("Photo", cascade="all, delete", back_populates = "activity")

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
