import React, { useEffect } from 'react'
import "./HeaderFooter.css";
import { Link, useNavigate } from 'react-router-dom';

const HeaderNav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/")
    }
  }, [])

  const logoutUser = () => {
    // console.log("log out");
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div>
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Original_Adidas_logo.svg" 
        alt="logo" 
        className='logoStyle' 
        />
      {
        auth ?
          <ul className="ul-class">
            <li><Link to='/' className="links">Home</Link></li>
            <li><Link to='/add-product' className="links">Add Products</Link></li>
            <li><Link to='/about' className="links">About</Link></li>
            <li><Link className="links" to="/profile">User [{JSON.parse(auth).name}]</Link></li>
            <Link onClick={logoutUser} to='/signup' className="links">Log Out</Link>
          </ul> :
          <ul className="ul-class right-side">
            <li><Link to='/signup' className="links">Sign Up</Link></li>
            <li><Link className="links" to="/login">Log In</Link></li>
          </ul>

      }


      {/* <ul className='ul-class'>
        <li><Link to={'/'} className="links">Home</Link></li>
        <li><Link to='/about' className="links">About</Link></li>
                  
          {
            auth?
          <li><Link onClick={logoutUser} to='/signup' className="links">Log Out</Link></li>:
          <li><Link to='/signup' className="links">Sign Up</Link></li>
          }
          <li><Link className="links" to="/login">Log In</Link></li>
        {
          auth ?
            <li><Link onClick={logoutUser} to='/signup' className="links">Log Out</Link></li> :
            <>
              <li><Link to='/signup' className="links">Sign Up</Link></li>
              <li><Link className="links" to="/login">Log In</Link></li>
            </>
        }
      </ul> */}
    </div>
  )
}

export default HeaderNav;