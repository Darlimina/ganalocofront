import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './styles/Registro.css'; // Asegúrate de que la ruta sea correcta

const Registro = () => {
    const [addcredenciales, setAddcredenciales] = useState({
        rol: "user",
        email: "",
        password: "",
        nombre: "",
        fecha: "",
        cedula: "",
        telefono: "",
        ciudad: ""
    });
    const [respuesta, setRespuesta] = useState("");
    const navigate = useNavigate();

    const goHome = () => navigate("/");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddcredenciales((prevCredenciales) => ({
            ...prevCredenciales,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/v1/signos/registro`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addcredenciales)
            });
            const resdata = await response.json();
            setRespuesta(resdata);
        } catch (error) {
            console.error("Error en la conexión:", error);
            setRespuesta("Error en la conexión");
        }
    };

    useEffect(() => {
        if (respuesta) {
            alert(respuesta);
            if (respuesta.success) { // Si la respuesta tiene un campo de éxito, navega a la página de inicio
                goHome();
            }
        }
    }, [respuesta]);

    return (
        <div id="dirRegistro">
            <h3>Registro de usuario</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nombre<span className="required">*</span>:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={addcredenciales.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Cédula<span className="required">*</span>:</label>
                    <input
                        type="text"
                        name="cedula"
                        value={addcredenciales.cedula}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Ciudad<span className="required">*</span>:</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={addcredenciales.ciudad}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Teléfono<span className="required">*</span>:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={addcredenciales.telefono}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>
                    Fecha de Nacimiento<span className="required">*</span>:
                    </label>
                    <input
                        type="date"
                        name="fecha"
                        value={addcredenciales.fecha}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>
                    Email<span className="required">*</span>:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={addcredenciales.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <label>Contraseña<span className="required">*</span>:</label>
                    <input
                        type="password"
                        name="password"
                        value={addcredenciales.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input type="submit" value="Agregar" id="agregar" />
                <button type="button" onClick={goHome}>Salir</button>
            </form>
        </div>
    );
};

export default Registro;
