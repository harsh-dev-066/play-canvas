import { useNavigate } from 'react-router-dom';
import { StyledNav } from '../styles/Nav.styled';
import Header from './Header';
import { ButtonAnimatedStyles } from '../styles/ButtonAnimated.styled';
import { SyntheticEvent } from 'react';

const Nav = () => {
  const navigate = useNavigate();
  const navigateHandle = (e: SyntheticEvent, route: string) => {
    navigate(route);
  };
  return (
    <StyledNav>
      <Header title="Play Canvas" />
      <div className="word-btn">
        <ButtonAnimatedStyles>
          <button className="create create-btn" onClick={(e) => navigateHandle(e, '/login')}>
            Login
          </button>
        </ButtonAnimatedStyles>
        <ButtonAnimatedStyles>
          <button className="create create-btn" onClick={(e) => navigateHandle(e, '/register')}>
            Register
          </button>
        </ButtonAnimatedStyles>

        {/* <Link to="/register">
          <button className="word-btn">Register</button>
        </Link> */}
      </div>
    </StyledNav>
  );
};

export default Nav;
