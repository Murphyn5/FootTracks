from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange, URL, Regexp, ValidationError

class CommentForm(FlaskForm):
    body = StringField("Body", validators=[DataRequired(), Length(min=0, max=500, message="Comment must be less than 500 characters.")])
