import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGithubData } from "@/server/getData";
import UserCard from "./UserCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

interface DontFollowBackProps {
  searchQuery: string;
}

export default function DontFollowBack({ searchQuery }: DontFollowBackProps) {
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

  /*--------- Find people you follow but who don't follow you back ----------*/

  const nonFollowersBack =
    followingData?.filter(
      (followingUser: any) => !followersData?.some((follower: any) => follower.id === followingUser.id)
    ) || [];

  const filteredNonFollowersBack = nonFollowersBack.filter(
    (user: any) =>
      user.login?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredNonFollowersBack.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {filteredNonFollowersBack.map((user: any) => (
        <UserCard key={user.id} user={user} type="nonFollower" />
      ))}
    </div>
  );
}
