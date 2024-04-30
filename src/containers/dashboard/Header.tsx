import React, { useEffect, useState } from "react";
import NotificationIcon from "../../components/common/NotificationIcon";
import NotificationSidebar from "../../components/common/NotificationSidebar";
import SearchInput from "../../components/FormInputs/SearchInput";
import { Link } from "react-router-dom";

const _extractInitials = (val: string) => {
  const _first = val.split(" ")[0].slice(0, 1);
  const _second = val?.split(" ")[1]?.slice(0, 1);
  return `${_first.toLocaleUpperCase()}${_second && _second.toLocaleUpperCase() }`;
};

const DashboardHeader = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  

  const _openNav = () => {
    setIsNotificationOpen(true);
  };
  return (
    <header className="h-20 w-full sticky top-0 bg-white shadow-sm z-50 overflow-hidden">
      <div className="px-6 h-full flex justify-between items-center">
        <div>
         
        </div>
        <div className="flex items-center">


          <div className="flex items-center px-6">
           
            
            <Link to="/products">
              <span className="w-8 h-8 bg-[#000000] text-white text-xl font-medium rounded-full flex items-center justify-center">
                {_extractInitials(`${"Demilade"} `)}
              </span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
