import { createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('sg-widget')
if (container) {
  createRoot(container).render(<App />)
}