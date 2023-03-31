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
                         activity_date=datetime(
                             2022, 12, 28, 23, 55, 59, 342380),
                         elevation=50)
    activity2 = Activity(owner_id=2,
                         title='Oyster Dome!',
                         description='Hiked up the mountain',
                         type='Hike',
                         distance=3,
                         duration=7200,
                         calories=500,
                         elevation=1800,
                         activity_date=datetime(
                             2023, 2, 13, 23, 55, 59, 342380),
                         coordinates="48.62686,-122.41479;48.62679,-122.41443;48.62610,-122.41414;48.62559,-122.41425;48.62501,-122.41397;48.62448,-122.41365;48.62408,-122.41379;48.62394,-122.41396;48.62374,-122.41446;48.62423,-122.41491;48.62403,-122.41516;48.62439,-122.41527;48.62411,-122.41545;48.62455,-122.41562;48.62440,-122.41595;48.62465,-122.41645;48.62498,-122.41676;48.62481,-122.41677;48.62494,-122.41689;48.62495,-122.41705;48.62476,-122.41698;48.62463,-122.41719;48.62438,-122.41745;48.62403,-122.41752;48.62417,-122.41792;48.62399,-122.41787;48.62372,-122.41841;48.62325,-122.41867;48.62365,-122.41878;48.62390,-122.41913;48.62386,-122.41957;48.62342,-122.41976;48.62304,-122.42026;48.62290,-122.42102;48.62189,-122.42149;48.62124,-122.42202;48.62050,-122.42344;48.61968,-122.42451;48.61863,-122.42536;48.61798,-122.42570;48.61741,-122.42637;48.61683,-122.42664;48.61549,-122.42750;48.61481,-122.42752;48.61434,-122.42767;48.61272,-122.42868;48.61125,-122.42893;48.60988,-122.42898;48.60892,-122.42850;48.60819,-122.42864;48.60892,-122.42959;48.60983,-122.43054;48.61084,-122.43075;48.61192,-122.43112;48.61322,-122.43169;48.61213,-122.43231;48.61075,-122.43260;48.60948,-122.43262;48.60754,-122.43183;48.60800,-122.43260;48.60893,-122.43339"
                         )
    activity3 = Activity(owner_id=3,
                         title='Morning Run',
                         description='A nice run in the park',
                         type='Run',
                         distance=5.0,
                         duration=1800,
                         calories=200,
                         activity_date=datetime(
                             2023, 1, 14, 23, 55, 59, 342380),
                         elevation=50)
    activity4 = Activity(owner_id=1,
                         title='Afternoon Hike',
                         description='A hike with friends',
                         type='Hike',
                         distance=10.5,
                         duration=7200,
                         calories=600,
                         activity_date=datetime(
                             2023, 2, 5, 23, 55, 59, 342380),
                         elevation=500)
    activity5 = Activity(owner_id=2,
                         title='Evening Bike Ride',
                         description='A relaxing bike ride',
                         type='Ride',
                         distance=8.3,
                         duration=2700,
                         calories=300,
                         activity_date=datetime(
                             2023, 2, 7, 23, 55, 59, 342380),
                         elevation=70)
    activity6 = Activity(owner_id=3,
                         title='Indoor Ride',
                         description='A high-intensity indoor cycling session',
                         type='Ride',
                         distance=0.0,
                         duration=3600,
                         calories=500,
                         activity_date=datetime(
                             2023, 3, 1, 23, 55, 59, 342380),
                         elevation=0)
    activity7 = Activity(owner_id=1,
                         title='Evening Jog',
                         description='A brisk jog around the neighborhood',
                         type='Run',
                         distance=3.0,
                         duration=1500,
                         calories=300,
                         activity_date=datetime(
                             2023, 1, 18, 23, 55, 59, 342380),
                         elevation=30)
    activity8 = Activity(owner_id=2,
                         title='Morning Walk',
                         description='A relaxing walk in the park',
                         type='Walk',
                         distance=2.5,
                         duration=1800,
                         calories=100,
                         activity_date=datetime(
                             2022, 12, 21, 23, 55, 59, 342380),
                         elevation=10)
    activity9 = Activity(owner_id=3,
                         title='Christmas Morning Ride',
                         description='A scenic morning bike ride',
                         type='Ride',
                         distance=10.0,
                         duration=3600,
                         calories=500,
                         activity_date=datetime(
                             2022, 12, 25, 23, 55, 59, 342380),
                         elevation=100)
    activity10 = Activity(owner_id=1,
                          title='Afternoon Run',
                          description='A challenging afternoon run',
                          type='Run',
                          distance=5.0,
                          duration=2400,
                          calories=400,
                          activity_date=datetime(
                              2023, 1, 19, 23, 55, 59, 342380),
                          elevation=50)
    activity11 = Activity(owner_id=2,
                          title='Evening Ride',
                          description='A relaxing evening bike ride',
                          type='Ride',
                          distance=8.0,
                          duration=2700,
                          calories=350,
                          activity_date=datetime(
                              2023, 3, 18, 23, 55, 59, 342380),
                          elevation=80)
    activity12 = Activity(owner_id=3,
                          title='Morning Run',
                          description='A brisk morning run',
                          type='Run',
                          distance=3.0,
                          duration=1500,
                          calories=200,
                          activity_date=datetime(
                              2023, 3, 2, 23, 55, 59, 342380),
                          elevation=20)

    activity13 = Activity(owner_id=1,
                          title='Afternoon Ride',
                          description='A challenging bike ride with some friends',
                          type='Ride',
                          distance=20.0,
                          duration=7200,
                          calories=1000,
                          activity_date=datetime(
                              2023, 1, 29, 23, 55, 59, 342380),
                          elevation=200)
    activity14 = Activity(owner_id=2,
                          title='Valentines Day Morning Run',
                          description='A peaceful morning run in the park',
                          type='Run',
                          distance=4.0,
                          duration=1800,
                          calories=250,
                          activity_date=datetime(
                              2023, 2, 14, 23, 55, 59, 342380),
                          elevation=30)
    activity15 = Activity(owner_id=3,
                          title='Evening Ride',
                          description='A relaxing bike ride at sunset',
                          type='Ride',
                          distance=15.0,
                          duration=5400,
                          calories=700,
                          activity_date=datetime(
                              2023, 3, 14, 23, 55, 59, 342380),
                          elevation=150)
    activity16 = Activity(owner_id=1,
                          title='Afternoon Run',
                          description='A challenging trail run in the mountains',
                          type='Run',
                          distance=7.0,
                          duration=3600,
                          calories=600,
                          activity_date=datetime(
                              2023, 3, 5, 23, 55, 59, 342380),
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
