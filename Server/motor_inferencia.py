class MotorDeInferencia:
    def __init__(self, reglas, hechos_iniciales):
        self.reglas = reglas
        self.hechos = hechos_iniciales
        self.objetivo = None
        self.metodo = None
        self.conjunto_conflicto = []
        self.historial_proceso = []

    def encadenamiento_hacia_adelante(self):
        iteracion = 1
        while True:
            self.conjunto_conflicto = []
            for regla in self.reglas:
                antecedentes, consecuente = regla
                if set(antecedentes).issubset(set(self.hechos)):
                    self.conjunto_conflicto.append(regla)
            self.historial_proceso.append({
                'iteracion': iteracion,
                'conjunto_conflicto': self.conjunto_conflicto.copy(),
                'regla_disparada': None,
                'hechos_actualizados': self.hechos.copy(),
                'meta': self.objetivo
            })
            iteracion += 1
            
            if not self.conjunto_conflicto:
                break
            
            regla_disparada = self.conjunto_conflicto[0]
            self.reglas.remove(regla_disparada)
            self.hechos.append(regla_disparada[1])
            self.historial_proceso[-1]['regla_disparada'] = regla_disparada
            self.historial_proceso[-1]['hechos_actualizados'] = self.hechos.copy()
            
            if regla_disparada[1] == self.objetivo:
                return True

        return False

    def encadenamiento_hacia_atras(self, meta):
        iteracion = len(self.historial_proceso) + 1
        if meta in self.hechos:
            return True
        
        for regla in self.reglas:
            antecedentes, consecuente = regla
            if consecuente == meta:
                self.historial_proceso.append({
                    'iteracion': iteracion,
                    'conjunto_conflicto': [[antecedentes, meta]],
                    'regla_disparada': None,
                    'hechos_actualizados': self.hechos.copy(),
                    'meta': meta
                })
                iteracion += 1
                if all(self.encadenamiento_hacia_atras(antecedente) for antecedente in antecedentes):
                    self.hechos.append(meta)
                    self.historial_proceso[-1]['regla_disparada'] = regla
                    self.historial_proceso[-1]['hechos_actualizados'] = self.hechos.copy()
                    return True
        return False

    def evaluar(self, objetivo, metodo):
        self.objetivo = objetivo
        self.metodo = metodo
        self.historial_proceso = []

        if metodo == "adelante":
            exito = self.encadenamiento_hacia_adelante()
        elif metodo == "atras":
            exito = self.encadenamiento_hacia_atras(objetivo)
        else:
            raise ValueError("Método de encadenamiento no válido")

        return exito
