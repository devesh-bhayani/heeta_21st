import styled from 'styled-components';

// --- Enhanced NavBar Styling ---
const Nav = styled.nav`
  width: 100vw;
  height: 70px;
  background: linear-gradient(90deg, #ffe1fa 0%, #ffb6df 60%, #ff69b4 100%);
  box-shadow: 0 4px 24px rgba(255, 105, 180, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 3vw 1rem 3vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-family: 'Dancing Script', cursive;
  border-bottom: 3px solid #ff69b4;
  overflow: visible;
`;

const NavList = styled.ul`
  display: flex;
  gap: 3.2rem;
  margin-left: 0;
  background: rgba(255, 182, 223, 0.12);
  border-radius: 32px;
  padding: 0.3rem 2.5rem;
  box-shadow: 0 2px 18px rgba(255, 182, 223, 0.16);
`;

const NavItem = styled.li`
  list-style: none;
`;

// Fix: Use styled.a for NavLink to ensure all CSS applies, but use role="button" and tabIndex for accessibility
const NavLink = styled.a`
  font-family: 'Dancing Script', cursive;
  font-size: 2.2rem;
  color: #ff69b4;
  text-shadow: 0 2px 8px #fffbe8, 0 1px 0 #ffd6eb;
  text-decoration: none;
  padding: 0.5rem 2.2rem;
  border-radius: 24px;
  border: 2.5px solid #ff69b4;
  background: linear-gradient(90deg, #fffbe8 0%, #ffe1fa 100%);
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.16s;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 2px 14px rgba(255, 182, 223, 0.14);
  margin: 0 0.2rem;
  position: relative;
  overflow: visible;
  outline: none;
  border-style: solid;
  border-width: 2.5px;
  border-color: #ff69b4;
  appearance: none;
  display: inline-block;
  &:hover, &:focus, &[aria-current="true"] {
    background: linear-gradient(90deg, #ffb6df 0%, #ff69b4 100%);
    color: #fff;
    box-shadow: 0 8px 36px #ffd6eb66;
    transform: scale(1.09) rotate(-2deg);
    outline: none;
  }
  &.active {
    background: linear-gradient(90deg, #ff69b4 0%, #ffb6df 100%);
    color: #fff;
    box-shadow: 0 8px 36px #ffd6eb99;
    transform: scale(1.09) rotate(-2deg);
    outline: none;
  }
`;

const Heart = styled.span`
  color: #ff69b4;
  font-size: 2.7rem;
  margin-right: 2.1rem;
  text-shadow: 0 2px 8px #fffbe8;
  animation: heartbeat 1.5s infinite;
  filter: drop-shadow(0 2px 8px #ffd6eb);
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    10% { transform: scale(1.16); }
    20% { transform: scale(0.94); }
    30% { transform: scale(1.08); }
    50% { transform: scale(1.22); }
  }
`;

const NavBar = ({ onNavClick, activeSection }) => (
  <Nav>
    <Heart>♥</Heart>
    <NavList>
      <NavItem><NavLink href="#" role="button" tabIndex={0} aria-current={activeSection==='landing'} onClick={e => { e.preventDefault(); onNavClick('landing'); }}>Welcome</NavLink></NavItem>
      <NavItem><NavLink href="#" role="button" tabIndex={0} aria-current={activeSection==='love-letter'} onClick={e => { e.preventDefault(); onNavClick('love-letter'); }}>Letter from Me</NavLink></NavItem>
      <NavItem><NavLink href="#" role="button" tabIndex={0} aria-current={activeSection==='gallery'} onClick={e => { e.preventDefault(); onNavClick('gallery'); }}>Photo Gallery</NavLink></NavItem>
      <NavItem><NavLink href="#" role="button" tabIndex={0} aria-current={activeSection==='timeline'} onClick={e => { e.preventDefault(); onNavClick('timeline'); }}>Your Journey</NavLink></NavItem>
    </NavList>
  </Nav>
);

export default NavBar;
