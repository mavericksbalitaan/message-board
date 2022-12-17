import { Link } from 'react-router-dom';
import '../stylesheets/welcome.scss';

function Welcome() {
  return (
    <div className="welcome-wrapper">
      <h1>Message Board</h1>
      <Link to="/login">
        <button type="button">Get Started</button>
      </Link>
    </div>
  );
}

export default Welcome;
