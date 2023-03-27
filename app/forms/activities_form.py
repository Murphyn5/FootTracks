from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, FloatField, DateField, TimeField
from wtforms.validators import DataRequired, Length, NumberRange, URL, Regexp, ValidationError

class ActivityForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(min=0, max=100, message="Title must be less than 100 characters.")])
    type = StringField("Type", validators=[DataRequired()])
    description = StringField("Description", validators=[Length(max=500, message="Description must be less than 500 characters.")])
    distance = FloatField("Distance", validators=[DataRequired(), NumberRange(min=0, message="Distance must be greater than 0.")])
    duration = IntegerField("Duration", validators=[DataRequired(), NumberRange(min=0, message="Duration must be greater than 0.")])
    calories = IntegerField("Calories", validators=[NumberRange(min=0, message="Calories must be greater than 0.")])
    elevation = IntegerField("Elevation", validators=[NumberRange(min=0, message="Elevation must be greater than 0.")])
    date = DateField("Date")
    time = TimeField("Time")
