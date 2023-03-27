from app.models import db, Activity, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_activities():

    activity1 = Activity(owner_id=1,
                         title='Morning Run',
                         description='Ran around the park',
                         type='Run',
                         distance=3.2,
                         duration=1800,
                         calories=300,
                         elevation=50)
    activity2 = Activity(owner_id=2,
                         title='Afternoon Hike',
                         description='Hiked up the mountain',
                         type='Hike',
                         distance=5.5,
                         duration=7200,
                         calories=500,
                         elevation=500)
    activity3 = Activity(owner_id=3,
                         title='Morning Run',
                         description='A nice run in the park',
                         type='Run',
                         distance=5.0,
                         duration=1800,
                         calories=200,
                         elevation=50)
    activity4 = Activity(owner_id=1,
                         title='Afternoon Hike',
                         description='A hike with friends',
                         type='Hike',
                         distance=10.5,
                         duration=7200,
                         calories=600,
                         elevation=500)
    activity5 = Activity(owner_id=2,
                         title='Evening Bike Ride',
                         description='A relaxing bike ride',
                         type='Ride',
                         distance=8.3,
                         duration=2700,
                         calories=300,
                         elevation=70)
    activity6 = Activity(owner_id=3,
                         title='Indoor Ride',
                         description='A high-intensity indoor cycling session',
                         type='Ride',
                         distance=0.0,
                         duration=3600,
                         calories=500,
                         elevation=0)
    activity7 = Activity(owner_id=1,
                         title='Evening Jog',
                         description='A brisk jog around the neighborhood',
                         type='Run',
                         distance=3.0,
                         duration=1500,
                         calories=300,
                         elevation=30)
    activity8 = Activity(owner_id=2,
                         title='Morning Walk',
                         description='A relaxing walk in the park',
                         type='Walk',
                         distance=2.5,
                         duration=1800,
                         calories=100,
                         elevation=10)
    activity9 = Activity(owner_id=3,
                         title='Morning Ride',
                         description='A scenic morning bike ride',
                         type='Ride',
                         distance=10.0,
                         duration=3600,
                         calories=500,
                         elevation=100)
    activity10 = Activity(owner_id=1,
                          title='Afternoon Run',
                          description='A challenging afternoon run',
                          type='Run',
                          distance=5.0,
                          duration=2400,
                          calories=400,
                          elevation=50)
    activity11 = Activity(owner_id=2,
                          title='Evening Ride',
                          description='A relaxing evening bike ride',
                          type='Ride',
                          distance=8.0,
                          duration=2700,
                          calories=350,
                          elevation=80)
    activity12 = Activity(owner_id=3,
                          title='Morning Run',
                          description='A brisk morning run',
                          type='Run',
                          distance=3.0,
                          duration=1500,
                          calories=200,
                          elevation=20)

    activity13 = Activity(owner_id=1,
                          title='Afternoon Ride',
                          description='A challenging bike ride with some friends',
                          type='Ride',
                          distance=20.0,
                          duration=7200,
                          calories=1000,
                          elevation=200)
    activity14 = Activity(owner_id=2,
                          title='Morning Run',
                          description='A peaceful morning run in the park',
                          type='Run',
                          distance=4.0,
                          duration=1800,
                          calories=250,
                          elevation=30)
    activity15 = Activity(owner_id=3,
                          title='Evening Ride',
                          description='A relaxing bike ride at sunset',
                          type='Ride',
                          distance=15.0,
                          duration=5400,
                          calories=700,
                          elevation=150)
    activity16 = Activity(owner_id=1,
                          title='Afternoon Run',
                          description='A challenging trail run in the mountains',
                          type='Run',
                          distance=7.0,
                          duration=3600,
                          calories=600,
                          elevation=400)

    db.session.add_all([
        activity1,
        activity2,
        activity3,
        activity4,
        activity5,
        activity6,
        activity7,
        activity8,
        activity9,
        activity10,
        activity11,
        activity12,
        activity13,
        activity14,
        activity15,
        activity16,
    ])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the activities table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_activities():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activities"))

    db.session.commit()
