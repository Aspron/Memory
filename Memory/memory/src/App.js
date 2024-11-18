import React, { useState, useEffect } from 'react';
import Carta from './Carta';

function App() {
  // Array inicial de cartas (6 letras, 2 veces cada una)
  const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cartasIniciales = [...letras, ...letras];

  // Mezclar las cartas aleatoriamente
  const cartasMezcladas = cartasIniciales.sort(() => Math.random() - 0.5);

  // Estado de las cartas, cartas volteadas, y cartas emparejadas
  const [cartas, setCartas] = useState(
    cartasMezcladas.map((valor, index) => ({
      id: index,
      valor,
      estaVolteada: false,
      estaEmparejada: false,
    }))
  );
  const [cartasVolteadas, setCartasVolteadas] = useState([]); // Para almacenar las cartas volteadas
  const [cartasEmparejadas, setCartasEmparejadas] = useState([]); // Para almacenar las cartas emparejadas
  const [mensaje, setMensaje] = useState('');

  // Lógica de voltear las cartas
  const voltearCarta = (id) => {
    if (cartasVolteadas.length < 2) {
      const nuevaCartas = [...cartas];
      const cartaIndex = nuevaCartas.findIndex((carta) => carta.id === id);

      // No permitir voltear cartas emparejadas
      if (nuevaCartas[cartaIndex].estaEmparejada || nuevaCartas[cartaIndex].estaVolteada) return;

      nuevaCartas[cartaIndex].estaVolteada = true;
      setCartas(nuevaCartas);

      setCartasVolteadas((prev) => [...prev, id]);
    }
  };

  // Comparar las cartas volteadas
  useEffect(() => {
    if (cartasVolteadas.length === 2) {
      const [id1, id2] = cartasVolteadas;
      const carta1 = cartas.find((carta) => carta.id === id1);
      const carta2 = cartas.find((carta) => carta.id === id2);

      // Si las cartas coinciden
      if (carta1.valor === carta2.valor) {
        const nuevaCartas = [...cartas];
        nuevaCartas[carta1.id].estaEmparejada = true;
        nuevaCartas[carta2.id].estaEmparejada = true;
        setCartas(nuevaCartas);
        setCartasEmparejadas((prev) => [...prev, carta1.id, carta2.id]);
      } else {
        // Si no coinciden, volver a voltear las cartas después de un pequeño retraso
        setTimeout(() => {
          const nuevaCartas = [...cartas];
          nuevaCartas[carta1.id].estaVolteada = false;
          nuevaCartas[carta2.id].estaVolteada = false;
          setCartas(nuevaCartas);
        }, 1000);
      }

      setCartasVolteadas([]);
    }
  }, [cartasVolteadas, cartas]);

  // Verificar si el juego ha terminado
  useEffect(() => {
    if (cartasEmparejadas.length === cartas.length) {
      setMensaje('¡Felicidades! Has completado el juego.');
    }
  }, [cartasEmparejadas]);

  // Función para reiniciar el juego
  const reiniciarJuego = () => {
    const cartasMezcladas = cartasIniciales.sort(() => Math.random() - 0.5);
    setCartas(
      cartasMezcladas.map((valor, index) => ({
        id: index,
        valor,
        estaVolteada: false,
        estaEmparejada: false,
      }))
    );
    setCartasVolteadas([]);
    setCartasEmparejadas([]);
    setMensaje('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Juego de Memoria</h1>
      <div>
        {cartas.map((carta) => (
          <Carta
            key={carta.id}
            id={carta.id}
            valor={carta.valor}
            voltearCarta={voltearCarta}
            estaVolteada={carta.estaVolteada}
            estaEmparejada={carta.estaEmparejada}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        {mensaje}
      </div>
      <button onClick={reiniciarJuego} style={{ marginTop: '20px' }}>
        Reiniciar Juego
      </button>
    </div>
  );
}

export default App;
