import { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import Premium from "./components/pages/premium";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Privacy from "./components/pages/privacy";
import Terms from "./components/pages/terms";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/ScrollToTop";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [subStatus, setSubStatus] = useState<"loading" | "active" | "inactive">("loading");

  useEffect(() => {
    const checkSubscription = async () => {
      if (!user) {
        setSubStatus("inactive");
        return;
      }

      const response = await fetch(`/.netlify/functions/check-subscription?email=${encodeURIComponent(user.email!)}`);
      const data = await response.json();

      if (data.active) {
        setSubStatus("active");
      } else {
        setSubStatus("inactive");
      }
    };

    checkSubscription();
  }, [user]);

  if (loading || subStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (!user || subStatus !== "active") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

function HomeRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <Home />;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/premium" element={<PrivateRoute><Premium /></PrivateRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
