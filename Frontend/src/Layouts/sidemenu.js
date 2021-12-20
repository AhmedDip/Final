import { NavLink } from "react-router-dom";
const Sidemenu = () => {
    return (
        <div className="container">
            <div className="links">
                <div className="sidebar">
                    <p className='head'>Welcome</p>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/adduser">Add users</NavLink>
                    <NavLink to="/userlist">Users List</NavLink>
                    {/* <NavLink to="/requests">Requests</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/postnotices">Post Notice</NavLink>
                    <NavLink to="/changepassword">Change Password</NavLink> */}
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            </div>
        </div>
    );
}
export default Sidemenu