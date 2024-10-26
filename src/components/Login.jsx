import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

function Login({ callback, setiduser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate('/registro');
    };


    const validateUser = async (event) => {
        event.preventDefault();
      
        try {
            const res = await fetch('http://localhost:3000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const responseData = await res.json();
            const { usuario, id } = responseData;

            if (usuario === 'user') {
                setiduser(id);
                callback('user');
                setUsername(''); // Limpia el campo
                setPassword(''); // Limpia el campo
                setErrorMessage(''); // Limpia mensaje de error
                navigate('/userHome');
            } else if (usuario === 'admin') {
                callback('admin');
                setUsername('');
                setPassword('');
                setErrorMessage('');
                navigate('/adminHome');
            } else if (responseData === 'usuario o contaseña invalida') {
                setErrorMessage(responseData);
            }
        } catch (error) {
            console.error('Error al validar el usuario:', error);
            setErrorMessage('Error en la conexión');
        }
    };

    return (
        <form id="form1" onSubmit={validateUser}>
            <h1 id="txtBienvenida">Iniciar sesión</h1>
            <h4 className="txt">Usuario</h4>
            <input
                type="text"
                className="entry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <h4 className="txt">Contraseña</h4>
            <input
                type="password"
                className="entry"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {errorMessage && <h6 id="texto" className="error">{errorMessage}</h6>}
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" onClick={goToRegister}>Regístrate</button>
           
        </form>
    );
}

export default Login;
