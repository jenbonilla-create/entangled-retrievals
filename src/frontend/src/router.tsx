import { Layout } from "@/components/Layout";
import { PageTransition } from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import AboutPage from "@/pages/About";
import BookingPage from "@/pages/Booking";
import DashboardPage from "@/pages/Dashboard";
import DocumentsPage from "@/pages/Documents";
import HomePage from "@/pages/Home";
import InventoryPage from "@/pages/Inventory";
import LoginPage from "@/pages/Login";
import PricingPage from "@/pages/Pricing";
import PrivacyPage from "@/pages/Privacy";
import RegisterPage from "@/pages/Register";
import ServicesPage from "@/pages/Services";
import TermsPage from "@/pages/Terms";
import TrackingPage from "@/pages/Tracking";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coral" />
      </div>
    );
  }
  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }
  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  ),
  beforeLoad: () => {
    // Route guard handled by AuthGuard component
  },
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: () => (
    <AuthGuard>
      <BookingPage />
    </AuthGuard>
  ),
  validateSearch: (search: Record<string, unknown>) => {
    return {
      package: typeof search.package === "string" ? search.package : undefined,
    } as { package?: string };
  },
  beforeLoad: () => {},
});

const trackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tracking/$bookingId",
  component: () => (
    <AuthGuard>
      <TrackingPage />
    </AuthGuard>
  ),
  beforeLoad: () => {},
});

const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: () => (
    <AuthGuard>
      <InventoryPage />
    </AuthGuard>
  ),
  beforeLoad: () => {},
});

const documentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/documents",
  component: () => (
    <AuthGuard>
      <DocumentsPage />
    </AuthGuard>
  ),
  beforeLoad: () => {},
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: PricingPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: ServicesPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  bookingRoute,
  trackingRoute,
  inventoryRoute,
  documentsRoute,
  pricingRoute,
  aboutRoute,
  servicesRoute,
  termsRoute,
  privacyRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
