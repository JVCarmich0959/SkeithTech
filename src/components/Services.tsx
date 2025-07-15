export default function Services() {
  const services = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ), 
      title: 'Process Automation', 
      desc: 'Simple bots and tools that handle your repetitive tasks, saving you 5-15 hours per week.' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Business Tools', 
      desc: 'Custom apps that fit your exact workflow - no more struggling with generic software.' 
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      ),
      title: 'Data Made Simple', 
      desc: 'Dashboards that show exactly what matters to your business, updated automatically.' 
    },
  ]

  return (
    <section id="services" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Technology That Works For You</h2>
          <p className="text-gray-600">
            Practical solutions for Goldsboro businesses - no tech jargon, just results
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-gray-50 rounded-lg border border-gray-200 p-5 hover:border-blue-300 transition-colors duration-200"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-lg bg-blue-50 text-blue-600">
                {icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            <span className="font-medium text-blue-600">No over-engineering:</span> I build what you actually need, with clear explanations and support.
          </p>
        </div>
      </div>
    </section>
  )
}