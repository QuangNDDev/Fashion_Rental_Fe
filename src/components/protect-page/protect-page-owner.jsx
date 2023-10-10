import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function PrivateRouteOwner() {
  const isAuthen = true;
  let navigate = useNavigate();

  useEffect(() => {
    const account = localStorage.getItem("roleId");
    if (account == 3) {
    } else {
      navigate("/admin/login");
    }
  });

  if (isAuthen) {
    return <Outlet />;
  }

  return <div>PrivateRoute</div>;
}

export default PrivateRouteOwner;
