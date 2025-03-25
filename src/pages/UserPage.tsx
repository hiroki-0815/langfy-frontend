import React, { useEffect, useState } from "react";
import Loading from "@/Loading/Loading";
import PostComponentForUserPage from "@/components/MomentsPage.tsx/PostComponentForUserPage";
import { useParams } from "react-router-dom";
import { useGetUserByQuery } from "@/api/MyUserApi";
import { useGetUserPosts } from "@/api/PostApi";
import { Post } from "@/model/post";

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const safeUserId = userId || "";

  const { user, isLoading: userLoading } = useGetUserByQuery(safeUserId);
  const { getUserPostsRequest, loading: postsLoading } =
    useGetUserPosts(safeUserId);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postsError, setPostsError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const data = await getUserPostsRequest();
        setUserPosts(data);
      } catch (error: any) {
        setPostsError(error);
      }
    })();
  }, [userId, getUserPostsRequest]);

  if (!userId) {
    return <div className="max-w-3xl mx-auto py-2 px-4">No userId in URL</div>;
  }

  if (userLoading || postsLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-2 px-4">
        <p className="text-center text-gray-500">
          No user information available.
        </p>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="max-w-3xl mx-auto py-2 px-4">
        <p className="text-center text-red-500">{postsError.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-4 py-2 px-4 min-h-screen">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">User Profile</h1>
      </div>
      <div className="bg-white shadow rounded-md p-4">
        {user.imageUrl && (
          <div className="flex justify-center mb-3">
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {user.nativeLanguage && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
              話せる言語: {user.nativeLanguage}
            </span>
          )}
          {user.learningLanguage && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-600">
              学習言語: {user.learningLanguage}
            </span>
          )}
          {user.country && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-600">
              居住地: {user.country}
            </span>
          )}
          {user.motivation && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-600">
              学習目的: {user.motivation}
            </span>
          )}
          {user.originCountry && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
              出身: {user.originCountry}
            </span>
          )}
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="text-sm text-gray-900">{user.name}</p>
          </div>
          {user.gender && (
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="text-sm text-gray-900">{user.gender}</p>
            </div>
          )}
          {user.city && (
            <div>
              <p className="text-xs text-gray-500">City</p>
              <p className="text-sm text-gray-900">{user.city}</p>
            </div>
          )}
          {user.originCountry && (
            <div>
              <p className="text-xs text-gray-500">Origin Country</p>
              <p className="text-sm text-gray-900">{user.originCountry}</p>
            </div>
          )}
          {user.age !== undefined && (
            <div>
              <p className="text-xs text-gray-500">Age</p>
              <p className="text-sm text-gray-900">{user.age}</p>
            </div>
          )}
          {user.fluencyLevel && (
            <div>
              <p className="text-xs text-gray-500">Fluency Level</p>
              <p className="text-sm text-gray-900">{user.fluencyLevel}</p>
            </div>
          )}
          {user.selfIntroduction && (
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500">Self Introduction</p>
              <p className="text-sm text-gray-900">{user.selfIntroduction}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">User Posts</h2>
        {userPosts && userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post: Post) => (
              <PostComponentForUserPage key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
