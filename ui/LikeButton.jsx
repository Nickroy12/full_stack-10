'use client'

import { likeCount } from '@/lib/action/status'
import React, { useState } from 'react'


const LikeButton = ({ recipeId, initialLikes, userId, initialHasLiked }) => {
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(initialHasLiked)

  const handleLike = async () => {
    if (!userId) {
      alert("Please log in to like this recipe!")
      return
    }

    // API কল
    await likeCount(recipeId, userId)

   
    setHasLiked(!hasLiked)
    setLikes(prev => hasLiked ? prev - 1 : prev + 1)
  }

  return (
    <button 
      onClick={handleLike}
      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm ${
        hasLiked 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'bg-green-50 hover:bg-green-100 dark:bg-green-950/40 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400'
      }`}
      title={hasLiked ? "Unlike this recipe" : "Like this recipe"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill={hasLiked ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="w-5 h-5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M14.25 9h2.25M5.904 18.5c.083.205.173.405.27.601.149.306.156.67.045 1.01a3.959 3.959 0 0 1-1.84 2.17c-.362.187-.74.341-1.129.46a.75.75 0 0 1-.965-.515 21.954 21.954 0 0 1-.316-6.304c.093-.377.41-.664.8-.696a3.978 3.978 0 0 1 3.129 1.258" />
      </svg>
      {hasLiked ? 'Liked' : 'Like'} ({likes})
    </button>
  )
}

export default LikeButton