import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/workshops">Workshops</Link>
                </li>
                <li>
                    <Link to="/apps">Sample Applications</Link>
                </li>
                <li>
                    <Link to="/starters">Starter Applications</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;