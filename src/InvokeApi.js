import axios from "axios";

// export const AddInputs = async (dataToSend) => {
//   console.log(dataToSend, "aadfafsdfeeee");
//   const reqObj = {
//     path: "http://localhost:5000/add",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//     postData: dataToSend,
//   };
//   let results;
//   try {
//     results = await axios(reqObj);
//     console.log(results, "adasdf");
//     return results.data;
//   } catch (error) {
//     console.log(error?.message);
//   }
// };

export const AddInputs = async (dataToSend) => {
  try {
    const response = await axios({
      url: "http://localhost:5000/add",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: dataToSend,
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

// export const handleSignUp = async (dataToSend) => {
//   console.log(dataToSend, "datafromsiginup");
//   try {
//     const response = await axios({
//       url: "http://localhost:5000/register",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: dataToSend,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("API ERROR:", error.response?.data || error.message);
//     throw error;
//   }
// };

export const handleSignUp = async (dataToSend) => {
  try {
    const response = await axios({
      url: "http://localhost:5000/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataToSend,
    });

    // Return the entire response data for the component to handle
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Throw the error with the response data if available
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || error.message,
      };
    }
    throw {
      status: 500,
      message: error.message || "Network error occurred",
    };
  }
};

export const handleLogin = async (dataToSend) => {
  console.log(dataToSend, "adfsafsf");
  try {
    const response = await axios({
      url: "http://localhost:5000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataToSend,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Throw the error with the response data if available
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data?.message || error.message,
      };
    }
    throw {
      status: 500,
      message: error.message || "Network error occurred",
    };
  }
};
