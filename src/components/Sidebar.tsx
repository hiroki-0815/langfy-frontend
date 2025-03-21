import { PhoneIcon, Users } from "lucide-react";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { useAppDispatch } from "@/redux-elements/hooks";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import updateCallStatus, {
  setCallDescription,
} from "@/redux-elements/actions/updateCallStatus";
import { User } from "@/model/user";

type Props = {
  users?: User[];
  onUserSelect: (userId: string) => void;
  selectedUserId?: string;
};

const Sidebar = ({ users, onUserSelect, selectedUserId }: Props) => {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();
  const [isOfferSet, setIsOfferSet] = useState<boolean>(false);
  const roomId = uuidv4();
  const navigate = useNavigate();
  const [callerId, setCallerId] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("newOfferAwaiting", (offerData) => {
      console.log("📩 Received newOfferAwaiting:", offerData);

      if (offerData?.offer) {
        console.log("🟢 Storing offer in Redux (callee):", offerData.offer);
        dispatch(setCallDescription(offerData.offer));
        setIsOfferSet(true);
        dispatch(updateCallStatus("callerId", offerData.callerId));
        dispatch(updateCallStatus("receiverId", offerData.receiverId));
      } else {
        console.warn("⚠️ Received an invalid offer:", offerData);
      }
      if (offerData?.callerId) {
        setCallerId(offerData?.callerId);
        dispatch(updateCallStatus("callerId", offerData.callerId));
        dispatch(updateCallStatus("offerId", offerData.offerId));
        console.log("📞 Incoming call from:", offerData.callerId);
      } else {
        console.warn("⚠️ Received an invalid offer:", offerData);
      }
    });

    return () => {
      socket.off("newOfferAwaiting");
    };
  }, [socket, dispatch]);

  const joinCall = () => {
    navigate(`/join-video-pro/${roomId}?callerId=${callerId}`);
  };

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
          <div
            key={user._id}
            className={`w-full p-3 flex items-center gap-3 border-b border-s-200 hover:bg-base-300 transition-colors ${
              selectedUserId === user._id ? "bg-slate-100" : ""
            }`}
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
              {isOfferSet && callerId === user._id && (
                <div
                  onClick={joinCall}
                  className="absolute -top-4 -right-4 bg-green-500 text-white p-2 rounded-full shadow-lg cursor-pointer animate-ringing"
                  aria-label="Join Call"
                  title="Join Call"
                >
                  <PhoneIcon size={16} />
                </div>
              )}
            </div>

            <div className="text-left min-w-0">
              <div className="font-medium truncate hidden md:block">
                {user.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
