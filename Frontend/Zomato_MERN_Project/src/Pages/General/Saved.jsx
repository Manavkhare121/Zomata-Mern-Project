import React, { useEffect, useState } from 'react';
import '../../styles/reels.css';
import axios from 'axios';
import ReelFeed from '../../components/ReelFeed';

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedFoods = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/food/saved", { withCredentials: true });
      console.log("📥 Saved Foods from backend:", response.data);
      const foods = response.data.savedFoods || [];
      setVideos(foods);
    } catch (error) {
      console.error("❌ Error fetching saved foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedFoods();
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post("http://localhost:8000/api/food/save", { foodId: item._id }, { withCredentials: true });
      setVideos((prev) => prev.filter((v) => v._id !== item._id));
    } catch (error) {
      console.error("❌ Error unsaving food:", error);
    }
  };

  if (loading) return <div className="loading">Loading saved reels...</div>;

  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;

