import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css';

const RegistroAdmin = () => {
    const [addCredenciales, setAddCredenciales] = useState({
        rol: "admin",
        email: "",
        password: ""
    });

    const [respuesta, setRespuesta] = useState("");
    const navigate = useNavigate();

    const goHome = () => navigate("/");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddCredenciales((prevCredenciales) => ({
            ...prevCredenciales,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/v1/signos/registroadmin`, { // URL local
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addCredenciales)
        })
        .then(res => res.json())
        .then(resData => setRespuesta(resData))
        .catch(error => {
            console.error("Error en la conexión:", error);
            setRespuesta("Error en la conexión");
        });
    };

    useEffect(() => {
        if (respuesta) {
            alert(respuesta);
        }
    }, [respuesta]);

    return (
        <div id="dirRegistro">
            <h3>Creación de usuario Admin</h3>
            <form onSubmit={handleSubmit}>
                <label>Ingresa un correo</label>
                <input
                    type="text"
                    name="email"
                    value={addCredenciales.email}
                    onChange={handleInputChange}
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={addCredenciales.password}
                    onChange={handleInputChange}
                />
                <input type="submit" value="Agregar" id="agregar" />
                <button type="button" onClick={goHome}>Salir</button>
            </form>
        </div>
    );
};

export default RegistroAdmin;

