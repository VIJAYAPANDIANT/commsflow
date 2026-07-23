import { AnimatedBackground } from './components/landing/AnimatedBackground';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { TrustedCompanies } from './components/landing/TrustedCompanies';
import { Features } from './components/landing/Features';
import { IndustrySolutions } from './components/landing/IndustrySolutions';
import { Testimonials } from './components/landing/Testimonials';
import { Pricing } from './components/landing/Pricing';
import { FAQ } from './components/landing/FAQ';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';

// Auth Pages
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { VerifyEmail } from './components/auth/VerifyEmail';
import { Dashboard } from './components/auth/Dashboard';
import { DocumentEditor } from './components/editor/DocumentEditor';

import { NavigationProvider, useNavigation } from './context/NavigationContext';

const LandingPage = () => {
  return (
    <div className="relative z-10">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Logo Ticker */}
        <TrustedCompanies />

        {/* Features Grid */}
        <Features />

        {/* Tabbed Interactive Solutions */}
        <IndustrySolutions />

        {/* Customer Reviews */}
        <Testimonials />

        {/* Plan Options */}
        <Pricing />

        {/* FAQ Accordions */}
        <FAQ />

        {/* Closing call-to-action */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
};

const AppContent = () => {
  const { currentView } = useNavigation();

  switch (currentView) {
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    case 'forgot-password':
      return <ForgotPassword />;
    case 'reset-password':
      return <ResetPassword />;
    case 'verify-email':
      return <VerifyEmail />;
    case 'dashboard':
      return <Dashboard />;
    case 'editor':
      return <DocumentEditor />;
    case 'landing':
    default:
      return (
        <div className="relative min-h-screen text-slate-100 selection:bg-violet-600/30 selection:text-white">
          {/* Dynamic Animated Ambient Background */}
          <AnimatedBackground />
          <LandingPage />
        </div>
      );
  }
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
