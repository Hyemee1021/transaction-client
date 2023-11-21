import React, { useEffect, useState } from "react";
import { TopNav } from "../components/TopNav";
import { TransForm } from "../components/TransForm";
import { TransTable } from "../components/TransTable";
import { getTrans } from "../heper/axiosHelper";
import { CustomModal } from "../components/CustomModal";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const [transList, setTransList] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getAllTrans();
  }, []);

  const getAllTrans = async () => {
    const { status, transList } = await getTrans();

    status === "success" && setTransList(transList);
  };

  return (
    <div>
      {/* Navbar */}
      <TopNav />
      {/* form */}
      <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
        <TransForm getAllTrans={getAllTrans} />
      </CustomModal>

      {/* This will triger modal pop up */}
      <div className="text-end mt-5">
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add new transactions
        </Button>
      </div>
      {/* table */}

      <TransTable transList={transList} getAllTrans={getAllTrans} />
    </div>
  );
};
export default Dashboard;
