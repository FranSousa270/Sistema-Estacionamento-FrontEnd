import { Routes, Route } from "react-router-dom"
import SetoresPage from "./pages/SetoresPage"
import PermanenciasPage from "./pages/PermanenciasPage"
import VeiculosPage from "./pages/VeiculosPage"
import VagasPage from "./pages/VagasPage"
import ProprietariosPage from "./pages/ProprietariosPage"
import Layout from "./components/Layout"

function App() {
  return (
    <>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/setores" element={<SetoresPage />} />
      <Route path="/veiculos" element={<VeiculosPage />} />
      <Route path="/proprietarios" element={<ProprietariosPage />} />
      <Route path="/permanencias" element={<PermanenciasPage />} />
      <Route path="/vagas" element={<VagasPage />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
