import { Routes, Route } from "react-router-dom"
import SetoresPage from "./pages/SetoresPage"
import PermanenciasPage from "./pages/PermanenciasPage"
import VeiculosPage from "./pages/VeiculosPage"
import VagasPage from "./pages/VagasPage"
import ProprietariosPage from "./pages/ProprietariosPage"
import SetoresForm from "./pages/SetoresForm"
import Layout from "./components/Layout"
import { Toaster } from "./components/ui/sonner"
import VagasForm from "./pages/VagasForm"

function App() {
  return (
    <>
    <Toaster />
    <Routes>
      <Route element={<Layout />}>
      <Route path="/setores" element={<SetoresPage />} />
      <Route path="/setores/cadastro" element={<SetoresForm />} />
      <Route path="/veiculos" element={<VeiculosPage />} />
      <Route path="/proprietarios" element={<ProprietariosPage />} />
      <Route path="/permanencias" element={<PermanenciasPage />} />
      <Route path="/vagas" element={<VagasPage />} />
      <Route path="/vagas/cadastro" element={<VagasForm />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
