import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    marginRight: "20px",
    fontWeight: "500",
    transition: "0.3s"
  };

  const activeStyle = {
    color: "#fff",
    borderBottom: "2px solid #0d6efd",
    paddingBottom: "3px"
  };

  return (
    <nav
      style={{
        background: "#1f1f1f",
        padding: "15px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
      }}
    >
      {/* Logo */}
      <h4 style={{ color: "#fff", margin: 0 }}>
         Multi Dashboard
      </h4>

      {/* Links */}
      <div>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Entertainment
        </NavLink>

        <NavLink
          to="/jobs"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Jobs
        </NavLink>

        <NavLink
          to="/mental"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Mental Health
        </NavLink>

        <NavLink
          to="/add"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          Add Dataset
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;