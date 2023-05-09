from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, FloatField, DateTimeField, TimeField
from wtforms.validators import DataRequired, Length, NumberRange, URL, Regexp, ValidationError
from datetime import datetime, timedelta

def date_check(form, field):
    # Checking if user exists
    date_time = str(field.data)

    dt = datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
    if dt > datetime.utcnow():
        raise ValidationError("Activity date can't be set beyond present date.")


class ActivityForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(min=0, max=100, message="Title must be less than 100 characters.")])
    type = StringField("Type", validators=[DataRequired()])
    description = StringField("Description", validators=[Length(max=500, message="Description must be less than 500 characters.")])
    coordinates = StringField("Coordinates", validators=[Length(max=100000, message="Coordinates must be less than 100000 characters.")])
    distance = FloatField("Distance", validators=[DataRequired(), NumberRange(min=0, max=1000000, message="Distance must be between 0 and 1000000.")])
    duration = IntegerField("Duration", validators=[DataRequired(), NumberRange(min=0, max=356400, message="Duration must be between 0 and 1000000.")])
    calories = IntegerField("Calories", validators=[NumberRange(min=0, max=1000000, message="Calories must be between 0 and 1000000.")])
    elevation = IntegerField("Elevation", validators=[NumberRange(min=0, max=1000000, message="Elevation must be between 0 and 1000000.")])
    date_time = DateTimeField("DateTime", validators=[date_check])
