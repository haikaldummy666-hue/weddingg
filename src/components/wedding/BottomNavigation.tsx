import { Home, Users, Calendar, Image, Gift } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "mempelai", label: "Mempelai", icon: Users },
  { id: "acara", label: "Acara", icon: Calendar },
  { id: "galeri", label: "Galeri", icon: Image },
  { id: "gift", label: "Gift", icon: Gift },
];

export const BottomNavigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-lg border-t border-gold/30 shadow-lg">
      <div className="max-w-lg mx-auto px-2">
        <ul className="flex items-center justify-around">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="flex flex-col items-center gap-1 py-3 px-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-sans uppercase tracking-wider">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
