import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Container } from "../ui";
import { useLanguage } from "@/src/context/LanguageContext";

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.newspaper"), path: "/newspaper" },
    { name: t("nav.learning"), path: "/learning" },
    {
      name: t("nav.media"),
      path: "/media",
      children: [
        { name: t("nav.podcast"), path: "/media/podcast" },
        { name: t("nav.survey"), path: "/media/survey" },
      ],
    },
    { name: t("nav.news"), path: "/news" },
    { name: t("nav.policy"), path: "/policy" },
    { name: t("nav.partners"), path: "/partners" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <>
      {/* Верхний тонкий бар */}
      <div className="bg-brand-primary text-white py-3 border-b border-white/10 hidden lg:block">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <a
                href="#"
                className="cursor-pointer hover:text-brand-accent transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="cursor-pointer hover:text-brand-accent transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Переключатель языков: аккуратный и заметный */}
            <div className="flex gap-2 text-[11px] font-medium uppercase tracking-wider">
              <button
                onClick={() => setLanguage("ky")}
                className={cn(
                  "transition-colors",
                  language === "ky"
                    ? "text-brand-accent font-semibold"
                    : "opacity-80 hover:opacity-100 font-medium",
                )}
              >
                Кыр
              </button>
              <span className="opacity-30 font-light">|</span>
              <button
                onClick={() => setLanguage("ru")}
                className={cn(
                  "transition-colors",
                  language === "ru"
                    ? "text-brand-accent font-semibold"
                    : "opacity-80 hover:opacity-100 font-medium",
                )}
              >
                Рус
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Основной хедер */}
      <header className="sticky top-0 z-50 w-full bg-white text-brand-ink shadow-sm border-b border-gray-100">
        <Container className="flex justify-between items-center h-20">
          {/* Логотип и название сайта (чуть плотнее и жирнее для солидности) */}
          <Link
            to="/"
            className="cursor-pointer flex items-center space-x-3 shrink-0 mr-4"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 bg-brand-primary rounded-xl flex items-center justify-center p-2.5 shadow-lg shadow-brand-primary/10 transition-transform hover:scale-105">
              <Globe className="text-white w-full h-full" />
            </div>
            <div>
              <h1 className="text-brand-primary font-bold text-base md:text-lg leading-tight tracking-wide uppercase">
                {t("header.site_name")}
              </h1>
              <p className="text-[8px] md:text-[9px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">
                {t("header.portal")}
              </p>
            </div>
          </Link>

          {/* Десктопная навигация: компактная и жирная */}
          <nav className="hidden xl:flex items-center space-x-2 xl:space-x-3 shrink-0">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wide transition-all py-2 px-1.5 relative overflow-hidden whitespace-nowrap",
                    location.pathname === item.path ||
                      (item.children &&
                        item.children.some(
                          (child) => location.pathname === child.path,
                        ))
                      ? "text-brand-primary font-semibold"
                      : "text-gray-600 hover:text-brand-primary",
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transition-transform duration-300",
                      location.pathname === item.path ||
                        (item.children &&
                          item.children.some(
                            (child) => location.pathname === child.path,
                          ))
                        ? "translate-x-0"
                        : "-translate-x-full group-hover:translate-x-0",
                    )}
                  ></span>
                </Link>

                {/* Выпадающее меню подпунктов */}
                {item.children && (
                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl py-3 z-50 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              "block px-6 py-2.5 text-[10.5px] font-medium uppercase tracking-wide transition-all",
                              location.pathname === child.path
                                ? "bg-brand-primary/5 text-brand-primary font-semibold"
                                : "text-gray-600 hover:bg-slate-50 hover:text-brand-primary",
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Кнопка поиска */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-ink transition-all shadow-md shadow-brand-primary/10 hover:shadow-lg shrink-0 ml-2"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* Мобильные элементы */}
          <div className="flex items-center xl:hidden space-x-2 md:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-brand-primary"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brand-primary"
            >
              {isOpen ? (
                <X className="w-7 h-7 md:w-8 md:h-8" />
              ) : (
                <Menu className="w-7 h-7 md:w-8 md:h-8" />
              )}
            </button>
          </div>
        </Container>

        {/* Панель поиска */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl z-40 overflow-hidden"
            >
              <Container className="py-6">
                <form
                  onSubmit={handleSearch}
                  className="relative max-w-3xl mx-auto"
                >
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      t("common.search_placeholder") || "Поиск по сайту..."
                    }
                    className="w-full bg-slate-50 border border-gray-200 focus:border-brand-primary focus:bg-white rounded-2xl px-12 py-4 outline-none font-bold text-brand-ink transition-all placeholder:text-gray-400 placeholder:font-semibold"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="submit"
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 bg-brand-primary text-white px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wide hover:bg-brand-ink transition-all shadow-md shadow-brand-primary/20"
                  >
                    {t("common.find") || "Найти"}
                  </button>
                </form>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Мобильное меню */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-50 bg-white h-screen w-full flex flex-col p-6 md:p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <Globe className="text-brand-primary w-9 h-9" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
              <div className="space-y-6 pb-20 mt-6">
                {navItems.map((item) => (
                  <div key={item.path} className="space-y-3">
                    <Link
                      to={item.path}
                      onClick={() => !item.children && setIsOpen(false)}
                      className={cn(
                        "block text-xl md:text-2xl font-semibold uppercase tracking-wide leading-none transition-colors",
                        location.pathname === item.path ||
                          (item.children &&
                            item.children.some(
                              (child) => location.pathname === child.path,
                            ))
                          ? "text-brand-primary"
                          : "text-brand-ink opacity-80 hover:opacity-100",
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 border-l border-gray-100 space-y-3 mt-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "block text-base font-medium uppercase tracking-wide leading-none transition-colors",
                              location.pathname === child.path
                                ? "text-brand-primary"
                                : "text-brand-ink opacity-60 hover:opacity-100",
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
