
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const FetchUserName = () => {
  const [data, setData] = useState(null);
  const token = Cookies.get('token');
  console.log("token : " + token);

  useEffect(() => {
    fetch("http://localhost:1337/api/users/me", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((response) => {
      setData(response);
      console.log("response : "+ response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [token]);

  return (
    <>{data.username}</>
  );
}
// {data.username}