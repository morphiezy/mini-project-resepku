import { useState } from "react";
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
  navbar_search,
  input_search,
  btn_search,
  icon_search
} = style;



const Navbar = () => {


  const [searchValue,setSearchValue] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [mobile] = useMobileDetect(576);
  const navigate = useNavigate();



  const handleInputChange = (e) => setSearchValue(e.target.value);
    

  const searchResep = (e) => {
    e.preventDefault();
    if(searchValue.trim() === "") return false;
    navigate(`/search?q=${searchValue}`)
  }

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

        <div className="d-flex align-items-center">
          <form className={`py-2 px-sm-2 me-sm-3 ${navbar_search}`} onSubmit={searchResep}>
            <input 
              type="text" 
              placeholder="Cari resep disini"
              className={`px-4 px-sm-2 ${input_search}`} 
              value={searchValue} 
              onChange={handleInputChange}
            />
            <button type="submit" className={btn_search}>
              <span className={`material-symbols-rounded ${icon_search}`}>search</span>
            </button>
          </form>

          {
            user.authenticated ? (
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
                    <a className="dropdown-item" href="/create-recipe">
                      Publish Recipe
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/my-creation">
                      My Creation
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/bookmark">
                      Bookmark
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
            )
          }

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
