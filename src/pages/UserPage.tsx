import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "@/Loading/Loading";
import { useGetMyUser } from "@/api/MyUserApi";
import { useGetSelfPosts } from "@/api/PostApi";
import { Post } from "@/model/post";
import PostComponentForUserPage from "@/components/MomentsPage.tsx/PostComponentForUserPage";

const UserPage: React.FC = () => {
  const { currentUser, isLoading } = useGetMyUser();
  const { getSelfPostsRequest, loading: selfPostsLoading } = useGetSelfPosts();
  const [selfPosts, setSelfPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSelfPosts = async () => {
      try {
        const posts = await getSelfPostsRequest();
        setSelfPosts(posts);
      } catch (err: any) {
        setError(err.message || "Failed to fetch self posts");
      }
    };
    fetchSelfPosts();
  }, [getSelfPostsRequest]);

  const handleDeletePost = (postId: string) => {
    setSelfPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <div className="max-w-3xl mx-auto py-2 px-4">
        <p className="text-center text-gray-500">
          No user information available.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-4 py-2 px-4 min-h-screen">
      {/* Header with Edit Profile */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">User Profile</h1>
        <Link
          to="/user-profile"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Edit Profile
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="bg-white shadow rounded-md p-4">
        {currentUser.imageUrl && (
          <div className="flex justify-center mb-3">
            <img
              src={currentUser.imageUrl}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}

        {/* Colorful Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {currentUser.nativeLanguage && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
              話せる言語: {currentUser.nativeLanguage}
            </span>
          )}
          {currentUser.learningLanguage && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600">
              学習言語: {currentUser.learningLanguage}
            </span>
          )}
          {currentUser.country && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-600">
              居住地: {currentUser.country}
            </span>
          )}
          {currentUser.motivation && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-600">
              学習目的: {currentUser.motivation}
            </span>
          )}
          {currentUser.originCountry && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
              出身: {currentUser.originCountry}
            </span>
          )}
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-sm text-gray-900">{currentUser.name}</p>
          </div>
          {currentUser.gender && (
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm text-gray-900">{currentUser.gender}</p>
            </div>
          )}
          {currentUser.city && (
            <div>
              <p className="text-xs text-gray-500">City</p>
              <p className="text-sm text-gray-900">{currentUser.city}</p>
            </div>
          )}
          {currentUser.originCountry && (
            <div>
              <p className="text-xs text-gray-500">Origin Country</p>
              <p className="text-sm text-gray-900">
                {currentUser.originCountry}
              </p>
            </div>
          )}
          {currentUser.age !== undefined && (
            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm text-gray-900">{currentUser.age}</p>
            </div>
          )}
          {currentUser.fluencyLevel && (
            <div>
              <p className="text-xs text-gray-500">Fluency Level</p>
              <p className="text-sm text-gray-900">
                {currentUser.fluencyLevel}
              </p>
            </div>
          )}
          {currentUser.selfIntroduction && (
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500">Self Introduction</p>
              <p className="text-sm text-gray-900">
                {currentUser.selfIntroduction}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">My Posts</h2>
        {selfPostsLoading ? (
          <Loading />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {selfPosts.map((post) => (
              <PostComponentForUserPage
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
