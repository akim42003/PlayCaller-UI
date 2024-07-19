import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Contact from "./pages/contact";
import PlayAnalyzer from './pages/PlayAnalyzer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Interactive from './pages/Interactive';
import PDFViewer from './components/PDFViewer'; // import the PDFViewer component

function App() {
  return (
      <Router>
          <Navbar />
          <DndProvider backend={HTML5Backend}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/PlayAnalyzer" element={<PlayAnalyzer />} />
                <Route path="/Interactive" element={<Interactive />} />
                <Route path="/pdf" element={<PDFViewer file="path/to/your/pdf" />} /> {/* Add the PDF Viewer route */}
            </Routes>
          </DndProvider>
      </Router>
  );
}
export default App;