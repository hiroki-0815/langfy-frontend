import React, { useState } from "react";
import { Post } from "@/model/post";
import { cn, formatTime, timeAgo } from "@/utilities/timeFmt";
import { ArrowLeftRight, Heart, MessageSquare, Trash } from "lucide-react";
import { useLikePost, useUnlikePost, useDeletePost } from "@/api/PostApi";

interface PostProps {
  post: Post & { isLikedByCurrentUser?: boolean };
  onDelete?: (postId: string) => void; // optional callback to remove post from parent's state
}

const PostComponentForUserPage: React.FC<PostProps> = ({ post, onDelete }) => {
  const [liked, setLiked] = useState<boolean>(
    post.isLikedByCurrentUser || false
  );
  const [likesCount, setLikesCount] = useState<number>(post.likesCount);

  const { likePostRequest } = useLikePost();
  const { unlikePostRequest } = useUnlikePost();
  const { deletePostRequest } = useDeletePost();

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        const updatedPost = await unlikePostRequest(post.id);
        setLiked(false);
        setLikesCount(updatedPost.likesCount);
      } else {
        const updatedPost = await likePostRequest(post.id);
        setLiked(true);
        setLikesCount(updatedPost.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePostRequest(post.id);
        onDelete && onDelete(post.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div
      className={cn(
        "relative bg-white shadow rounded-md p-4 w-full max-w-2xl mx-auto mb-4"
      )}
    >
      {/* Delete Button in Top-Right Corner */}
      <div className="absolute top-2 right-2">
        <button
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-500 focus:outline-none"
          title="Delete Post"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start space-x-3">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-900">
            {post.name}
          </span>
          <div className="text-sm text-gray-500 flex items-center space-x-1">
            <span>{post.nativeLanguage}</span>
            <ArrowLeftRight size={14} className="text-gray-400" />
            <span>{post.learningLanguage}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-gray-800 leading-relaxed break-words whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="mt-4 flex items-center space-x-4 text-gray-600 text-sm">
        {/* Clickable heart icon */}
        <button
          onClick={handleLikeToggle}
          className="flex items-center space-x-1 focus:outline-none"
        >
          <Heart
            className={`w-4 h-4 ${liked ? "text-red-500" : "text-gray-600"}`}
          />
          <span>{likesCount}</span>
        </button>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4" />
          <span>0</span>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        {timeAgo(post.createdAt)} <span className="mx-1">•</span>{" "}
        {formatTime(post.createdAt)}
      </div>
    </div>
  );
};

export default PostComponentForUserPage;
