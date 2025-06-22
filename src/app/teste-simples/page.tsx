export default function TesteSimples() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>TESTE SIMPLES</h1>
      <p style={{ color: 'black', fontSize: '18px' }}>
        Se você consegue ver este texto, o Next.js está funcionando!
      </p>
      <div style={{ 
        backgroundColor: 'yellow', 
        padding: '10px', 
        margin: '10px 0',
        border: '2px solid red'
      }}>
        Esta é uma div com estilo inline
      </div>
      <button style={{ 
        backgroundColor: 'green', 
        color: 'white', 
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px'
      }}>
        Botão de Teste
      </button>
    </div>
  );
} 