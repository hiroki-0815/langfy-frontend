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

const MomentsPage: React.FC = () => {
  const { getAllPostsRequest } = useGetAllPosts();
  const { createPostRequest } = useCreatePost();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAllPostsRequest();
      setPosts(fetchedPosts);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [getAllPostsRequest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPostRequest(content);
      toast.success("Post created successfully!");
      setContent("");
      setDialogOpen(false);
      fetchPosts();
    } catch (err: any) {
      setError(err.message || "Failed to create post");
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container min-h-[1000px] mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Moments</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>

      {/* Floating SquarePen icon triggers the dialog */}
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
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setContent("");
                  setDialogOpen(false); // Close the dialog on Cancel
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
