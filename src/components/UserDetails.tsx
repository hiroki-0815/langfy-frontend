import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserCard from "./UserCard";
import { User } from "@/model/types";

type UserDetailsDialogProps = {
  user: User;
};

const UserDetailsDialog = ({ user }: UserDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <UserCard
            name={user.name}
            gender={user.gender}
            age={user.age}
            nativeLanguage={user.nativeLanguage}
            countryOrigin={user.originCountry}
            selfIntroduction={user.selfIntroduction}
            imageUrl={user.imageUrl}
            motivation={user.motivation}
          />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About {user.name}</DialogTitle>
          <DialogDescription>
            Detailed information about this user.
          </DialogDescription>
        </DialogHeader>
        <div className="text-center">
          <img
            src={user.imageUrl}
            alt={`${user.name}'s pic`}
            className="w-24 h-24 rounded-full object-cover mx-auto outline outline-1 outline-gray-300"
          />
          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-sm text-gray-600">
            {user.gender === "male" ? "Male" : "Female"} | {user.age} years old
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Native Language: {user.nativeLanguage}
          </p>
          <p className="text-sm text-gray-600">From: {user.originCountry}</p>
          <p className="text-sm text-gray-600">Motivation: {user.motivation}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Self-Introduction</h3>
          <p className="text-gray-700 mt-2">
            {user.selfIntroduction || "No self-introduction provided."}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
