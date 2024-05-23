from flask import Flask, request, jsonify
from flask_cors import CORS
from motor_inferencia import MotorDeInferencia

app = Flask(__name__)
CORS(app)

@app.route('/evaluar', methods=['POST'])
def evaluar():
    data = request.json
    reglas = data['reglas']
    hechos = data['hechos']
    objetivo = data['objetivo']
    metodo = data['metodo']

    motor = MotorDeInferencia(reglas, hechos)
    exito = motor.evaluar(objetivo, metodo)

    return jsonify({
        'exito': exito,
        'hechos': motor.hechos,
        'objetivo': objetivo,
        'historial': motor.historial_proceso
    })

if __name__ == '__main__':
    app.run(debug=True)
