import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Home = () => {
  const [videos, setVideos] = useState([])

  const BACKEND_URL =
    import.meta.env.VITE_API_BASE ||
    "https://snackogram-backend.onrender.com"

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food`, { withCredentials: true })
      .then(response => {
        setVideos(response.data.foodItems || response.data.fooditems || [])
      })
      .catch(err => console.error(err))
  }, [])

  async function likeVideo(item) {
    const response = await axios.post(
      `${BACKEND_URL}/api/food/like`,
      { foodId: item._id },
      { withCredentials: true }
    )

    setVideos(prev =>
      prev.map(v =>
        v._id === item._id
          ? { ...v, likeCount: v.likeCount + (response.data.like ? 1 : -1) }
          : v
      )
    )
  }

  async function saveVideo(item) {
    const response = await axios.post(
      `${BACKEND_URL}/api/food/save`,
      { foodId: item._id },
      { withCredentials: true }
    )

    setVideos(prev =>
      prev.map(v =>
        v._id === item._id
          ? {
              ...v,
              savesCount: response.data.save
                ? v.savesCount + 1
                : Math.max(0, v.savesCount - 1)
            }
          : v
      )
    )
  }

  return (
    <div className="home-page">
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        emptyMessage="No videos available."
      />
      <BottomNav />
    </div>
  )
}

export default Home
