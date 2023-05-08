import React from "react";
import Link from "next/link";

// @ts-ignore
const Nav = ({ categories }) => {
    return (
        <div>
            <nav className="uk-navbar-container" data-uk-navbar>
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
                        {categories.map((category: any) => {
                            return (
                                <li key={category.id}>
                                    <Link legacyBehavior href={`/category/${category.attributes.slug}`}>
                                        <a className="uk-link-reset">{category.attributes.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Nav;