import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  background: #fff8fa;
  box-shadow: 0 2px 12px rgba(255, 105, 180, 0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 3vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  font-family: 'Dancing Script', cursive;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2.5rem;
  margin-left: 0;
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled.a`
  font-family: 'Dancing Script', cursive;
  font-size: 1.5rem;
  color: #ff69b4;
  text-decoration: none;
  padding: 0.3rem 1.1rem;
  border-radius: 12px;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  cursor: pointer;
  &:hover {
    background: #ffb6df;
    color: #fff;
    box-shadow: 0 2px 12px rgba(255, 105, 180, 0.13);
  }
`;

const Heart = styled.span`
  color: #ff69b4;
  font-size: 1.5rem;
  margin-right: 0.8rem;
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
