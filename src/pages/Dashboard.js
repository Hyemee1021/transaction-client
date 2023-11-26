import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { getTrans } from "../heper/axiosHelper";
import { TransForm } from "../components/TransForm";
import { TopNav } from "../components/TopNav";
import { TransTable } from "../components/TransTable";
import { CustomModal } from "../components/CustomModal";
import { FooterSection } from "../components/FooterSection";

const Dashboard = () => {
  const [transList, setTransList] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    getAllTrans();
  }, []);

  const getAllTrans = async () => {
    const { status, transList } = await getTrans();

    status === "success" && setTransList(transList);
  };

  return (
    <div className="">
      {/* navbar */}
      <TopNav />

      <Container fluid={true} style={{ width: "90%" }}>
        {/* form */}

        <CustomModal show={modalShow} onHide={() => setModalShow(false)}>
          <TransForm getAllTrans={getAllTrans} />
        </CustomModal>

        <div className="d-flex justify-content-end mt-5 gap-3">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Add New Transaction
          </Button>
        </div>

        {/* table */}
        <TransTable transList={transList} getAllTrans={getAllTrans} />
      </Container>

      {/* footer */}
      <FooterSection />
    </div>
  );
};

export default Dashboard;
