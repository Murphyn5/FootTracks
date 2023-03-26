import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersSearchThunk, getUserFollowingThunk, loadSearchedUsers, loadUserFollowing  } from "../../../store/users";
import UserSearchCard from "./UserSearchCard";

import "./UserSearched.css";

const UserSearched = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchString } = useParams();
  const users = useSelector(loadSearchedUsers)




  useEffect(() => {
    const searchUsers = async () => {
      await dispatch(getUsersSearchThunk(searchString));
      await dispatch(getUserFollowingThunk())
    };
    searchUsers();
  }, [dispatch, searchString]);

  // if (searchResult === null) return null;


  let count = 1

  return (

    <div className="users-search-container-background">
      <div className="users-search-container">
        <h1>Athlete Search</h1>
        <div style={{ lineHeight: "22px", fontWeight: "400", fontSize: "22px" }}>{users.length} {users.length === 1 ? "Athlete" : "Athletes"}</div>
        <hr style={{ marginBottom: "0", borderBottom: "0" }}></hr>
        {users.length === 0 ?
          <div>
            <br></br>
            <div>No athletes with name <span style={{fontWeight:"bold"}}>{searchString}</span> found</div>
          </div> : users.map((user) => {
            count++
            return (
              <UserSearchCard user={user} count={count} key={user.id} />
            );
          })}
      </div>
    </div>
  );
};

export default UserSearched;
