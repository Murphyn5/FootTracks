import { Link } from "react-router-dom";
import "./UserSearchCard.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadUserFollowing, followUserThunk, unfollowUserThunk } from "../../../store/users";
import { authenticate } from "../../../store/session";

const UserSearchCard = ({ user, count }) => {
  const dispatch = useDispatch()
  const following = useSelector(loadUserFollowing)
  const [followingBoolean, setFollowingBoolean] = useState(false)

  useEffect(() => {
    const followingIds = following.map((followedUser) => {
      return followedUser.id
    })
    if (!followingIds.includes(user.id)) {
      setFollowingBoolean(false)
    } else {
      setFollowingBoolean(true)
    }
  }, [following])

  let rowColor
  if (count % 2 === 1) {
    rowColor = "gray"
  }

  if (!user) return null;

  const followSubmit = async () => {
    await dispatch(followUserThunk(user.id))
    await dispatch(authenticate())
  }

  const unFollowSubmit = async () => {
    await dispatch(unfollowUserThunk(user.id))
    await dispatch(authenticate())
  }


  const followButtonRender = () => {
    if (followingBoolean) {
      return (
        <button onClick={unFollowSubmit} className={`users-search-unfollow-submit-container w-[80px] md:w-[125px]`}></button>
      )
    } else {
      return (
        <button onClick={followSubmit} className={`users-search-follow-submit-container w-[80px] md:w-[125px]`}>Follow</button>
      )
    }
  }

  return (
    <div className={`users-search-item  md:grid-cols-2`}>
      <div className="users-search-item-owner-container gap-[20px] md:gap-[50px]">

        <div className="users-search-item-owner-image flex items-center md:items-start w-[50px] md:w-[70px]">
          {user.profile_picture ?
            <img src={user.profile_picture} className="w-[50px] h-[50px] md:w-[70px] md:h-[70px]"></img>
            :
            <i className="fas fa-user-circle text-[50px] md:text-[70px]" />

          }
        </div>

        <div className="users-search-item-owner-information">
          <div className="users-search-item-owner-name">

            <Link
              to={`/users/${user.id}`}
            >
              <span className="hover:underline">
                {`${user.first_name} ${user.last_name}`}
              </span>
            </Link>

            {followButtonRender()}
            {/* <div className="users-search-item-owner-activities-title">
              <div style={{ position: "relative"}}>Activities</div>
            </div> */}
          </div>
          <div className="users-search-item-owner-activities-info">
            {/* {followButtonRender()} */}
            <div className="users-search-item-owner-activities-title">
              <div style={{ position: "relative" }}>Activities</div>
            </div>
            <div style={{ position: "relative" }}>
              <div>{(user.ride_count === 1 ? `${user.ride_count} Bike Ride` : `${user.ride_count} Bike Rides`)}</div>
              <div>{(user.run_count === 1 ? `${user.run_count} Run` : `${user.run_count} Runs`)}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default UserSearchCard;
