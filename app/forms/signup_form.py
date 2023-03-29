from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
from datetime import datetime

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def date_check(form, field):
    # Checking if user exists
    date_time = str(field.data)

    dt = datetime.strptime(date_time, '%Y-%m-%d')
    if dt > datetime.utcnow():
        raise ValidationError("Birthday can't be set beyond present date.")

class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired(), Length(max=24, message="First name must be less than 24 characters.")])
    last_name = StringField(
        'last_name', validators=[DataRequired(), Length(max=24, message="Last name must be less than 24 characters.")])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[Length(min=6, message="Password must be at least 6 characters long."), DataRequired()])
    gender = StringField('gender', validators=[DataRequired()])
    birthday = DateField("birthday", validators=[DataRequired(), date_check])
