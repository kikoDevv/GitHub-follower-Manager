"use client";
import React, { useState } from "react";
import { Github, Users, UserPlus, UserMinus, ArrowLeft, Search, Filter, RefreshCw, X } from "lucide-react";
import { getMainUser } from "@/server/getUserInfo";
import { useQuery } from "@tanstack/react-query";


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("followers");
  const [searchQuery, setSearchQuery] = useState("");

  /*--------- query for get main user info ----------*/
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getMainUser,
  });

  console.log(userData);

  /*--------- example data ----------*/

  const mockUsers = [
    {
      id: 1,
      username: "kiko",
      name: "Nasrolla",
      avatar: "https://github.com/github.png",
      isFollowing: true,
      followsBack: true,
    },
    {
      id: 2,
      username: "Mbappe",
      name: "kylian mbappe",
      avatar: "https://github.com/github.png",
      isFollowing: true,
      followsBack: false,
    },
  ];

  const followers = mockUsers.filter((user) => user.followsBack);
  const following = mockUsers.filter((user) => user.isFollowing);
  const mutual = mockUsers.filter((user) => user.isFollowing && user.followsBack);
  const nonFollowers = mockUsers.filter((user) => user.isFollowing && !user.followsBack);

  const getCurrentList = () => {
    let list;
    switch (activeTab) {
      case "followers":
        list = followers;
        break;
      case "following":
        list = following;
        break;
      case "mutual":
        list = mutual;
        break;
      case "non-followers":
        list = nonFollowers;
        break;
      default:
        list = followers;
    }
    {
      /*--------- Filter by search query ----------*/
    }
    if (searchQuery) {
      list = list.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return list;
  };

  const handleFollow = (userId: number) => {
    console.log("Following user:", userId);
  };

  const handleUnfollow = (userId: number) => {
    console.log("Unfollowing user:", userId);
  };

  const UserCard = ({ user }: { user: any }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-600"
          />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-slate-600 dark:text-slate-400">@{user.username}</p>
            <div className="flex items-center space-x-2 mt-1">
              {user.followsBack && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                  Follows You
                </span>
              )}
              {user.isFollowing && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                  Following
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {user.isFollowing ? (
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
            href={`https://github.com/${user.username}`}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/*--------- Header ----------*/}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Github className="h-8 w-8 text-slate-900 dark:text-white" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">Follower Dashboard</span>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*--------- Stats Cards ----------*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Followers</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{followers.length}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Following</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{following.length}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <UserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Mutual</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{mutual.length}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Don't Follow Back</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{nonFollowers.length}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <UserMinus className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/*--------- Tabs and Controls ----------*/}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap">
              {[
                { key: "followers", label: "Followers", count: followers.length },
                { key: "following", label: "Following", count: following.length },
                { key: "mutual", label: "Mutual", count: mutual.length },
                { key: "non-followers", label: "Don't Follow Back", count: nonFollowers.length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}>
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/*--------- Search and Filter ----------*/}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/*--------- User List ----------*/}
        <div className="space-y-4">
          {getCurrentList().map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {/*--------- Empty State ----------*/}
        {getCurrentList().length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No users found</h3>
            <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
