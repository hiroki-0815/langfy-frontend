import React, { useEffect, useState } from "react";
import { Post } from "@/model/post";
import { useCreatePost, useGetAllPosts } from "@/api/PostApi";
import PostComponent from "@/components/MomentsPage.tsx/PostComponent";
import { SquarePen } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Loading from "@/Loading/Loading";
import PostSkeleton from "@/skeletons/PostSkeleton";

const MomentsPage: React.FC = () => {
  const { getAllPostsRequest, loading: getUserLoading } = useGetAllPosts();
  const { createPostRequest, loading: createPostLoading } = useCreatePost();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPostsRequest();
        setPosts(fetchedPosts);
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts");
      }
    };
    fetchPosts();
  }, [getAllPostsRequest]);

  if (getUserLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim().length >= 200) {
      setErrorMessage("Content must be less than 200 characters.");
      return;
    }

    try {
      await createPostRequest(content);
      toast.success("Post created successfully!");
      setContent("");
      setDialogOpen(false);
      setErrorMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to create post");
      toast.error(err.message || "Failed to create post");
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue);

    if (newValue.trim().length < 200) {
      setErrorMessage("");
    }
  };

  return (
    <div className="container min-h-[1000px] mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Moments</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-4">
        {createPostLoading && <PostSkeleton />}
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-20 right-20 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg">
            <SquarePen className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="How are you feeling..."
              value={content}
              onChange={handleContentChange}
              required
            />
            <div className="text-sm flex justify-between text-gray-500">
              <span>{content.trim().length}/200</span>
              {errorMessage && (
                <span className="text-red-500 ml-2">{errorMessage}</span>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setContent("");
                  setDialogOpen(false);
                  setErrorMessage("");
                }}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Post
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MomentsPage;
