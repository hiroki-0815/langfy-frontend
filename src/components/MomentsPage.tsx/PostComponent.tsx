import React from "react";
import { Post } from "@/model/post"; // Adjust the path if needed
import { cn, formatTime, timeAgo } from "@/utilities/timeFmt";
import { ArrowLeftRight, Heart, MessageSquare } from "lucide-react";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  return (
    <div
      className={cn(
        "border border-gray-300 rounded-md p-4 space-y-3 w-full max-w-2xl"
      )}
    >
      <div className="flex flex-row justify-between items-center space-x-3">
        <div className="flex gap-2">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-800">{post.name}</span>
            <span className="text-[10px] text-gray-700 flex items-center">
              {post.nativeLanguage} <ArrowLeftRight size={14} />{" "}
              {post.learningLanguage}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-xs text-gray-500">
            {timeAgo(post.createdAt)} <span className="mx-1">•</span>{" "}
            {formatTime(post.createdAt)}
          </div>
        </div>
      </div>

      <div className="text-gray-800 leading-relaxed">{post.content}</div>

      <div className="flex items-center space-x-4 text-gray-600 text-sm">
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>{post.likesCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4" />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
