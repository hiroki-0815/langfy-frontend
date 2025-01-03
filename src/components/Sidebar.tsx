import { User } from "@/model/types";
import { Users } from "lucide-react";

type Props = {
  users?: User[];
  onUserSelect: (userId: string) => void;
};

const Sidebar = ({ users, onUserSelect }: Props) => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-blue-400 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users?.map((user: User) => (
          <button
            className={`w-full p-3 flex items-center gap-3 border-b border-s-200 hover:bg-base-300 transition-colors`}
            key={user._id}
            onClick={() => onUserSelect(user._id)}
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
