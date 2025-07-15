export default function Process() {
  const steps = [
    { 
      number: 1, 
      title: 'Understand Your Needs', 
      desc: 'We start by listening - I will learn about your pain points and goals through a simple consultation.' 
    },
    { 
      number: 2, 
      title: 'Right-Sized Plan', 
      desc: 'A clear roadmap with quick wins and long-term strategy, all explained in plain English.' 
    },
    { 
      number: 3, 
      title: 'Build Together', 
      desc: 'Hands-on implementation with training included - you will understand how everything works.' 
    },
    { 
      number: 4, 
      title: 'Grow & Adapt', 
      desc: 'Ongoing support to tweak systems as your business evolves, with no long-term contracts.' 
    },
  ]

  return (
    <section id="process" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">How We'll Work Together</h2>
          <p className="text-gray-600">
            A straightforward process designed for small business owners
          </p>
        </div>
        
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, title, desc }) => (
            <div
              key={number}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-200 transition-colors"
            >
              <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full bg-blue-600 text-white font-medium text-sm">
                {number}
              </div>
              <h3 className="font-semibold mb-2 text-gray-900 text-center text-sm">{title}</h3>
              <p className="text-gray-600 text-xs text-center">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            No confusing tech jargon - just solutions you can actually use and understand.
          </p>
        </div>
      </div>
    </section>
  )
}