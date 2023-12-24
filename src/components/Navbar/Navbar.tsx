"use client"
// Navbar.tsx
import styled from 'styled-components';
import Link from 'next/link';
import Logo from './Logo';

// const Logo = styled.a`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

const Nav = styled.nav`
   padding: 1rem;
  border-bottom: 4px solid var(--color-link-text); /* Use the text color for border */
  background-color: var(--color-navbar-bg); /* Use CSS variable for background */
  backdrop-filter: blur(40px);


`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;


const NavLinks = styled.div`
  a {
    color: var(--color-link-text); /* Use CSS variable for text color */
  margin-right: 2rem;
  text-decoration: none;
  &:hover {
    opacity: 0.8; /* A subtle hover effect */
  }
  &:last-child {
    margin-right: 0;
  }
  }
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavContainer>
        <Link href="/" passHref>
          <Logo />
        </Link>
        <NavLinks>
          <Link href="/home" passHref>Home</Link>
          <Link href="/about" passHref>About</Link>
          <Link href="/services" passHref>Services</Link>
          <Link href="/contact" passHref>Contact</Link>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
