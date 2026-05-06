import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user: authUser, setUser: setAuthUser } = useAuth();



 const [user, setUser] = useState(authUser || {});
  const [edit, setEdit] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

const handleUpdate = async () => {
  try {
    console.log("Saving..."); // debug

    const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

    const res = await axios.patch(
      "http://localhost:5000/api/auth/update",
      {
        name: user.name,
        email: user.email
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log("Updated:", res.data);

    // ✅ Update UI
    setUser(res.data);

    // ✅ Update global context
    setAuthUser(res.data);

    // ✅ Update localStorage
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    // ✅ EXIT EDIT MODE (THIS WAS NOT HAPPENING)
    setEdit(false);

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
  }
};

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* Default Profile Image */}
        <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        className="profile-img"
/>

        <h2>User Profile</h2>

        {edit ? (
          <>
            <input
              value={user?.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="profile-input"
            />

            <input
              value={user?.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="profile-input"
            />

            <button onClick={handleUpdate} className="btn-save">
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>

            <button onClick={() => setEdit(true)} className="btn-edit">
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;