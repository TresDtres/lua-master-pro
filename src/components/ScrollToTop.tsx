"use client";

export default function ScrollToTop() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-full flex items-center justify-center text-white shadow-lg transition transform hover:scale-110 opacity-80 hover:opacity-100"
      title="Volver arriba"
      aria-label="Volver arriba"
    >
      ↑
    </button>
  );
}
