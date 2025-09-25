import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MESModernization from './pages/MESModernization';
import GreatBakeOff from './pages/GreatBakeOff';
import SoftwareRFPRequirements from './pages/SoftwareRFPRequirements';
import DeliveryServicesRequirements from './pages/DeliveryServicesRequirements';
import SliceRFPResponse from './pages/SliceRFPResponse';
import LayerRFPResponse from './pages/LayerRFPResponse';
import Feedback from './pages/Feedback';
import ReferenceMaterials from './pages/ReferenceMaterials';
import FAQs from './pages/FAQs';
import MESTraining from './pages/MESTraining';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mes-modernization" element={<MESModernization />} />
          <Route path="/great-bake-off" element={<GreatBakeOff />} />
          <Route path="/software-rfp-requirements" element={<SoftwareRFPRequirements />} />
          <Route path="/delivery-services-requirements" element={<DeliveryServicesRequirements />} />
          <Route path="/slice-rfp-response" element={<SliceRFPResponse />} />
          <Route path="/layer-rfp-response" element={<LayerRFPResponse />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/reference-materials" element={<ReferenceMaterials />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/mes-training" element={<MESTraining />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;