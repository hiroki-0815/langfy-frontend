import React from "react";
import { Comment } from "@/model/comments";
import { timeAgo } from "@/utilities/timeFmt";

interface CommentComponentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ comment }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm flex space-x-4">
      {comment.user.imageUrl && (
        <img
          src={comment.user.imageUrl}
          alt={comment.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">
            {comment.user.name}
          </span>
          <span className="text-xs text-gray-500">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-gray-800 mt-1">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentComponent;
