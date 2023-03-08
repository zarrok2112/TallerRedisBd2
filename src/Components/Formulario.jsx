import { useState } from 'react';
import './formulario.css';

export const Formulario = () => {
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Fecha de nacimiento:', fechaNacimiento);
  };

  return (
    <div className="formulario">
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div className="contenedorMaestro">
          <div className="label-column">
            <label htmlFor="email"><h4>Email:</h4></label>
            <label htmlFor="nombre"><h4>Nombre:</h4></label>
            <label htmlFor="telefono"><h4>Teléfono:</h4></label>
            <label htmlFor="fecha_nacimiento"><h4>Fecha de nacimiento:</h4></label>
          </div>
          <div className="input-column">
            <input className="form-control" type="text" id="email" name="email" placeholder="Email" />
            <input className="form-control" type="text" id="nombre" name="nombre" placeholder="Nombre" />
            <input className="form-control" type="text" id="telefono" name="telefono" placeholder="Teléfono" />
            <input className="form-control" type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={fechaNacimiento} onChange={(event) => setFechaNacimiento(event.target.value)} min="1900-01-01" max={new Date().toISOString().split('T')[0]} />
          </div>
        </div>
        <div className="contenedorMaestro">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};