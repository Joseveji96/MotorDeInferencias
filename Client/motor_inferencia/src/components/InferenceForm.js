import React from 'react';

function InferenceForm({ reglas, hechos, objetivo, metodo, setReglas, setHechos, setObjetivo, setMetodo, handleEvaluar }) {
    return (
        <div className="inference-form">
            <h2>Reglas</h2>
            <textarea value={reglas} onChange={(e) => setReglas(e.target.value)} rows="5" placeholder="Ejemplo: A,B -> C" />
            <h2>Hechos Iniciales</h2>
            <textarea value={hechos} onChange={(e) => setHechos(e.target.value)} rows="3" placeholder="Ejemplo: A" />
            <h2>Objetivo</h2>
            <input value={objetivo} onChange={(e) => setObjetivo(e.target.value)} placeholder="Ejemplo: C" />
            <h2>Método</h2>
            <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                <option value="adelante">Encadenamiento hacia adelante</option>
                <option value="atras">Encadenamiento hacia atrás</option>
            </select>
            <div className="button-container">
                <button onClick={handleEvaluar}>Evaluar</button>
            </div>
        </div>
    );
}

export default InferenceForm;
