import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import { useState, useEffect } from "react";

function UserHome({ user, iduser }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const navigate = useNavigate();
    const [codigo, setCodigo] = useState({
        numero: "",
        usuario: iduser
    });
    const [infoTabla, setInfoTabla] = useState([]);
    const [mensaje, setMensaje] = useState("");

    const goHome = () => navigate("/");

    const handleCodigoChange = (e) => {
        const { name, value } = e.target;
        setCodigo((prevCodigo) => ({
            ...prevCodigo,
            [name]: value
        }));
        setMensaje("");
    };

    useEffect(() => {
        fetch(`http://localhost:3000/v1/signos/traerusuario/${iduser}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(responseData => {
            if (Array.isArray(responseData)) {
                setInfoTabla(responseData);
            } else {
                setMensaje(responseData);
            }
        })
        .catch(error => {
            console.error("Error en la carga de datos:", error);
            setMensaje("Error en la carga de datos");
        });
    }, [iduser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (codigo.numero !== "0" && codigo.numero.trim() !== "") {
            fetch(`http://localhost:3000/v1/signos/codigo`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(codigo)
            })
            .then(response => response.json())
            .then(responseData => {
                if (typeof responseData === "object") {
                    setInfoTabla((prevInfoTabla) => [...prevInfoTabla, responseData]);
                    setCodigo({ numero: "", usuario: iduser }); // Resetear el formulario
                } else {
                    setMensaje(responseData);
                }
            })
            .catch(error => {
                console.error("Error en el registro del código:", error);
                setMensaje("Error en el registro del código");
            });
        }
    };

    return (
        <div className="container">
            <h2>Registrar Código</h2>
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="codigo">Código</label>
                <input
                    id="codigo"
                    type="number"
                    name="numero"
                    maxLength="3"
                    min="0"
                    max="999"
                    value={codigo.numero}
                    onChange={handleCodigoChange}
                    onInput={(e) => {
                        if (e.target.value.length > 3) {
                            e.target.value = e.target.value.slice(0, 3);
                        }
                    }}
                    required
                />
                <button type="submit" className="button">Agregar</button>
                <button type="button" className="button" onClick={goHome}>Salir</button>
            </form>
            {mensaje && <h3>{mensaje}</h3>}

            {/* Mostrar la tabla de códigos registrados */}
            {infoTabla.length > 0 && (
                <div className="table-container">
                    <h3>Códigos Registrados</h3>
                    <table className="codes-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Código</th>
                                <th>Premio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoTabla.map((registro, index) => (
                                <tr key={index}>
                                    <td>{new Date(registro.fecha).toLocaleDateString()}</td>
                                    <td>{registro.codigo}</td>
                                    <td>{registro.premio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default UserHome;
