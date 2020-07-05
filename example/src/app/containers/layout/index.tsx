import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <div className="wrapper header__wrapper">
      <div className="brand">Remote Data</div>
      <ul className="nav">
        <li className="nav__item">
          <NavLink className="nav__link" to="/" exact={true}>
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/users">
            Users
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/posts">
            Posts
          </NavLink>
        </li>
      </ul>
    </div>
  </header>
);

const Layout = ({ children }: React.ComponentProps<any>) => (
  <div className="site">
    <Header />
    <main className="wrapper">{children}</main>
  </div>
);
export default Layout;
