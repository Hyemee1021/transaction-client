import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { deleteTasks } from "../heper/axiosHelper.js";
export const TransTable = ({ transList, getAllTrans }) => {
  const [idsToDelete, setIdsToDelete] = useState([]);

  const [resp, setResponse] = useState({});

  const handleOnAllCheck = (e) => {
    const { checked } = e.target;
    if (checked) {
      //add all ids checked
      //looping arrary of object
      //map is returned the same size of array
      const ids = transList.map(({ _id }) => _id);
      setIdsToDelete(ids);
    } else {
      setIdsToDelete([]);
    }
  };

  const handleOnChecked = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);

    if (checked) {
      //add
      setIdsToDelete([...idsToDelete, value]);
    } else {
      //remove
      //get
      setIdsToDelete(idsToDelete.filter((item) => item !== value));
    }
  };

  const handleOnDelete = async () => {
    console.log(idsToDelete);

    if (
      window.confirm(
        `Are you sure you want to delete  ${idsToDelete.length} tasks?`
      )
    ) {
      //calling api to delte the data

      const result = await deleteTasks({ ids: idsToDelete });
      setResponse(result);
      // setResponse(result);
      //fetching api to pull all the data

      if (result?.status === "success") {
        getAllTrans();
        setIdsToDelete([]);
      }
    }
  };

  return (
    <div className="mt-5">
      <div> {transList.length} Transactions found!</div>

      {resp.message && (
        <Alert variant={resp.status === " succees" ? "success" : "danger"}>
          {resp.mesage}
        </Alert>
      )}
      <Table striped bordered hover>
        <Button onClick={handleOnDelete}>Delete</Button>
        <thead>
          <tr>
            <th>
              <Form.Check
                onChange={handleOnAllCheck}
                checked={idsToDelete.length === transList.length}
              />
              <input
                type="checkbox"
                value=""
                onChange={handleOnAllCheck}
                className="mx-2 w-4 h-4 border border-gray-300  bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </th>
            <th>Date</th>
            <th>Title</th>
            <th>Income</th>
            <th>Expense</th>
          </tr>
        </thead>

        <tbody>
          {transList.map(({ _id, title, date, amount, type }) => (
            <tr>
              <td className="text-center">
                <Form.Check value={_id} onChange={handleOnChecked} />
                <input
                  type="checkbox"
                  value={_id}
                  // checked={idsToDelete.includes(item._id)}
                  onChange={handleOnChecked}
                  checked={idsToDelete.includes(_id)}
                  className="mx-2 w-4 h-4 border border-gray-300  bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </td>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td>{title}</td>
              {type === "income" ? (
                <>
                  <td className="text-success"> {amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger"> -{amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bolder">
            <td colSpan={3}>
              <div className="d-flex justify-content-betwen text-end">
                {idsToDelete.length > 0 && (
                  <Button variant="danger">Delete</Button>
                )}
                <span>Total balance</span>
              </div>
            </td>
            <td>
              {transList.reduce((acc, { amount, type }) => {
                return type === "income" ? acc + amount : acc - amount;
              }, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
