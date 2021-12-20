import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const history = useHistory();
    const [error, setError] = useState({
        error: [],
    })
    const [userData, setData] = useState({
        user_name: "",
        password: ""

    });

    const { user_name, password } = userData;


    const onChange = (e) => {
        setData({ ...userData, [e.target.name]: e.target.value });
    }



    const onsubmit = (e) => {
        e.preventDefault();
        load();
        //console.log(userData);
        // delete data.confirm_password
    }
    const load = async () => {
        const res = await axios.post("http://127.0.0.1:8000/api/signin", JSON.stringify(userData), { headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.data.status === 200) {
                    if (response.data.user.account_Status === 'pending') {
                        setError({
                            error: "Your account is in pending"
                        })
                    } else if (response.data.user.account_Status === 'block') {
                        setError({
                            error: "Your account is Blocked. Please contact with an admin"
                        })
                    } else {
                        if (response.data.user.user_type === 'admin') {
                            window.sessionStorage.setItem('status', 'true');
                            window.sessionStorage.setItem('user', JSON.stringify(response.data.user));
                            history.push('/dashboard');
                        } else if (response.data.user.user_type === 'teacher') {
                            window.sessionStorage.setItem('status', 'true');
                            window.sessionStorage.setItem('user', JSON.stringify(response.data.user));
                            history.push('/teacher_dashboard');
                        } 
                          else if (response.data.user.user_type === 'student') {
                             window.sessionStorage.setItem('status', 'true');
                             window.sessionStorage.setItem('user', JSON.stringify(response.data.user));
                             history.push('/student_dashboard');
                    }
                    }

                } else {
                    setError({
                        error: response.data.error
                    })
                }
            })
            .catch(error => {
                alert("Something Went Wrong");
            })

    }



    return (
        <div className="login-form-bg h-100">
            <div className="container ">
                <div className="row justify-content-center ">
                    <div className="col-xl-6">
                        <div className="form-input-content">
                            <div className="card login-form mb-0">
                                <div className="card-body pt-5">

                                    <Link className="text-center signinlink" to="#">
                                        <h4>LogIn</h4>
                                    </Link>
                                    <form onSubmit={(e) => onsubmit(e)} className="mt-5 mb-5 login-input">
                                        <div className="form-group">
                                            <input type="text" name="user_name"
                                                className="form-control" placeholder="User Name" value={user_name} onChange={(e) => onChange(e)} required />
                                        </div>

                                        {/* error */}
                                        <div className="error alert-danger">
                                            <p>{error.error.user_name}</p>
                                        </div>

                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control"
                                                placeholder="Password" onChange={(e) => onChange(e)} value={password} required />
                                        </div>

                                        {/* error */}
                                        <div className="error alert-danger">
                                            <p>{error.error.password}</p>
                                        </div>

                                        <input type="submit" value="Sign in" className="btn btn-success w-100 " />

                                        {/* error */}
                                        <div className="error w-100 alert-danger">
                                            <p>{(error.error)}</p>
                                        </div>

                                    </form>

                                    <p className="mt-5 login-form__footer">Dont have account?
                                        <Link
                                            to="/signup" className="text-primary">Sign Up</Link> now
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;
