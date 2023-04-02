from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
    User(first_name='John', last_name='Doe', email='john.doe@example.com', password='password', gender='male', profile_picture="https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/0d1d13dd41004b879bdcf3bfdc861246.png", birthday=date(1990, 1, 1)),
    User(first_name='Nick', last_name='Murphy', email='marnie@aa.io', password='password', gender='male', profile_picture="https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/8b5ce271d743429192faa7bc519dbbf2.jpeg", birthday=date(1995, 5, 5)),
    User(first_name='Bobbie', last_name='Smith', email='bobbie@aa.io', password='password', gender='male', profile_picture="https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/54327c08896d48909712a411932f2931.png", birthday=date(1980, 12, 31))
    ]
    db.session.add_all(users)
    db. session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
