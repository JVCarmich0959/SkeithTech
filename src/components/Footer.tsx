export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 rounded-t-xl mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-white font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#ai-solutions" className="hover:text-blue-300 transition-colors">AI Solutions</a></li>
              <li><a href="#automation" className="hover:text-blue-300 transition-colors">Process Automation</a></li>
              <li><a href="#consulting" className="hover:text-blue-300 transition-colors">Tech Consulting</a></li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-white font-medium mb-4">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-blue-300 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a href="mailto:hello@skeith.dev" className="hover:text-blue-300 transition-colors">
                <span className="sr-only">Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-white font-medium mb-4">Location</h3>
            <p>Goldsboro, NC</p>
            <p className="text-sm mt-1">Serving clients nationwide</p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Skeith Technologies. All rights reserved.
            <span className="block md:inline mt-1 md:mt-0 md:ml-2">Bringing enterprise-grade solutions to growing businesses.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}