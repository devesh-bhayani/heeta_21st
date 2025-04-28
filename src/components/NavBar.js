import styled from 'styled-components';

// --- Enhanced NavBar Styling ---
const Nav = styled.nav`
  width: 100vw;
  height: 72px;
  background: #ffe1fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-family: 'Dancing Script', cursive;
  border: none;
  box-shadow: none;
`;

const NavList = styled.ul`
  display: flex;
  gap: 56px;
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin: 0;
  box-shadow: none;
`;

const NavItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  font-family: 'Dancing Script', cursive;
  font-size: 2.2rem;
  color: #8a6c7b;
  background: transparent;
  border: none;
  text-shadow: none;
  text-decoration: none;
  padding: 0.5rem 1.8rem 0.5rem 1.8rem;
  border-radius: 20px;
  font-weight: 500;
  box-shadow: none;
  margin: 0;
  position: relative;
  outline: none;
  transition: background 0.15s, color 0.15s, font-weight 0.15s;
  display: inline-block;
  &.active, &[aria-current="true"] {
    background: #fff;
    color: #d26fa0;
    font-weight: 700;
    box-shadow: 0 0 0 0 #fff;
  }
`;

const Heart = styled.span`
  display: none;
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
