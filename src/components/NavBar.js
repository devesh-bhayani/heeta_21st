import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background: rgba(255, 248, 250, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.08);
`;

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.08);
  }
`;

const Heart = styled(FaHeart)`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 0.5rem;
`;

const NavBar = () => (
  <Nav>
    <NavLink href="#landing"><Heart size={18} />Welcome</NavLink>
    <NavLink href="#video">Video</NavLink>
    <NavLink href="#timeline">Timeline</NavLink>
    <NavLink href="#scrapbook">Scrapbook</NavLink>
    <NavLink href="#gallery">Gallery</NavLink>
    <NavLink href="#love-letter">Love Letter</NavLink>
    {/* Add more links as needed */}
  </Nav>
);

export default NavBar;
