
import { Card, CardHeader } from '@/components/ui/card'
import { api } from '@/services/api'

function App() {
  const fetchVeiculos = async () => {
    try {
      const response = await api.get('/veiculos');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching veiculos:', error);
    }
  }
  const veiculos =  fetchVeiculos();

  return (
    <>
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold"></h2>
      </CardHeader>
    </Card>
    </>
  )
}

export default App
