
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAtom, useSetAtom } from 'jotai';
import { isLogAtom, currentUserNameAtom, currentUserMailAtom, currentUserIdAtom } from '../../Atom/atom';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "2"
  });

  const [isLog, setIsLog] = useAtom(isLogAtom);
  const setCurrentUserName = useSetAtom(currentUserNameAtom);
  const setCurrentUserMail = useSetAtom(currentUserMailAtom);
  const setCurrentUserId = useSetAtom(currentUserIdAtom);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:1337/api/auth/local/register", {
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
          <div className="register-form">
            <div className="login-div">
            <div className="title">The Hacking Project</div>
            <div className="sub-title">Network</div>
            <div className="fields">
                <form onSubmit={handleSubmit}>
                  <div className="email">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Adresse Mail"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Mot de Passe"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="username">
                    <input
                      type="username"
                      id="username"
                      name="username"
                      placeholder="Pseudo"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>                   
                    <button className="signin-button" type="submit" >S'inscrire</button>
                </form>
                  <p className="link">Vous avez déja un compte, <Link to="/login">Connectez-vous</Link></p>
                </div>
              </div>
          </div>
  );
};