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
        <div className="profile-content">
          <div className="profile-img-wrapper">
            {/* Default Profile Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="profile-img"
              alt="Profile"
            />
          </div>

          <h2 className="profile-title">My Profile</h2>

          {edit ? (
            <div className="profile-form">
              <div className="profile-input-group">
                <label>Full Name</label>
                <input
                  value={user?.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="profile-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="profile-input-group">
                <label>Email Address</label>
                <input
                  value={user?.email || ""}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="profile-input"
                  placeholder="Enter your email"
                />
              </div>

              <button onClick={handleUpdate} className="btn-profile-action btn-save">
                ✓ Save Changes
              </button>
              <button onClick={() => { setEdit(false); fetchProfile(); }} className="btn-profile-action btn-cancel">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="profile-info">
                <div className="info-group">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user?.name || "N/A"}</span>
                </div>
                <div className="info-group">
                  <span className="info-label">Email Address</span>
                  <span className="info-value">{user?.email || "N/A"}</span>
                </div>
              </div>

              <button onClick={() => setEdit(true)} className="btn-profile-action btn-edit">
                ✎ Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;