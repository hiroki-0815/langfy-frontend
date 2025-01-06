import { User } from "@/model/types";
import { Users } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  users?: User[];
  onUserSelect: (userId: string) => void;
  selectedUserId?: string;
};

const Sidebar = ({ users, onUserSelect, selectedUserId }: Props) => {
  return (
    <aside className="h-full w-20 md:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-white">
      <div className="w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <Separator />
      <div className="overflow-y-auto w-full py-3">
        {users?.map((user: User) => (
          <button
            className={`w-full p-3 flex items-center gap-3 border-b border-s-200 hover:bg-base-300 transition-colors ${
              selectedUserId === user._id ? "bg-slate-100" : ""
            }`}
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
