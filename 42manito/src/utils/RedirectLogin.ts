import { NextRouter } from "next/router";

const redirectToLogin = (router: NextRouter): Promise<boolean> => {
  return router.push("/login");
};

export default redirectToLogin;
