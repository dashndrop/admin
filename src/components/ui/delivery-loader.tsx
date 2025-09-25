import React from "react";

export const DeliveryLoader: React.FC<{ label?: string }>= ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground select-none">
      <div className="relative h-16 w-24">
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gray-300 animate-road" />
        </div>
        <div className="absolute left-0 bottom-2 animate-ride">
          <div className="relative">
            <div className="h-6 w-8 bg-[#003366] rounded-md" />
            <div className="absolute -bottom-1 -left-1 h-3 w-3 rounded-full bg-gray-800 animate-wheel" />
            <div className="absolute -bottom-1 left-6 h-3 w-3 rounded-full bg-gray-800 animate-wheel" />
            <div className="absolute -top-2 left-1 h-2 w-2 rounded-sm bg-[#F28C28]" />
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm font-medium">{label}</div>
    </div>
  );
};

export default DeliveryLoader;


