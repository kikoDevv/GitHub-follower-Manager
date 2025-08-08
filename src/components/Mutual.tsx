import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGithubData } from "@/server/getData";
import UserCard from "./UserCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

interface MutualProps {
  searchQuery: string;
}

export default function Mutual({ searchQuery }: MutualProps) {
  const { data: followersData, isLoading: followersLoading } = useQuery({
    queryKey: ["userData", "followers"],
    queryFn: () => getGithubData("followers"),
  });

  const { data: followingData, isLoading: followingLoading } = useQuery({
    queryKey: ["userData", "following"],
    queryFn: () => getGithubData("following"),
  });

  const isLoading = followersLoading || followingLoading;

  if (isLoading) return <LoadingState />;

  /*--------- Find mutual followers (people you follow who also follow you) ----------*/
  const mutualUsers =
    followingData?.filter((followingUser: any) =>
      followersData?.some((follower: any) => follower.id === followingUser.id)
    ) || [];

  const filteredMutual = mutualUsers.filter(
    (user: any) =>
      user.login?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredMutual.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {filteredMutual.map((user: any) => (
        <UserCard key={user.id} user={user} type="mutual" />
      ))}
    </div>
  );
}
