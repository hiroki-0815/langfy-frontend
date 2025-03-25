import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "@/Loading/Loading";
import { Post } from "@/model/post";
import PostComponent from "@/components/MomentsPage.tsx/PostComponent";
import { useGetPost } from "@/api/PostApi";
import { useCreateComment, useGetComments } from "@/api/CommentApi";
import CommentComponent from "@/components/CommentComponent";
import { toast } from "sonner";
import { Comment } from "@/model/comments";

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");

  const { getPostRequest } = useGetPost();
  const { getCommentsRequest } = useGetComments();
  const { createCommentRequest, loading: createCommentLoading } =
    useCreateComment();

  useEffect(() => {
    const fetchData = async () => {
      if (!postId) return;
      try {
        const fetchedPost = await getPostRequest(postId);
        setPost(fetchedPost);

        const fetchedCommentsArray = await getCommentsRequest(postId);
        setComments(fetchedCommentsArray);
        setComments(fetchedCommentsArray);
      } catch (err: any) {
        setError(err.message || "Failed to fetch post or comments");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId, getPostRequest, getCommentsRequest]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId) return;
    try {
      const newComment = await createCommentRequest(postId, commentText);

      setComments((prev) => [newComment, ...prev]);

      setPost((prevPost) => {
        if (!prevPost) return null;
        if (typeof newComment.commentsCount === "number") {
          return {
            ...prevPost,
            commentsCount: newComment.commentsCount,
          };
        }
        return prevPost;
      });

      setCommentText("");
      toast.success("Comment added successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to add comment");
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!post) return <div className="text-center">Post not found.</div>;

  return (
    <div className="container min-h-screen mx-auto p-4">
      <PostComponent post={post} />
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Write your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={createCommentLoading}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {createCommentLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
        {comments.length ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostPage;
