import { ReactNode } from "react";

export const IconButton = ({
  icon,
  onClick,
  isActive = false,
  tooltip,
}: {
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  tooltip?: string;
}) => {
  return (
    <button
      className={`p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-[#6965db] text-white shadow-lg shadow-[#6965db]/30"
          : "text-gray-400 hover:text-white hover:bg-white/10"
      }`}
      onClick={onClick}
      title={tooltip}
    >
      {icon}
    </button>
  );
};
