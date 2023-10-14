import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function PrivateRouteProductOwner() {
  const isAuthen = true;
  // let [isLoad, setIsLoad] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("roleId");
    if (account != 2) {
      navigate("/login");
    }
  });

  if (isAuthen) {
    return <Outlet />;
  }

  return <div>PrivateRoute</div>;
}

export default PrivateRouteProductOwner;