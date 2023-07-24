import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';
import "./globals.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> //disabled for react-dnd preview bug for now
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
  // </React.StrictMode>
)
