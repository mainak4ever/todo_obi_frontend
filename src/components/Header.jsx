import Container from "./Container";
import Logo from "./Logo";
import LogoutBtn from "./Logout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Add Todo",
      slug: "/add-todo",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 shadow border-b  border-white bg-slate-800">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Logo width="90px" />
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock mx-2 px-6 py-2 font-bold text-white duration-200 hover:bg-blue-100 rounded-md hover:text-black"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
