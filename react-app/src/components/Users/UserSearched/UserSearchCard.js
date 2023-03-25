import { Link } from "react-router-dom";
import "./UserSearchCard.css";
import { useState } from "react";

const UserSearchCard = ({user, count}) => {

  if (!user) return null;

  let rowColor
  if(count % 2 === 1){
      rowColor = "gray"
  }

  return (
      <div className={`users-search-item ${rowColor}`}>
          <div>
              {user.first_name} {user.last_name}
          </div>

          <div>
              {user.title}
          </div>

          <div>
              {user.duration}
          </div>

          <div>
              {Math.round(user.distance * 100) / 100}
          </div>

          <div>
              {user.elevation}
          </div>

          <div>
              {user.calories}
          </div>


      </div>
  );
};

export default UserSearchCard;
