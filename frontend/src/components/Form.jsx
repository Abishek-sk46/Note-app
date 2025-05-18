import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Forms.css';
import LoadingIndicator from './Loadingindicator';

function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


        const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            
            alert(JSON.stringify(error.response.data));
            alert(error)
        } finally {
            setLoading(false)
        }
    };
    const name = method === 'login' ? 'Login' : 'Register';

    return (
        <form onSubmit={handleSubmit} className='form-container' action="">
            <h1>{name}</h1>

            <input type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='form-input'/>
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='form-input'/>
            {loading && <LoadingIndicator />}
            <button type="submit" className='form-button' >
             {name}
            </button>
        </form>

    )
}

export default Form;