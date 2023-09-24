import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__top">
        <h1>{title}</h1>
        {location.pathname === "/" && (
          <Button
            color={showAdd ? "red" : "green"}
            text={showAdd ? "Close" : "Add"}
            onClick={onAdd}
          />
        )}
      </div>
      <div className="header__nav">
        <Link to="/">Home</Link>
        <Link to="/completed">Completed</Link>
        <Link to="/about">About</Link>
      </div>
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
