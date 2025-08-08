import React from "react";
import { Github, UserPlus, UserMinus } from "lucide-react";

interface UserCardProps {
  user: {
    id: number;
    login?: string;
    username?: string;
    name?: string;
    avatar_url?: string;
    avatar?: string;
  };
  type: "follower" | "following" | "mutual" | "nonFollower";
}

export default function UserCard({ user, type }: UserCardProps) {
  const handleFollow = (userId: number) => {
    console.log("Following user:", userId);
  };

  const handleUnfollow = (userId: number) => {
    console.log("Unfollowing user:", userId);
  };

  const username = user.login || user.username || "";
  const displayName = user.name || username;
  const avatarUrl = user.avatar_url || user.avatar || "https://github.com/github.png";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-600"
          />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{displayName}</h3>
            <p className="text-slate-600 dark:text-slate-400">@{username}</p>
            <div className="flex items-center space-x-2 mt-1">
              {type === "follower" && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                  Follows You
                </span>
              )}
              {(type === "following" || type === "mutual") && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                  Following
                </span>
              )}
              {type === "mutual" && (
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded-full">
                  Mutual
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {type === "following" || type === "mutual" ? (
            <button
              onClick={() => handleUnfollow(user.id)}
              className="flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
              <UserMinus className="w-4 h-4" />
              <span>Unfollow</span>
            </button>
          ) : (
            <button
              onClick={() => handleFollow(user.id)}
              className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
              <UserPlus className="w-4 h-4" />
              <span>Follow</span>
            </button>
          )}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <Github className="w-4 h-4" />
            <span>Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}
