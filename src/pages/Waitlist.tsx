import { useState } from "react";
import { WaitlistTable } from "@/components/waitlist/WaitlistTable";

export default function Waitlist() {
  const handleEntryUpdate = () => {
    // This can be used to trigger a refetch of the waitlist data if needed
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
              W
            </span>
            Waitlist Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor waitlist entries for early access
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <WaitlistTable onEntryUpdate={handleEntryUpdate} />
      </div>
    </div>
  );
}
