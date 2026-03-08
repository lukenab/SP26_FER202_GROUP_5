import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { House, Book, List, Person } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Sidebar
      width="260px"
      collapsedWidth="70px"
      style={{ height: "100vh" }}
    >
      <Menu>

        <MenuItem icon={<House />} component={<Link to="/" />}>
          Home
        </MenuItem>

        <MenuItem icon={<Book />} component={<Link to="/books" />}>
          Books
        </MenuItem>

        <MenuItem icon={<List />} component={<Link to="/categories" />}>
          Categories
        </MenuItem>

        <MenuItem icon={<Person />} component={<Link to="/profile" />}>
          Profile
        </MenuItem>

      </Menu>
    </Sidebar>
  );
};

export default SideBar;