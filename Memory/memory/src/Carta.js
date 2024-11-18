import React from 'react';

function Carta({ id, valor, voltearCarta, estaVolteada, estaEmparejada }) {
  return (
    <div
      className={`carta ${estaVolteada ? 'volteada' : ''} ${estaEmparejada ? 'emparejada' : ''}`}
      onClick={() => voltearCarta(id)}
      style={{
        width: '80px',
        height: '120px',
        backgroundColor: estaVolteada ? '#fff' : '#369',
        color: estaVolteada ? '#000' : '#369',
        display: 'inline-block',
        margin: '10px',
        borderRadius: '8px',
        textAlign: 'center',
        lineHeight: '120px',
        fontSize: '36px',
        fontWeight: 'bold',
        cursor: estaEmparejada ? 'not-allowed' : 'pointer', 
      }}
    >
      {estaVolteada ? valor : ''}
    </div>
  );
}

export default Carta;
