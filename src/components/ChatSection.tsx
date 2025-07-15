// 🌿 ValueProposition.tsx
// A component expressing technology alignment — declaratively rendering trust-building pillars.

type ValueCard = {
  title: string
  description: string
}

const VALUE_CARDS: ValueCard[] = [
  {
    title: 'Big Tech Experience',
    description:
      'Enterprise-grade solutions adapted for your small business, without the corporate price tag.',
  },
  {
    title: 'Built for Growth',
    description:
      'Systems designed to scale with you - no more outgrowing your tech every 12 months.',
  },
  {
    title: 'No Black Boxes',
    description:
      'Clear explanations and full control over your tools - I train you to use everything.',
  },
  {
    title: 'Right-Sized Solutions',
    description:
      'Only what you need today, with a roadmap for where you want to be tomorrow.',
  },
]

function renderCard({ title, description }: ValueCard) {
  return (
    <div
      key={title}
      className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:border-blue-200 transition-colors"
    >
      <div className="flex items-start">
        <div className="bg-blue-100 p-1.5 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
          <p className="text-gray-600 text-xs">{description}</p>
        </div>
      </div>
    </div>
  )
}

function renderHeader() {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">
        Technology That <span className="text-blue-600">Works For You</span>
      </h2>
      <p className="text-gray-600">
        Custom solutions for Goldsboro businesses ready to level up
      </p>
    </div>
  )
}

function renderDisclaimer() {
  return (
    <div className="mt-8 text-center bg-blue-50 rounded-lg p-4 border border-blue-100">
      <p className="text-gray-700 text-sm">
        <span className="font-medium text-blue-600">The sweet spot:</span> Between consumer tools that don't scale and
        enterprise systems you can't afford.
      </p>
    </div>
  )
}

export default function ValueProposition() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {renderHeader()}

        <div className="grid gap-5 sm:grid-cols-2">
          {VALUE_CARDS.map(renderCard)}
        </div>

        {renderDisclaimer()}
      </div>
    </section>
  )
}
