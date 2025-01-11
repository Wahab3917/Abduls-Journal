import { Container, Logo, Login, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    },
    // {
    //   name: "Blog",
    //   slug: "/blog",
    //   active: true,
    // },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
  ]

  return (
    <header>
      <Container>
        <nav className='flex mt-4'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:text-white'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus ? (
              <li>
                <LogoutBtn/>
              </li>
            ) : (
              <li>
                <Login />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header