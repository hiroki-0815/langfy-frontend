// PostSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white shadow rounded-md p-4 w-full max-w-2xl mx-auto mb-4">
      <div className="flex items-start space-x-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>

      <div className="mt-4 flex items-center space-x-4 text-sm">
        <Skeleton className="h-4 w-6" />
        <Skeleton className="h-4 w-6" />
      </div>

      <div className="absolute bottom-2 right-2">
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};

export default PostSkeleton;
