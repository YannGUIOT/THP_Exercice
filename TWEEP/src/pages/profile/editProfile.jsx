import { currentUserNameAtom, currentUserMailAtom } from '../../Atom/atom';
import { useAtom, useAtomValue } from 'jotai';
import Cookies from "js-cookie";

export const EditProfile = () => {

  const [userName, setUserName] = useAtom(currentUserNameAtom);
  const userMail = useAtomValue(currentUserMailAtom);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: userName,
      email: userMail,
      description: ""
    };

    const token = Cookies.get('token');

    console.log("data username : " + data.username);

    fetch(`http://localhost:1337/api/users/me`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1> My Profile </h1>
      <label>
        Username:
        <input type="text" value={userName ?? ''} onChange={handleUserNameChange} />
      </label>
      <br />
      <p>
        Email: {userMail}
      </p>
      <br />
      <button type="submit">Modify</button>
    </form>
  );
}
