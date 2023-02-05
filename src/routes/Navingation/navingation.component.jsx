import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import "./navigation.styles.scss";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { useContext } from "react";
import { UserContext } from "../../context/users.contex";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {


  const { currentUser } = useContext(UserContext);
  console.log(currentUser);




  return (
    <Fragment>
      <div className="navigation">

        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">

          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          
          {
            currentUser ? (<span onClick={signOutUser} className="na-link">SIGN OUT</span>) :
                          (<Link className="nav-link" to="/auth">Sign-in</Link>)
          }

        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;

