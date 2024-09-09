import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


export function AppHeader() {
    const loggedInUser = useSelector(state => state.userModule.user)

    if (loggedInUser){
        const { fullname, score, imgUrl } = loggedInUser
    }
    return (
        <header className="header">

            <h1 className="logo">Or's SHOP</h1>
            {loggedInUser && <section>
                <p>Name: {fullname}</p>
                <p>Balance: {score} $</p>
                <img src={imgUrl} alt="" />
            </section>}

            <nav>
                <ul>
                <NavLink to="/login"><li>login</li></NavLink>
                    <NavLink exact to="/" ><li>Home</li></NavLink>
                    <NavLink to="/about"><li>About</li></NavLink>
                </ul>
            </nav>
        </header>
    )
}