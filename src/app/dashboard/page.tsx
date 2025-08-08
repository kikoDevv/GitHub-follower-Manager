"use client";
import React, { useState } from "react";
import { Github, Users, UserPlus, UserMinus, ArrowLeft, Search, Filter, RefreshCw, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getGithubData } from "@/server/getData";
import Followers from "@/components/Followers";
import Following from "@/components/Following";
import Mutual from "@/components/Mutual";
import DontFollowBack from "@/components/DontFollowBack";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("followers");
  const [searchQuery, setSearchQuery] = useState("");

  /*--------- query for getting counts ----------*/
  const { data: followersData } = useQuery({
    queryKey: ["userData", "followers"],
    queryFn: () => getGithubData("followers"),
  });

  const { data: followingData } = useQuery({
    queryKey: ["userData", "following"],
    queryFn: () => getGithubData("following"),
  });

  /*--------- Calculate counts ----------*/
  const followersCount = followersData?.length || 0;
  const followingCount = followingData?.length || 0;

  /*--------- Calculate mutual (people you follow who also follow you) ----------*/
  const mutualCount =
    followingData?.filter((followingUser: any) =>
      followersData?.some((follower: any) => follower.id === followingUser.id)
    ).length || 0;

  /*--------- Calculate non-followers (people you follow but who don't follow you back) ----------*/
  const nonFollowersCount =
    followingData?.filter(
      (followingUser: any) => !followersData?.some((follower: any) => follower.id === followingUser.id)
    ).length || 0;

  const renderActiveTab = () => {
    switch (activeTab) {
      case "followers":
        return <Followers searchQuery={searchQuery} />;
      case "following":
        return <Following searchQuery={searchQuery} />;
      case "mutual":
        return <Mutual searchQuery={searchQuery} />;
      case "non-followers":
        return <DontFollowBack searchQuery={searchQuery} />;
      default:
        return <Followers searchQuery={searchQuery} />;
    }
  };

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
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{followersCount}</p>
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
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{followingCount}</p>
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
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{mutualCount}</p>
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
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{nonFollowersCount}</p>
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
                { key: "followers", label: "Followers", count: followersCount },
                { key: "following", label: "Following", count: followingCount },
                { key: "mutual", label: "Mutual", count: mutualCount },
                { key: "non-followers", label: "Don't Follow Back", count: nonFollowersCount },
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
        {renderActiveTab()}
      </div>
    </div>
  );
}
