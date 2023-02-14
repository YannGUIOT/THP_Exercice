import React from 'react'
import {Link} from 'react-router-dom';
import { isLogAtom, currentUserNameAtom } from "../../Atom/atom";
import { useAtomValue } from 'jotai';


export const Navbar = () => {

  const isLog = useAtomValue(isLogAtom);
  const currentUserName = useAtomValue(currentUserNameAtom);

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLog? (
            <>
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><Link to="/">New_Post</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Connexion</Link></li>
            </>
          )}
        </ul>
      </div>
      {isLog? (
        <>
        <div>
          <p>Welcome {currentUserName}</p>
        </div>
        <div>
          <Link to="/logout">Deconnexion</Link>
        </div>
        </>

      ) : (<></>)
      }
    </nav>
  );  
}
