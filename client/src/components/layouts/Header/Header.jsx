import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <nav>
        <ul>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  Register
                </Link>
              </li>
        </ul>
      </nav>
    </header>
  );
};
