import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Landing page is eager; other routes are code-split and fetched on demand.
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const AiSocWorkflow = lazy(() => import("./pages/AiSocWorkflow"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/ai-soc/workflow" element={<AiSocWorkflow />} />
        <Route path="services/:slug" element={<ServiceDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<div className="grid min-h-[60vh] place-items-center text-center"><div><h1 className="text-7xl">404</h1><p className="mt-4 text-xs uppercase">Page not found</p></div></div>} />
      </Route>
    </Routes>
  );
}
