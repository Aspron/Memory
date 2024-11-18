import React, { useState, useEffect } from 'react';
import Carta from './Carta';

function Tablero() {
  // Array inicial de cartas
  const cartasIniciales = [
    { id: 1, valor: 'A' }, { id: 2, valor: 'A' },
    { id: 3, valor: 'B' }, { id: 4, valor: 'B' },
    { id: 5, valor: 'C' }, { id: 6, valor: 'C' },
    { id: 7, valor: 'D' }, { id: 8, valor: 'D' },
    { id: 9, valor: 'E' }, { id: 10, valor: 'E' },
    { id: 11, valor: 'F' }, { id: 12, valor: 'F' }
  ];

  // Mezcla aleatoria de las cartas
  const cartasMezcladas = cartasIniciales
    .concat(cartasIniciales)
    .sort(() => Math.random() - 0.5);

  // Estado del tablero
  const [cartas, setCartas] = useState(cartasMezcladas);
  const [cartasVolteadas, setCartasVolteadas] = useState([]); // Guardar las cartas que están volteadas
  const [cartasEmparejadas, setCartasEmparejadas] = useState([]); // Guardar las cartas emparejadas
  const [juegoTerminado, setJuegoTerminado] = useState(false); // Estado para saber si el juego terminó

  // Lógica cuando se seleccionan dos cartas
  useEffect(() => {
    if (cartasVolteadas.length === 2) {
      const [carta1, carta2] = cartasVolteadas;

      if (cartas[carta1].valor === cartas[carta2].valor) {
        // Si las cartas coinciden, marcarlas como emparejadas
        setCartasEmparejadas((prev) => [...prev, cartas[carta1].id, cartas[carta2].id]);
        setCartasVolteadas([]);
      } else {
        // Si no coinciden, volverlas a voltear después de un retraso
        setTimeout(() => {
          setCartasVolteadas([]);
        }, 1000);
      }
    }
  }, [cartasVolteadas, cartas]);

  // Verificar si el juego ha terminado
  useEffect(() => {
    if (cartasEmparejadas.length === cartasIniciales.length * 2) {
      setJuegoTerminado(true);
    }
  }, [cartasEmparejadas]);

  // Función para voltear una carta
  const voltearCarta = (id) => {
    if (cartasVolteadas.length < 2 && !cartasVolteadas.includes(id) && !cartasEmparejadas.includes(id)) {
      setCartasVolteadas((prev) => [...prev, id]);
    }
  };

  // Verificar si una carta está volteada
  const estaVolteada = (id) => cartasVolteadas.includes(id);
  // Verificar si una carta está emparejada
  const estaEmparejada = (id) => cartasEmparejadas.includes(id);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '600px', margin: 'auto' }}>
        {cartas.map((carta) => (
          <Carta
            key={carta.id}
            id={carta.id}
            valor={carta.valor}
            voltearCarta={voltearCarta}
            estaVolteada={estaVolteada(carta.id)}
            estaEmparejada={estaEmparejada(carta.id)}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: '20px',
          fontSize: '18px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {juegoTerminado ? '¡Juego terminado!' : 'En espera de una carta...'}
      </div>
    </div>
  );
}

export default Tablero;
