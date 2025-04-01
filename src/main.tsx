
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// App.tsx already contains StrictMode, so we don't need to wrap it here
createRoot(document.getElementById("root")!).render(<App />);
