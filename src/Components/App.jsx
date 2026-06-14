import { useState } from 'react'
import '../pages/index.css' // Voltando uma pasta para achar o CSS

// Importando os novos componentes organizados
import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer.jsx'

// Imports do Vite antigo que mantivemos temporariamente
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="page__content">

      {/* Aqui entram os seus novos componentes limpos e organizados! */}
      <Header />
      <Main />
      <Footer />

      {/* ========================================================= */}
      {/* SEÇÃO DO VITE (Apenas logos padrão e contador)            */}
      {/* ========================================================= */}
      <hr style={{ margin: "40px 0", borderColor: "#444" }} />

      <section id="center">
        <div className="hero">
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/components/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

    </div>
  )
}

export default App