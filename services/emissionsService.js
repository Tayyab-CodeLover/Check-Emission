export const emission = async () => {
  (path = "http://localhost:3000/add"),
    (method = "POST"),
    (headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    });
};
