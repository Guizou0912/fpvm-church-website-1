"use client";

import { ArrowRight, Building2, Heart, Users } from 'lucide-react';

export default function ConstructionSection() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 rounded-3xl" />
      
      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 animate-fadeInUp">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp animate-delay-100">
            Notre Projet de
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Construction
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
            Aidez-nous à construire un sanctuaire moderne où la communauté peut se rassembler dans la foi et l'amour
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image */}
          <div className="animate-fadeInLeft">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-1.5 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
                  alt="Projet de construction de l'église"
                  className="w-full h-80 sm:h-96 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 animate-fadeInRight">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">75%</div>
                <div className="text-gray-600 font-medium">Complété</div>
              </div>
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">€250K</div>
                <div className="text-gray-600 font-medium">Objectif</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/60 transition-all duration-300">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Capacité 500 personnes</h4>
                  <p className="text-gray-600 text-sm">Un espace moderne pour accueillir toute notre communauté</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/60 transition-all duration-300">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Heart className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Centre communautaire</h4>
                  <p className="text-gray-600 text-sm">Espaces dédiés aux activités familiales et jeunesse</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                <Heart className="h-5 w-5 group-hover:animate-pulse" />
                Faire un don
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}