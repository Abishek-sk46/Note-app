import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            api.post(route, { username, password })
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem(ACCESS_TOKEN, res.data.access_token);
                        localStorage.setItem(REFRESH_TOKEN, res.data.refresh_token);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        
    }

    const name = method === 'login' ? 'Login' : 'Register';

    return (
        <form onSubmit={handleSubmit} className='form-container' action="">
            <h1>{name}</h1>

            <input type="text" value={username} placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className='btn' >
             {name}
            </button>
        </form>

    )
}