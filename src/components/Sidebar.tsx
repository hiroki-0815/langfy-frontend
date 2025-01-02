import { useGetChatUser } from "@/api/UseChatApi";
import { User } from "@/model/types";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { chatUser, isLoading: isUserLoading } = useGetChatUser();

  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    chatUser;
  }, [chatUser]);

  if (isUserLoading) {
    return <div>Loading ...</div>;
  }

  if (!chatUser || chatUser.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-blue-400 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {chatUser.map((user: User) => (
          <button
            className={`w-full p-3 flex items-center gap-3 border-b border-slate-200 hover:bg-base-300 transition-colors ${
              selectedUser === user._id ? "bg-slate-50" : "hover:bg-slate-100"
            }`}
            key={user._id}
            onClick={() => setSelectedUser(user._id)}
          >
            <div className="relative mx-auto lg:mx-0">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
              ) : (
                <Users className="size-12 text-gray-400" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
