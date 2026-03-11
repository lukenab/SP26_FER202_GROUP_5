import { useEffect, useState } from "react";

export default function ProfilePage() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setUser(currentUser);
  }, []);

  if (!user) {
    return <p style={{textAlign:"center"}}>Loading...</p>;
  }

  return (
    <div className="profile-container">

      <div className="profile-card">

        <h2>User Profile</h2>

        <div className="profile-item">
          <span>Name</span>
          <p>{user.name}</p>
        </div>

        <div className="profile-item">
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className="profile-item">
          <span>Role</span>
          <p>{user.role}</p>
        </div>

      </div>

    </div>
  );
}