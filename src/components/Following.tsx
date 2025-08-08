import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "@/lib/api";
import { useToken } from "@/contexts/TokenContext";
import UserCard from "./UserCard";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";

interface FollowingProps {
  searchQuery: string;
}

export default function Following({ searchQuery }: FollowingProps) {
  const { token } = useToken();

  const {
    data: followingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData", "following"],
    queryFn: () => fetchUserData("following", token!),
    enabled: !!token,
  });

  if (isLoading) return <LoadingState />;
  if (error) return <div>Error loading following</div>;

  const filteredFollowing =
    followingData?.filter(
      (user: any) =>
        user.login?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  if (filteredFollowing.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {filteredFollowing.map((user: any) => (
        <UserCard key={user.id} user={user} type="following" />
      ))}
    </div>
  );
}
