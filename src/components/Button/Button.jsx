import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Button.css";
function Button({ text, to, type = "button", className = "", onClick, count }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e); 
    if (to) navigate(to);    
  };

  return (
    <button
      type={type}
      className={`custom-button ${className} d-inline-block text-center `}
      onClick={handleClick}
    >
      {text}
      {count > 0 && <span className="custom-badge">{count}</span>}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func, 
  count: PropTypes.string,
};

export default Button;
