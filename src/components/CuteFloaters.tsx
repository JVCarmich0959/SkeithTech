export default function AmbientElements() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
      {/* Subtle geometric floating elements */}
      <div className="absolute top-[15%] left-[10%] w-[80px] h-[80px] rounded-lg opacity-5 bg-blue-600 animate-float-slow delay-[0s] transform rotate-12" />
      <div className="absolute top-[65%] right-[15%] w-[120px] h-[120px] rounded-full opacity-[0.03] bg-gray-800 animate-float-delay delay-[3s]" />
      <div className="absolute bottom-[20%] left-[20%] w-[60px] h-[60px] opacity-[0.04] bg-blue-400 animate-float-delay delay-[5s] transform -rotate-12" />
      
      {/* Very subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  )
}