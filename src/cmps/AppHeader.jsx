import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


export function AppHeader(props) {
    const loggedInUser = useSelector(state => state.userModule.user)

    console.log(loggedInUser)
    if (!loggedInUser) return
    const { fullname, score, imgUrl } = loggedInUser
    return (
        <header className="header">

            <h1 className="logo">shopEase</h1>
            <section>
                <p>Name: {fullname}</p>
                <p>Balance: {score} $</p>
                <img src={imgUrl} alt="" />
            </section>

            <nav>
                <ul>

                    <NavLink exact to="/" ><li>Home</li></NavLink>
                    <NavLink to="/about"><li>About</li></NavLink>
                </ul>
            </nav>
        </header>
    )
}