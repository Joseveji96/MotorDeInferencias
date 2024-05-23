import React from 'react';

function ResultDisplay({ resultado }) {
    return (
        <div className="resultado">
            <h2>Resultado</h2>
            {resultado && (
                <div>
                    <p>Éxito: {resultado.exito ? 'Sí' : 'No'}</p>
                    <p>Hechos Finales: {resultado.hechos.join(', ')}</p>
                </div>
            )}
        </div>
    );
}

export default ResultDisplay;
