export default function VerseSection(): JSX.Element {
  return (
    <section id="verset" aria-labelledby="verset-title" className="relative w-full py-16 md:py-24">
      {/* Bottom gradient scrim to echo hero's softened bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="group relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-medium hover:border-white/20 hover:bg-black/40 transition-all duration-300 px-6 md:px-10 py-10 md:py-14">
          
          {/* Eyebrow Label */}
          <h2 id="verset-title" className="text-sm font-medium text-white/60 mb-6 tracking-wide">
            Verset fondateur de l'Église
          </h2>
          
          {/* Verse Content */}
          <div className="space-y-6">
            {/* Malagasy Line */}
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed">
              <em>Tamin'ny voalohany ny Teny, ary ny Teny tao amin'Andriamanitra, ary ny Teny dia Andriamanitra.</em>
            </p>
            
            {/* Reference */}
            <p className="text-white/80 text-sm tracking-wider uppercase font-medium">
              JAONA 1:1
            </p>
            
            {/* French Line */}
            <p className="text-white text-base md:text-lg leading-relaxed">
              "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu."
            </p>
          </div>
          
          {/* Animated Accent Underline */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-16 md:w-24 bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 rounded-full transition-all duration-500 group-hover:w-40 md:group-hover:w-56" />
        </div>
      </div>
    </section>
  );
}