import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import BottomNav from '../../components/BottomNav'

const Saved = () => {
  const [videos, setVideos] = useState([])

  const BACKEND_URL =
    import.meta.env.VITE_API_BASE ||
    "https://snackogram-backend.onrender.com"

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/food/save`, { withCredentials: true })
      .then(response => {
        console.log("📥 Saved Foods from backend:", response.data)

        const savedFoods =
          response.data.saved?.map(item => ({
            _id: item._id,
            video: item.video,
            description: item.description,
            likeCount: item.likeCount,
            savesCount: item.savesCount,
            commentsCount: item.commentsCount,
            foodPartner: item.foodPartner,
          })) || []

        setVideos(savedFoods)
      })
      .catch(err =>
        console.error("❌ Error fetching saved foods:", err)
      )
  }, [])

  const removeSaved = async (item) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      )

      // remove from UI immediately
      setVideos(prev => prev.filter(v => v._id !== item._id))
    } catch (error) {
      console.error("❌ Error unsaving food:", error)
    }
  }

  return (
    <>
      <ReelFeed
        items={videos}
        onSave={removeSaved}
        emptyMessage="No saved videos yet."
      />
      <BottomNav />
    </>
  )
}

export default Saved
