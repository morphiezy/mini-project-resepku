import { useMobileDetect } from "../../customHooks/useMobileDetect";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";
import Logo from "../../img/logo/logo-navbar.svg";
import Button from "../Button";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/User/userSlice";


const {
  navbar_custom,
  brand_img,
  custom_navbar_container,
  custom_button,
  button_dropdown,
  menu_list,
} = style;


const Navbar = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [mobile] = useMobileDetect(576);
  const navigate = useNavigate();

  const btnLogoutClick = () => {
    dispatch(logout())
    return navigate('/')
  }

  return (
    <nav className={`navbar ${navbar_custom} px-4 px-md-5 sticky-top`}>
      <div className={`container-fluid special-container ${custom_navbar_container}`}>
        <a className="navbar-brand" href="/">
          <img
            src={Logo}
            alt="logo-brand"
            className={`"img-fluid" ${brand_img}`}
          />
        </a>
        {user.authenticated ? (
          <div className="btn-group">
            <button
              type="button"
              className={`btn dropdown-toggle ${button_dropdown}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="fs-6">{user.username}</span>
            </button>
            <ul className={`dropdown-menu dropdown-menu-end ${menu_list}`}>
              <li>
                <a className="dropdown-item" href="/">
                  Create Recipe
                </a>
              </li>
              <li>
                <button
                  onClick={btnLogoutClick}
                  className="dropdown-item"
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="d-flex">
            {!mobile ? (
              <Button
                text="Masuk"
                custom_button={`me-2 me-sm-3 ${custom_button}`}
                btn_model="fill"
                onButtonClick={() => navigate("/login")}
              />
            ) : (
              false
            )}
            <Button
              text="Daftar"
              custom_button={custom_button}
              btn_model="stroke"
              onButtonClick={() => navigate("/register")}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
