import React from 'react';

function ProcessHistory({ historial }) {
    return (
        <div className="historial">
            <h2>Historial del Proceso</h2>
            {historial.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Iteración</th>
                            <th>Conjunto Conflicto</th>
                            <th>Regla Disparada</th>
                            <th>Hechos Actualizados</th>
                            <th>Meta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map((item, index) => (
                            <tr key={index}>
                                <td>{item.iteracion}</td>
                                <td>{JSON.stringify(item.conjunto_conflicto)}</td>
                                <td>{item.regla_disparada ? JSON.stringify(item.regla_disparada) : 'N/A'}</td>
                                <td>{JSON.stringify(item.hechos_actualizados)}</td>
                                <td>{item.meta}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay historial de procesos para mostrar.</p>
            )}
        </div>
    );
}

export default ProcessHistory;
