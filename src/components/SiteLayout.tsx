import { Link, NavLink as RouterNavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Journey", to: "/journey" },
  { label: "Explorer", to: "/explorer" },
  { label: "Feedback", to: "/feedback" },
];

const SiteLayout = () => {
  const location = useLocation();
  const isJourney = location.pathname === "/journey";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-lg tracking-wide text-glow">
            Abyss Atlas
          </Link>

          <nav className="flex items-center gap-1 rounded-full border border-border/60 bg-secondary/35 p-1" aria-label="Primary">
            {navItems.map((item) => (
              <RouterNavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative rounded-full px-3 py-1.5 text-xs sm:text-sm transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="main-nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-primary/40 bg-primary/10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    {item.label}
                  </>
                )}
              </RouterNavLink>
            ))}
          </nav>
        </div>
      </header>

      <Outlet />

      {!isJourney && (
        <footer className="border-t border-border/30 py-8 text-center">
          <p className="font-body text-xs text-muted-foreground">
            Ocean Depths Interactive System • Frontend + API + Data Layer • 2026
          </p>
        </footer>
      )}
    </div>
  );
};

export default SiteLayout;
