import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { logoutThunk } from 'redux/auth/operations';
import { selectIsLoggedIn, selectUser } from 'redux/auth/selectors';
import styled from 'styled-components';

const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk());
  };
  return (
    <>
      <nav>
        <Links>
          {isLoggedIn && (
            <li>
              <NavLink to="/">Contacts</NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          )}
        </Links>
        <Links>
          {isLoggedIn && (
            <>
              <h2>User: {name}</h2>
              <button onClick={handleLogout} className="hover:text-red-500">
                Logout
              </button>
            </>
          )}
        </Links>
      </nav>

      <hr />
      <Suspense fallback={<h2>Loading...</h2>}>
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </Suspense>
    </>
  );
};

const OutletWrapper = styled.div`
  min-height: 100vh;
  padding: 10px 45px;
`;
const Links = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

export default Layout;
