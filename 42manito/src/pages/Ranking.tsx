import Layout from "@/components/Layout";
import InfoAlert from "@/components/alert/InfoAlert";
import React, { useState } from "react";

const Ranking: React.FC = () => {
  const [isAlert, setIsAlert] = useState(true);

  const onCloseAlert = () => {
    setIsAlert(false);
    location.href = "/";
  };

  return (
    <>
      <InfoAlert
        isAlert={isAlert}
        close={onCloseAlert}
        msg={"기능구현중입니다."}
      />
      <Layout>
        <div className="app-container">랭킹</div>
      </Layout>
    </>
  );
};

export default Ranking;
