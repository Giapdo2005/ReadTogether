import { Friend } from "./Friend";
import "../styles/FriendList.css";

export function FriendList({ friends }) {
  return (
    <div className="friend-list-container">
      <h2 className="friend-list-title">Giap's Reading Friends</h2>
      <div className="friend-grid">
        {friends.map((friend) => (
          <Friend
            key={friend.name}
            name={friend.name}
            age={friend.age}
            booksRead={friend.booksRead}
          />
        ))}
      </div>
    </div>
  );
}
