
import { useEffect, useState } from "react";
import axios from "axios";
import Sidemenu from "../Layouts/sidemenu"
import { Redirect, useHistory } from "react-router-dom";
const Dashboard = () => {

    const history = useHistory();
    const [data, setData] = useState([]);
    const [request, setrequest] = useState([]);

    const date = new Date().toDateString();;
    useEffect(async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/userlist");
        setData(res.data.users);
      
    }, [])

    const active_users = data.filter((user) => {
        return user.account_Status === 'active';
    })
    const pending_users = data.filter((user) => {
        return user.account_Status === 'pending';
    })
 


    return (
        <>
            <Sidemenu />
            <div class="content dashboard_content">
                <div class="container-fluid">
                    <div class="container-fluid mt-5">
                        <div class="row">
                            <div class="col-lg-3 col-sm-8">
                                <div class=" gradient-1">
                                    <div class=" card_in_dashboard card-body">
                                        <h3 class="card-title text-white">Active Users</h3>
                                        <div class="d-inline-block">
                                            <h2 class="text-white">{(active_users.length)}</h2>
                                            <p class="text-white mb-0">{date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-6">
                                <div class=" gradient-2">
                                    <div class=" card_in_dashboard card-body">
                                        <h3 class="card-title text-white">Pending Users</h3>
                                        <div class="d-inline-block">
                                            <h2 class="text-white">{(pending_users.length)}</h2>
                                            <p class="text-white mb-0">{date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          
                        </div>

                    </div>

                </div >
            </div >
        </>
    );
}
export default Dashboard