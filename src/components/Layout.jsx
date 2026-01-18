import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <div className="nav">
          <NavLink to="/" className="brand">
            <span className="mark">CRAGSCORE</span>
            
          </NavLink>

          <nav className="links">
            <a href="#browse">Browse</a>
            <a href="#how">How it works</a>
            <a href="#submit">Submit</a>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}