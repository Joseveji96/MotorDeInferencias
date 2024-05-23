import React, { useState } from 'react';
import axios from 'axios';
import InferenceForm from './components/InferenceForm';
import ResultDisplay from './components/ResultDisplay';
import ProcessHistory from './components/ProcessHistory';
import './App.css';

function App() {
    const [reglas, setReglas] = useState('');
    const [hechos, setHechos] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [metodo, setMetodo] = useState('adelante');
    const [resultado, setResultado] = useState(null);
    const [historial, setHistorial] = useState([]);

    const handleEvaluar = async () => {
        const reglasArray = reglas.split('\n').map(linea => {
            const [antecedentes, consecuente] = linea.split('->').map(part => part.trim());
            return [antecedentes.split(',').map(a => a.trim()), consecuente];
        });

        const hechosArray = hechos.split('\n').map(hecho => hecho.trim());

        const data = {
            reglas: reglasArray,
            hechos: hechosArray,
            objetivo: objetivo.trim(),
            metodo: metodo
        };

        try {
            const response = await axios.post('http://localhost:5000/evaluar', data);
            setResultado(response.data);
            setHistorial(response.data.historial);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='background'>
                <div className="container">
                    <h1 className="title">Motor de Inferencia</h1>
                    <h2 className="developer">Desarrollado por: José Eduardo Velazco Jiménez</h2>
                    <InferenceForm
                        reglas={reglas}
                        hechos={hechos}
                        objetivo={objetivo}
                        metodo={metodo}
                        setReglas={setReglas}
                        setHechos={setHechos}
                        setObjetivo={setObjetivo}
                        setMetodo={setMetodo}
                        handleEvaluar={handleEvaluar}
                    />
                    <ResultDisplay resultado={resultado} />
                    <ProcessHistory historial={historial} />
                </div>
            </div>
        </>
    );
}

export default App;
