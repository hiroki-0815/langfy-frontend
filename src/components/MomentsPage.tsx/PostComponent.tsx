import React from "react";
import { Post } from "@/model/post";
import { cn, formatTime, timeAgo } from "@/utilities/timeFmt";
import { ArrowLeftRight, Heart, MessageSquare } from "lucide-react";

interface PostProps {
  post: Post;
}

const PostComponent: React.FC<PostProps> = ({ post }) => {
  return (
    <div
      className={cn(
        "relative bg-white shadow rounded-md p-4 w-full max-w-2xl mx-auto mb-4"
      )}
    >
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
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4" />
          <span>{post.likesCount}</span>
        </div>
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

export default PostComponent;
