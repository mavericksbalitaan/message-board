import { Link } from 'react-router-dom';
import '../stylesheets/welcome.scss';

function Welcome() {
  return (
    <div className="welcome-wrapper">
      <h1>Mini-Message Board</h1>
      <Link to="/board">
        <button type="button">Click Me!</button>
      </Link>
    </div>
  );
}

export default Welcome;
