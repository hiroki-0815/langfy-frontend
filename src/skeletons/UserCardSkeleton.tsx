import { Skeleton } from "@/components/ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <div className="py-9 px-3 flex flex-col bg-white shadow rounded-lg border border-gray-200 max-w-[750px] overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Skeleton className="w-[50px] h-[50px] md:w-[80px] md:h-[80px] rounded-full" />
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="flex flex-wrap mt-4 text-sm text-gray-600 gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
