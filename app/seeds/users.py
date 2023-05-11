from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(first_name='John', last_name='Doe', email='john.doe@example.com', password='password', gender='male',
             profile_picture="https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/0d1d13dd41004b879bdcf3bfdc861246.png", birthday=date(1990, 1, 1)),
        User(first_name='Nick', last_name='Murphy', email='marnie@aa.io', password='password', gender='male',
             profile_picture="https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/8b5ce271d743429192faa7bc519dbbf2.jpeg", birthday=date(1995, 5, 5)),
        User(first_name='Bobbie', last_name='Smith', email='bobbie@aa.io', password='password', gender='male',
             profile_picture="https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/54327c08896d48909712a411932f2931.png", birthday=date(1980, 12, 31)),
        User(
            first_name='Alice',
            last_name='Johnson',
            email='alice@example.com',
            password='password',
            gender='female',
            profile_picture='https://nm-aws-pern-demo.s3.us-west-2.amazonaws.com/c96a72e8565142b1918a1023d8f010ad.jpg',
            birthday=date(1990, 5, 25)
        ),
        User(
            first_name='Jeevan',
            last_name='Noel',
            email='bob@example.com',
            password='password',
            gender='male',
            profile_picture='https://upload.wikimedia.org/wikipedia/commons/e/e9/Albert-einstein-profile-picture-512x512.png.cf.png?20180903052927',
            birthday=date(1985, 8, 12)
        ),
        User(
            first_name='Julie',
            last_name='Garcia',
            email='charlie@example.com',
            password='password',
            gender='non-binary',
            profile_picture='https://cdn.pixabay.com/photo/2019/05/18/16/42/girl-4212093_1280.jpg',
            birthday=date(2000, 1, 1)
        )
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
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
