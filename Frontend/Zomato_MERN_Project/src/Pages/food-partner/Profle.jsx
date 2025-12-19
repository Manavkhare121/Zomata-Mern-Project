import React, { useState, useEffect } from 'react';
import '../../styles/profile.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import food from '../../assests/images/food_image.png';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  // ✅ Backend URL from env
  const BACKEND_URL =
    import.meta.env.VITE_API_BASE ||
    "https://snackogram-backend.onrender.com";

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/api/food-partner/${id}`,
        { withCredentials: true }
      )
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <main className="profile">
      {/* <img src={food} alt="" /> */}
      <div className="profile-page">
        <section className="profile-header">
          <div className="profile-meta">
            <img
              className="profile-avatar"
              src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60"
              alt=""
            />

            <div className="profile-info">
              <h1 className="profile-pill profile-business">
                {profile?.name}
              </h1>
              <p className="profile-pill profile-address">
                {profile?.address}
              </p>
            </div>
          </div>

          <div className="profile-stats" role="list">
            <div className="profile-stat" role="listitem">
              <span className="profile-stat-label">Total Meals</span>
              <span className="profile-stat-value">
                {profile?.totalMeals}
              </span>
            </div>
            <div className="profile-stat" role="listitem">
              <span className="profile-stat-label">Customer Served</span>
              <span className="profile-stat-value">
                {profile?.customersServed}
              </span>
            </div>
          </div>
        </section>

        <hr className="profile-sep" />

        <section className="profile-grid" aria-label="Videos">
          {videos.map((v) => (
            <div key={v.id} className="profile-grid-item">
              <video
                className="profile-grid-video"
                src={v.video}
                muted
                loop
                preload="metadata"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
              />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Profile;
