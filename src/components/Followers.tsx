import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "@/lib/api";
import { useToken } from "@/contexts/TokenContext";
import UserCard from "./UserCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

interface FollowersProps {
  searchQuery: string;
}

export default function Followers({ searchQuery }: FollowersProps) {
  const { token } = useToken();

  const {
    data: followersData,
    isLoading: followersLoading,
    error: followersError,
  } = useQuery({
    queryKey: ["userData", "followers"],
    queryFn: () => fetchUserData("followers", token!),
    enabled: !!token,
  });

  const { data: followingData, isLoading: followingLoading } = useQuery({
    queryKey: ["userData", "following"],
    queryFn: () => fetchUserData("following", token!),
    enabled: !!token,
  });

  const isLoading = followersLoading || followingLoading;

  if (isLoading) return <LoadingState />;
  if (followersError) return <div>Error loading followers</div>;

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
    <div className="space-y-2">
      {filteredFollowers.map((user: any) => {
        /*--------- Check if you're already following this follower back ----------*/
        const isFollowingBack = followingData?.some((followingUser: any) => followingUser.id === user.id) || false;

        return <UserCard key={user.id} user={user} type="follower" isFollowingBack={isFollowingBack} />;
      })}
    </div>
  );
}
