"use client";
import React, { useState, useEffect } from "react";
import { Github, Users, UserPlus, UserMinus, ArrowLeft, Search, Filter, RefreshCw, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchUserData } from "@/lib/api";
import { useToken } from "@/contexts/TokenContext";
import Followers from "@/components/Followers";
import Following from "@/components/Following";
import Mutual from "@/components/Mutual";
import DontFollowBack from "@/components/DontFollowBack";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("followers");
  const [searchQuery, setSearchQuery] = useState("");
  const { token, clearToken } = useToken();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const handleBackToHome = () => {
    clearToken();
    router.push("/");
  };

  /*--------- query for getting counts ----------*/
  const { data: followersData } = useQuery({
    queryKey: ["userData", "followers"],
    queryFn: () => fetchUserData("followers", token!),
    enabled: !!token,
  });

  const { data: followingData } = useQuery({
    queryKey: ["userData", "following"],
    queryFn: () => fetchUserData("following", token!),
    enabled: !!token,
  });

  if (!token) {
    return null; // Will redirect to home
  }

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
              <button
                onClick={handleBackToHome}
                className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-2">
                <Github className="h-8 w-8 text-slate-900 dark:text-white" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">Follower Dashboard</span>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Data</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*--------- Cards as Tabs ----------*/}
        <section className="bg-gray-700 p-2 rounded-2xl mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setActiveTab("followers")}
              className={`group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-6 border transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                activeTab === "followers"
                  ? "border-blue-500 shadow-xl shadow-blue-500/10 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-800"
                  : "border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:border-blue-300 dark:hover:border-blue-600"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "followers"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}>
                    Followers
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{followersCount}</p>
                </div>
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeTab === "followers"
                      ? "bg-blue-100 dark:bg-blue-900/40 shadow-lg"
                      : "bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30"
                  }`}>
                  <Users
                    className={`w-7 h-7 transition-colors ${
                      activeTab === "followers"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-blue-500 dark:text-blue-400"
                    }`}
                  />
                </div>
              </div>
              {activeTab === "followers" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("following")}
              className={`group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-6 border transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                activeTab === "following"
                  ? "border-green-500 shadow-xl shadow-green-500/10 bg-gradient-to-br from-green-50 to-white dark:from-green-950/30 dark:to-slate-800"
                  : "border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:border-green-300 dark:hover:border-green-600"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "following"
                        ? "text-green-600 dark:text-green-400"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}>
                    Following
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{followingCount}</p>
                </div>
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeTab === "following"
                      ? "bg-green-100 dark:bg-green-900/40 shadow-lg"
                      : "bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100 dark:group-hover:bg-green-900/30"
                  }`}>
                  <UserPlus
                    className={`w-7 h-7 transition-colors ${
                      activeTab === "following"
                        ? "text-green-600 dark:text-green-400"
                        : "text-green-500 dark:text-green-400"
                    }`}
                  />
                </div>
              </div>
              {activeTab === "following" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-transparent pointer-events-none" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("mutual")}
              className={`group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-6 border transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                activeTab === "mutual"
                  ? "border-purple-500 shadow-xl shadow-purple-500/10 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/30 dark:to-slate-800"
                  : "border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:border-purple-300 dark:hover:border-purple-600"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "mutual"
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}>
                    Mutual
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{mutualCount}</p>
                </div>
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeTab === "mutual"
                      ? "bg-purple-100 dark:bg-purple-900/40 shadow-lg"
                      : "bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30"
                  }`}>
                  <Users
                    className={`w-7 h-7 transition-colors ${
                      activeTab === "mutual"
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-purple-500 dark:text-purple-400"
                    }`}
                  />
                </div>
              </div>
              {activeTab === "mutual" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-transparent pointer-events-none" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("non-followers")}
              className={`group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-6 border transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                activeTab === "non-followers"
                  ? "border-red-500 shadow-xl shadow-red-500/10 bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-slate-800"
                  : "border-slate-200/60 dark:border-slate-700/60 shadow-lg hover:border-red-300 dark:hover:border-red-600"
              }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium transition-colors ${
                      activeTab === "non-followers"
                        ? "text-red-600 dark:text-red-400"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}>
                    Don't Follow Back
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{nonFollowersCount}</p>
                </div>
                <div
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    activeTab === "non-followers"
                      ? "bg-red-100 dark:bg-red-900/40 shadow-lg"
                      : "bg-red-50 dark:bg-red-900/20 group-hover:bg-red-100 dark:group-hover:bg-red-900/30"
                  }`}>
                  <UserMinus
                    className={`w-7 h-7 transition-colors ${
                      activeTab === "non-followers"
                        ? "text-red-600 dark:text-red-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  />
                </div>
              </div>
              {activeTab === "non-followers" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />
              )}
            </button>
          </div>

          {/*--------- Modern Search Bar ----------*/}
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-6 backdrop-blur-sm">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm focus:shadow-md"
              />
            </div>
          </div>
        </section>
        {/*--------- User List ----------*/}
        {renderActiveTab()}
      </div>
    </div>
  );
}
