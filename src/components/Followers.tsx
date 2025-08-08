import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGithubData } from "@/server/getData";
import UserCard from "./UserCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

interface FollowersProps {
  searchQuery: string;
}

export default function Followers({ searchQuery }: FollowersProps) {
  const {
    data: followersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData", "followers"],
    queryFn: () => getGithubData("followers"),
  });

  if (isLoading) return <LoadingState />;
  if (error) return <div>Error loading followers</div>;

  const filteredFollowers =
    followersData?.filter(
      (user: any) =>
        user.login?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (filteredFollowers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {filteredFollowers.map((user: any) => (
        <UserCard key={user.id} user={user} type="follower" />
      ))}
    </div>
  );
}
