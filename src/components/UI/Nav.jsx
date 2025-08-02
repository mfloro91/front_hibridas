import React from "react";
import { Button } from "../routes/UiComponents";
//import logo from '../../assets/logo.png';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const location = useLocation();
    const [search, setSearch] = useState("");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        navigate('/hotels', { state: { searchText: search } });

    };


    return (
        <nav className="d-flex justify-content-between align-items-center p-3">

            <NavLink to="/" className="align-items-center p-3"> Inicio </NavLink>
            <NavLink to="/services" className="align-items-center p-3"> Servicios </NavLink>
            <NavLink to="/contact" className="align-items-center p-3"> Contacto </NavLink>

            {(role === "superadmin" || role === "admin" || role === "staff") && (
                <NavLink to="/paneladmin" className="align-items-center p-3"> Panel Admin </NavLink>
            )}

            {location.pathname === "/hotels" && (
                <form onSubmit={handleSearchSubmit} className="d-flex align-items-center p-3">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={handleSearchChange}
                        className="form-control me-2"
                    />
                    <button type="submit" className="btn btn-light">
                        <span className="material-icons">search</span>
                    </button>
                </form>

            )}

            {token ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <p style={{ margin: "0", fontWeight: "bold" }}>{name}</p>
                    <Button text="Cerrar sesión" variant="success" onClick={handleLogout}> </Button>
                </div>
            ) : (
                <NavLink to="/login"> Iniciar sesión </NavLink>
            )}

        </nav>
    );
}

export default Navbar;

