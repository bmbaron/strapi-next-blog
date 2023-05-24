import React from "react";
import Link from "next/link";
import styled from "styled-components";

// @ts-ignore
const Nav = ({ categories }) => {
    return (
        <div>
            <nav className="data-uk-navbar-container uk-navbar" data-uk-navbar>
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link legacyBehavior href="/">
                                <a>Strapi Blog</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
                        {categories.data.map((category: any) => {
                            return (
                                <li key={category.id}>
                                    <StyledLink legacyBehavior href={`/category/${category.attributes.slug}`}>
                                        <a>{category.attributes.name}</a>
                                    </StyledLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

const StyledLink = styled(Link)`
color:white;
font-size: x-large;
font-family: Arial, Helvetica, sans-serif;
text-decoration: none;
margin: 10px;
&:hover,
&:focus{
    color: blue;
};
&:active{
    color: red;
};
@media(max-width: 700px) {
    display: none;
}
`


export default Nav;