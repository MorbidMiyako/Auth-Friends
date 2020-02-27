import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    setChange(false);
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(response => {
        console.log("friends get request", response);
        setFriends(response.data);
      })
      .catch(error => {
        console.log("error from server:", error);
      });
  }, [change]);
  // delete friend
  const deleteFriend = (friend) => {
    console.log(friend);
    axiosWithAuth().delete(`http://localhost:5000/api/friends/${friend.id}`);
    setChange(true);
  };
  // edit a friend
  return (
    <div>
      <h1>Your Friends</h1>
      <Link to="friends/add">
        <button color="info">Add a new friend</button>
      </Link>
      {friends.map(friend => {
        return (
          <div key={friend.id} className="friend">
            <p>
              Name: {friend.name}, Age: {friend.age}
            </p>
            <p>Email: {friend.email}</p>
            <button onClick={() => { deleteFriend(friend) }}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};
export default FriendsList;
