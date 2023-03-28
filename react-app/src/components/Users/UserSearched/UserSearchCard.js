import { Link } from "react-router-dom";
import "./UserSearchCard.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loadUserFollowing, followUserThunk, unfollowUserThunk } from "../../../store/users";
import { authenticate } from "../../../store/session";

const UserSearchCard = ({ user, count }) => {
  const dispatch = useDispatch()
  const following = useSelector(loadUserFollowing)
  const [ followingBoolean, setFollowingBoolean ] = useState( false )

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
    if(followingBoolean) {
      return (
        <button onClick={unFollowSubmit} className={`users-search-unfollow-submit-container`}></button>
      )
    } else {
      return (
        <button onClick={followSubmit} className={`users-search-follow-submit-container`}>Follow</button>
      )
    }
  }

  return (
    <div className={`users-search-item ${rowColor}`}>
      <div className="users-search-item-owner-container">
        <div className="users-search-item-owner-image">
          <i className="fas fa-user-circle" />
        </div>
        <div className="users-search-item-owner-information">
          <div className="users-search-item-owner-name">
            <div>
              {`${user.first_name} ${user.last_name}.`}
            </div>
            <div className="users-search-item-owner-activities-title">
              <div style={{ position: "relative", right: "26px" }}>Activities</div>
            </div>
          </div>
          <div className="users-search-item-owner-activities-info">
            {followButtonRender()}
            <div></div>
            <div style={{ position: "relative", bottom: "15px" }}>
              <div>{user.ride_count === 0 ? null : (user.ride_count === 1 ? `${user.ride_count} Bike Ride` : `${user.ride_count} Bike Rides`)}</div>
              <div>{user.run_count === 0 ? null : (user.run_count === 1 ? `${user.run_count} Run` : `${user.run_count} Runs`)}</div>
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
