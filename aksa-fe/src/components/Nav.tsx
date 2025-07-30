import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import { useUser } from "../contexts/UserContext";
import type { Theme } from "../types/theme";
import Switch from "./Switch";
import chevron from "@/assets/svgs/chevron.svg";
import UserEditModal from "./UserEditModal";

const Themes = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

export default function Nav() {
  const { logout } = useAuth();
  const { user } = useUser();
  const { settings, setSettings } = useSettings();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [showModal, setShowModal] = useState(false);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Focus first item when dropdown opens
  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      const firstFocusable = dropdownRef.current.querySelector<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [dropdownOpen]);

  return (
    <>
      <nav className="w-full bg-background text-foreground shadow-md relative z-10">
        <div className="max-w-7xl mx-2 lg:mx-auto py-4 flex items-center justify-between">
          <div className="text-xl font-semibold select-none">Dashboard</div>

          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-background px-3 py-2 rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="User menu"
            >
              <span className="capitalize">{user?.username || "User"}</span>
              <img
                className={`h-3 mt-0.5 transition-transform duration-200 invert-0 dark:invert ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                src={chevron}
                alt="chevron"
                aria-hidden="true"
              />
            </button>

            <ul
              ref={dropdownRef}
              onMouseLeave={() => setDropdownOpen(false)}
              className={`absolute right-0 mt-2 w-fit bg-background rounded-md shadow-lg py-2 border border-gray-700 *:border-b *:border-b-foreground *:last:border-b-0 *:px-4 *:py-2 *:block transition-all duration-200 origin-top-right ${
                dropdownOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="menu"
            >
              <li>
                <Switch
                  options={Themes}
                  initialValue={settings.theme}
                  onChange={(value) => setSettings("theme", value as Theme)}
                />
              </li>
              <li>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full text-left bg-background hover:bg-background/90 transition-colors focus:outline-none focus:bg-background/80"
                  role="menuitem"
                  tabIndex={dropdownOpen ? 0 : -1}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left bg-background hover:bg-background/90 transition-colors focus:outline-none focus:bg-background/80"
                  role="menuitem"
                  tabIndex={dropdownOpen ? 0 : -1}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <UserEditModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
