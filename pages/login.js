import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.table({  email, password });
        let res = await axios.post(`/api/login`,{email,password});
        console.log(res)
        if(res.data.error){
            toast.error(res.data.error)
        }
        if(res.data.data){
            toast.success("Login successfull")
        }
    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">LOGIN</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                

                    <input
                        type="email"
                        className="form-control mb-4 p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-4 p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />

                    <button type="submit" className="btn btn-block btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default login