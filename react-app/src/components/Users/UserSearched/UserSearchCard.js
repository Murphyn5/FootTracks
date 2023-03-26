import { Link } from "react-router-dom";
import "./UserSearchCard.css";
import { useState } from "react";

const UserSearchCard = ({ user, count }) => {

  if (!user) return null;

  let rowColor
  if (count % 2 === 1) {
    rowColor = "gray"
  }

  const FollowSubmit = () => {

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
              <div style={{position:"relative", right:"26px"}}>Activities</div>
            </div>
          </div>
          <div className="users-search-item-owner-activities-info">
            <button onClick={FollowSubmit} className={`users-serach-follow-submit-container`}>Following</button>
            <div></div>
            <div style={{position:"relative",bottom:"15px"}}>
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
