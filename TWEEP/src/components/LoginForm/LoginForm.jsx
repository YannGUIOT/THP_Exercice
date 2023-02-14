
import { useAtom, useSetAtom } from 'jotai';
import { isLogAtom, currentUserNameAtom, currentUserMailAtom, currentUserIdAtom } from '../../Atom/atom';
import { React, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {

  const navigate = useNavigate();

  const [isLog, setIsLog] = useAtom(isLogAtom);
  const setCurrentUserName = useSetAtom(currentUserNameAtom);
  const setCurrentUserMail = useSetAtom(currentUserMailAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1337/api/auth/local", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.jwt !== null || data.jwt !== undefined) {
        Cookies.set('token', data.jwt);
        console.log( "cookie : " + Cookies.get('token'));
        setIsLog(true);} 

      fetch("http://localhost:1337/api/users/me", {
        method: "get",
        headers: {
          'Authorization': `Bearer ${data.jwt}`,
        }
      })
      .then((response) => response.json())
      .then((response) => {
        setCurrentUserName(response.username);
        setCurrentUserMail(response.email);
        setCurrentUserId(response.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });  
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    };
        
    useEffect(() => {
      if (isLog) {
        navigate('/');
      }
    }, [isLog, navigate]);


  return (
    <>
    <div className="register-form">
      <div className="login-div">
      <div className="title">The Hacking Project</div>
      <div className="sub-title">Network</div>
      <div className="fields">
        <form action="" onSubmit={handleSubmit}>
          <div className="email">
            <input
              type="text"
              name="identifier"
              placeholder="identifiant"
              value={formData.identifier}
              onChange={handleChange}
            />
          </div>
          <div className="password">
            <input
              type="password"
              name="password"
              placeholder="mot de passe"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="signin-button" type="submit">Se Connecter</button>
        </form>
        <p className="link">Vous n'avez pas de compte, <Link to="/register">Inscrivez-vous</Link></p>
      </div>
      </div>
      </div>
    </>
  );
};