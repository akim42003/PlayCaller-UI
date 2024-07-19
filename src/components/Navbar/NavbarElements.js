import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


// Assuming the primary background color and text color from App.css are used here
export const Nav = styled.nav`
    background: #1f2229; // Example background color from App.css
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
    font-family: 'Lobster', cursive;
    font-size: 16px;
`;

// Using a text color and active color that matches App.css, and a consistent font
export const NavLink = styled(Link)`
    color: ##4ea4b7; // Example text color from App.css
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff; // Highlight color for active link
    }
`;

// Styling for the mobile menu icon
export const Bars = styled(FaBars)`
    display: none;
    color: #808080; // Example icon color from App.css
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

// Flex container for navigation links
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
