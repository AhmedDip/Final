import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactHtmlTableToExcel from "react-html-table-to-excel"
import Sidemenu from "../Layouts/sidemenu"
import { Link, useHistory } from 'react-router-dom';


function UserList() {
    const [data, setData] = useState([]);
    const history = useHistory();


    const load = async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/userlist");
        setData(res.data.users);
    }
    useEffect(() => {
        load();
    }, []);


    const checkStatus = (user) => {
        if (user.account_Status === 'pending') {
            return (
                <>
                    <td><span class="badge  badge-pill badge-warning">{user.account_Status}</span></td>
                    <td><Link to={`/userlist/edit/${user.id}`} className="btn btn-info" onClick={(event) => event.preventDefault()}>Edit</Link></td>
                    <td><Link onClick={() => { onApprove(user.id) }} className="btn btn-success"  >Approve</Link></td>
                    <td><Link onClick={() => { onDelete(user.id) }} className="btn btn-danger" >Delete</Link></td>
                </>
            )

        } else if (user.account_Status === 'Block') {
            return (
                <>
                    <td><span class="badge  badge-pill badge-danger">{user.account_Status}</span></td>
                    <td><Link to={`/userlist/edit/${user.id}`} className="btn btn-info" onClick={(event) => event.preventDefault()} >Edit</Link></td>
                    <td><Link onClick={() => { onUnblock(user.id) }} className="btn btn-success"  >Unblock</Link></td>
                    <td><Link onClick={() => { onDelete(user.id) }} className="btn btn-danger" >Delete</Link></td>
                </>
            )
        } else {
            return (
                <>
                    <td><span class="badge  badge-pill badge-success">{user.account_Status}</span></td>
                    <td><Link to={`/userlist/edit/${user.id}`} className="btn btn-info" >Edit</Link></td>
                    <td><Link onClick={() => { onBlock(user.id) }} className="btn btn-dark" >Block</Link></td>
                    <td><Link onClick={() => { onDelete(user.id) }} className="btn btn-danger" >Delete</Link></td>
                </>
            )
        }
    }

    const onApprove = (id) => {
        if (window.confirm("Are you sure you want to Approved the user?")) {

            const result = axios.post(`http://127.0.0.1:8000/api/pendingUserOparation/${id}`)
                .then(response => {
                    if (response.data.status === 200) {
                        alert("User Approved Succefully");
                        window.location.reload()
                    } else {
                        alert("Something Went Wrong");
                    }
                })
                .catch(error => {
                    alert("Something Went Wrong");
                })

        }
    }
    const onDelete = (id) => {
        if (window.confirm("Are you sure you want to Delete the user?")) {

            const result = axios.post(`http://127.0.0.1:8000/api/destroy/${id}`)
                .then(response => {
                    if (response.data.status === 200) {
                        alert("User Deleted Succefully");
                        window.location.reload()
                    } else {
                        alert("Something Went Wrong");
                    }
                })
                .catch(error => {
                    alert("Something Went Wrong");
                })

        }
    }
    const onUnblock = (id) => {
        if (window.confirm("Are you sure you want to Un-Block the user?")) {

            const result = axios.post(`http://127.0.0.1:8000/api/unblockOperation/${id}`)
                .then(response => {
                    if (response.data.status === 200) {
                        alert("User Un-Blocekd Succefully");
                        window.location.reload()
                    } else {
                        alert("Something Went Wrong");
                    }
                })
                .catch(error => {
                    alert("Something Went Wrong");
                })

        }
    }
    const onBlock = (id) => {
        if (window.confirm("Are you sure you want to block the user?")) {

            const result = axios.post(`http://127.0.0.1:8000/api/blockUserOparetion/${id}`)
                .then(response => {
                    if (response.data.status === 200) {
                        alert("User Blocekd Succefully");
                        window.location.reload()
                    } else {
                        alert("Something Went Wrong");
                    }
                })
                .catch(error => {
                    alert("Something Went Wrong");
                })

        }
    }



    return (
        <div className="content">
            <div className="container-fluid">
                <Sidemenu />
                <div className="row justify-content-center">
                    <div className="col-12 ">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Users Lists</h4>
                            
                                <div className="table-responsive">
                                    <table className="table table-striped  zero-configuration" id="user_table">
                                        <thead>
                                            <tr>
                                                <th>Id #</th>
                                                <th>User Name</th>
                                                <th>User type</th>
                                                <th>Address</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Acount Status</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                                <th>Block</th>
                                            </tr>
                                        </thead>
                                        <tbody id="table_body">
                                            {
                                                data.map((user) => {
                                                    return (
                                                        <tr>
                                                            <td>{user.id}</td>
                                                            <td>{user.user_name}</td>
                                                            <td><span className="badge badge-pill badge-success">{user.user_type}</span></td>
                                                            <td>{user.address}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.phone_number}</td>
                                                            {checkStatus(user)}


                                                        </tr>
                                                    );

                                                })
                                            }

                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <th>Id #</th>
                                                <th>User Name</th>
                                                <th>User type</th>
                                                <th>Address</th>
                                                <th>Email</th>
                                                <th>Phone Number</th>
                                                <th>Acount Status</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                                <th>Block</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}

export default UserList;