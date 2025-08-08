import React from "react";
import { RefreshCw } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="text-center py-12">
      <RefreshCw className="w-16 h-16 text-slate-400 mx-auto mb-4 animate-spin" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Loading...</h3>
      <p className="text-slate-600 dark:text-slate-400">Fetching data from GitHub</p>
    </div>
  );
}
