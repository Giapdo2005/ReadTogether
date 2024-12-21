import './styles/AddFriendForm.css';

export function AddFriendForm() {
  return (
    <form className="add-friend-form">
      <h2 className="form-title">Add a New Friend</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-input"
          placeholder="Enter friend's name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          className="form-input"
          placeholder="Enter friend's age"
        />
      </div>
      <button type="submit" className="submit-button">
        Add Friend
      </button>
    </form>
  );
}