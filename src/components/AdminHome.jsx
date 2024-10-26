import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState, useEffect } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />
    }

    const home = useNavigate();
    const [infoTabla, setInfoTabla] = useState([]);
    const [texto, setTexto] = useState(""); // Estado para manejar mensajes de texto o errores
    const [signoEditar, setSignoEditar] = useState(null); // Inicializar signoEditar
    const [categoria, setcategoria] = useState(null); // Inicializar categoria
    const valor = "utilizado";

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
        }
    }

    function SelecCategori(event) {
        const Categoria = event.target.value;
        if (Categoria !== "0") {
            setcategoria(Categoria);
        }
    }

    function goHome() {
        home("/");
    }

    useEffect(() => {
        fetch(`http://localhost:3000/v1/signos/traer/${valor}`, { // URL local
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(responseData => {
            if (typeof responseData === "object") {
                setInfoTabla(responseData);
            } else {
                setTexto(responseData);
            }
        })
        .catch(error => {
            console.error("Error en la conexión:", error);
            setTexto("Error en la conexión");
        });
    }, [valor]);

    return (
        <div className="container">
            <button id="btnHomeAdmin" onClick={goHome}>Salir</button>
            {texto && <p>{texto}</p>}
            {infoTabla.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Teléfono</th>
                            <th>Código Ganador</th>
                            <th>Premio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoTabla.map((registro, index) => (
                            <tr key={index}>
                                <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                                <td>{registro.nombre}</td>
                                <td>{registro.cedula}</td>
                                <td>{registro.telefono}</td>
                                <td>{registro.codigo}</td>
                                <td>{registro.premio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminHome;
