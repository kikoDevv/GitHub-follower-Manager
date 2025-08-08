"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Github, Users, TrendingUp, Shield, Zap, BarChart3 } from "lucide-react";
import { useToken } from "@/contexts/TokenContext";

export default function Home() {
  const [tokenInput, setTokenInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useToken();
  const router = useRouter();

  const handleGetData = async () => {
    if (!tokenInput.trim()) {
      alert("Please enter your GitHub Personal Access Token");
      return;
    }

    setIsLoading(true);
    try {
      {
        /*--------- Test the token first ----------*/
      }
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${tokenInput.trim()}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid token or API error");
      }

      {
        /*--------- If successful, save token and navigate to dashboard ----------*/
      }
      setToken(tokenInput.trim());
      router.push("/dashboard");
    } catch (error) {
      alert("Invalid GitHub token. Please check your token and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/*--------- header ----------*/}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Github className="h-8 w-8 text-slate-900 dark:text-white" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">FollowerManager</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Features
              </a>
              <a
                href="#about"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                About
              </a>
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
                Get Started
              </button>
            </nav>
          </div>
        </div>
      </header>
      <section className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-white dark:bg-slate-800 p-4 rounded-full shadow-xl">
                  <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Manage Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Followers{" "}
              </span>
              Instantly
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10">
              Discover who follows you back and who doesn't. Easily manage your GitHub connections with one-click follow
              and unfollow actions. Take control of your follower relationships.
            </p>

            <div className="flex flex-col gap-6 justify-center items-center max-w-md mx-auto">
              {/*--------- input feild ----------*/}
              <div className="w-full">
                <label
                  htmlFor="github-token"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  id="github-token"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  We need your token to access GitHub API. Your token is stored securely in your browser session only.
                </p>
              </div>

              {/*--------- buttons ----------*/}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={handleGetData}
                  disabled={isLoading}
                  className="flex-1 sm:flex-initial bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                  {isLoading ? "Validating Token..." : "Get The Data"}
                </button>
                <button className="flex-1 sm:flex-initial border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  How To
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*--------- background ----------*/}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/*--------- cards section ----------*/}
      <section id="features" className="py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Follower Management Made Simple
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to understand and manage your GitHub follower relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/*--------- Mutual follow detection card ----------*/}
            <div className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Mutual Follow Detection</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Instantly see who follows you back and who doesn't. Get a clear overview of your mutual connections and
                one-way relationships.
              </p>
            </div>

            {/*--------- One-Click action card ----------*/}
            <div className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">One-Click Actions</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Follow or unfollow users with a single click. Bulk actions available for managing multiple connections
                efficiently.
              </p>
            </div>

            {/*--------- safe & realtime card ----------*/}
            <div className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Safe & Real-time</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Secure GitHub API integration with real-time synchronization. Your data stays protected while getting
                instant updates on follower changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*--------- my work banner ----------*/}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">See More of My Work</h2>
            <p className="text-xl mb-8 opacity-90">
              Check out my iOS budgeting app, movie scout website, and Wordle game. I love building tools that make life
              easier and more fun!
            </p>
            <a
              href="https://github.com/kikoDevv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors">
              View My GitHub
            </a>
          </div>
        </div>
      </section>

      {/*--------- Footer ----------*/}
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Github className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-600 dark:text-slate-400">
                © 2025 FollowerManager. Built for developers, by developers.
              </span>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://apps.apple.com/se/app/easybudget/id6446150580?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                EasyBudget iOS
              </a>
              <a
                href="https://movie-scout-rho.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                MovieScout
              </a>
              <a
                href="https://wordle-gpt.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Wordle GPT
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
