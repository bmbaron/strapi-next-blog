import Nav from "./nav";

// @ts-ignore
const Layout = ({ children, categories }) => (
    <>
        <Nav categories={categories} />
        {children}
    </>
);

export default Layout;