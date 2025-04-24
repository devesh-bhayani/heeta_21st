import styled from 'styled-components';

// --- Enhanced NavBar Styling ---
const Nav = styled.nav`
  width: 100vw;
  height: 60px;
  background: #fff8fa;
  box-shadow: 0 2px 12px rgba(255, 105, 180, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 3vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-family: 'Dancing Script', cursive;
`;

const NavList = styled.ul`
  display: flex;
  gap: 3.2rem;
  margin-left: 0;
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled.a`
  font-family: 'Dancing Script', cursive;
  font-size: 2.1rem;
  color: #ff69b4;
  text-shadow: 0 2px 8px #fffbe8, 0 1px 0 #ffd6eb;
  text-decoration: none;
  padding: 0.4rem 1.6rem;
  border-radius: 16px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.16s;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 2px 12px rgba(255, 105, 180, 0.06);
  &:hover {
    background: linear-gradient(90deg, #ffb6df 0%, #ff69b4 100%);
    color: #fff;
    box-shadow: 0 4px 24px rgba(255, 105, 180, 0.18);
    transform: scale(1.07) rotate(-2deg);
  }
`;

const Heart = styled.span`
  color: #ff69b4;
  font-size: 2.2rem;
  margin-right: 1.5rem;
  text-shadow: 0 2px 8px #fffbe8;
  animation: heartbeat 1.5s infinite;
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    10% { transform: scale(1.16); }
    20% { transform: scale(0.94); }
    30% { transform: scale(1.08); }
    50% { transform: scale(1.22); }
    70% { transform: scale(0.92); }
    80% { transform: scale(1.1); }
  }
`;

const NavBar = () => (
  <Nav>
    <Heart>♥</Heart>
    <NavList>
      <NavItem><NavLink href="#landing">Welcome</NavLink></NavItem>
      <NavItem><NavLink href="#timeline">Your Journey</NavLink></NavItem>
      <NavItem><NavLink href="#gallery">Photo Gallery</NavLink></NavItem>
      <NavItem><NavLink href="#love-letter">Love Letter</NavLink></NavItem>
    </NavList>
  </Nav>
);

export default NavBar;
