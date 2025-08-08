import React from "react";
import { Users } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No users found</h3>
      <p className="text-slate-600 dark:text-slate-400">Try adjusting your search or filters.</p>
    </div>
  );
}
