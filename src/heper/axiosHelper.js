import axios from "axios";

const rootAPI = "process.env.REACT_APP_ROOTAPI";
const userApi = rootAPI + "/user";
const transApi = rootAPI + "/transaction";

const loginApi = userApi + "/login";

const getUserId = () => {
  const userJson = sessionStorage.getItem("user");

  const userObj = JSON.parse(userJson);

  return userObj?._id || null;
};

// ============= user api

export const postUser = async (userObj) => {
  try {
    const { data } = await axios.post(userApi, userObj);

    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      mesage: error.message,
    };
  }
};

//login

export const loginUser = async (userObj) => {
  try {
    const { data } = await axios.post(loginApi, userObj);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An error occured while logged in",
    };
  }
};

// ============= transaction api

//creating a transaction
export const postTrans = async (transObj) => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "userId not found, log out and log in again.",
      };
    }

    const { data } = await axios.post(transApi, transObj, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      mesage: error.message,
    };
  }
};

export const getTrans = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      return {
        status: "error",
        message: "userId not foud, log out and log in again.",
      };
    }
    const { data } = await axios.get(transApi, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      mesage: error.message,
    };
  }
};

//delete
export const deleteTasks = async (taskArg) => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "userId not found, log out and log in again.",
      };
    }

    const { data } = await axios.delete(transApi, {
      data: taskArg,

      headers: { Authorization: userId },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
