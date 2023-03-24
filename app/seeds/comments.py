from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_comments():

    comment1 = Comment(
        owner_id=1,
        activity_id=1,
        body="Nice job!"

    )
    comment2 = Comment(
        owner_id=2,
        activity_id=2,
        body="Which mountain?"
    )

    comment3 = Comment(
        owner_id=3,
        activity_id=3,
        body="So cool!"
    )

    comment4 = Comment(
        owner_id=1,
        activity_id=4,
        body="Wish I was there!"
    )

    comment5 = Comment(
        owner_id=2,
        activity_id=5,
        body="The weather was so nice yesterday"
    )

    comment6 = Comment(
        owner_id=3,
        activity_id=6,
        body="Legend"
    )
    comment7 = Comment(
        owner_id=1,
        activity_id=7,
        body="wow"
    )

    comment8 = Comment(
        owner_id=2,
        activity_id=8,
        body="👏"
    )

    comment9 = Comment(
        owner_id=3,
        activity_id=9,
        body="amazing"
    )

    comment10 = Comment(
        owner_id=1,
        activity_id=10,
        body="Get after it!"
    )

    comment11 = Comment(
        owner_id=2,
        activity_id=11,
        body="you inspire me!"
    )

    comment12 = Comment(
        owner_id=3,
        activity_id=12,
        body="so early geeez"
    )

    comment13 = Comment(
        owner_id=1,
        activity_id=13,
        body="you r 2 fast"
    )

    comment14 = Comment(
        owner_id=2,
        activity_id=14,
        body="which park?"
    )

    comment15 = Comment(
        owner_id=3,
        activity_id=15,
        body="love sunset rides"
    )

    comment16 = Comment(
        owner_id=1,
        activity_id=16,
        body="I want to try that trail!"
    )

    db.session.add_all([
        comment1,
        comment2,
        comment3,
        comment4,
        comment5,
        comment6,
        comment7,
        comment8,
        comment9,
        comment10,
        comment11,
        comment12,
        comment13,
        comment14,
        comment15,
        comment16,
    ])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the activities table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
