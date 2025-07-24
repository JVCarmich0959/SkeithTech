
export default function Hero() {
  return (
    <section
      className="relative bg-white rounded-xl p-8 md:p-12 my-8 text-center border border-gray-200 overflow-hidden"
      aria-label="Hero section with introduction and call to action"
      data-testid="hero-section"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-gray-900 leading-tight">
          Professional AI Solutions <br className="hidden md:block"/>
          <span className="text-blue-600">for Growing Businesses</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Enterprise-grade technology implementation scaled for small businesses in Goldsboro and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-block px-6 py-3 md:px-8 md:py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200 border border-blue-600"
            aria-label="Contact for professional solutions"
          >
            Schedule Consultation
          </a>
          <a
            href="#services"
            className="inline-block px-6 py-3 md:px-8 md:py-3 rounded-md bg-white text-gray-900 font-medium hover:bg-gray-50 transition-colors duration-200 border border-gray-300"
            aria-label="View service offerings"
          >
            Our Solutions
          </a>
        </div>
      </div>
      
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f8fafc_0%,transparent_70%)] opacity-30"
        role="presentation"
      />
    </section>
  );
}
