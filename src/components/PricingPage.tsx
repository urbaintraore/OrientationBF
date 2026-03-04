import React from 'react';
import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { Partners } from './Partners';

interface PricingPageProps {
  onStart: () => void;
}

export function PricingPage({ onStart }: PricingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto max-w-6xl px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos Offres d'Orientation</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choisis l'accompagnement qui te convient pour réussir ton avenir scolaire et professionnel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Offre Gratuite */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Découverte</h3>
              <div className="mt-4 flex items-baseline text-slate-900">
                <span className="text-5xl font-extrabold tracking-tight">Gratuit</span>
              </div>
              <p className="mt-4 text-slate-500">Pour avoir une première idée de ton orientation.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <p className="ml-3 text-base text-slate-700">Analyse de base du profil</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <p className="ml-3 text-base text-slate-700">Recommandation de la série/filière principale</p>
              </li>
              <li className="flex items-start opacity-50">
                <div className="flex-shrink-0">
                  <X className="h-6 w-6 text-slate-400" />
                </div>
                <p className="ml-3 text-base text-slate-500">Score de confiance de l'IA</p>
              </li>
              <li className="flex items-start opacity-50">
                <div className="flex-shrink-0">
                  <X className="h-6 w-6 text-slate-400" />
                </div>
                <p className="ml-3 text-base text-slate-500">Rapport PDF détaillé</p>
              </li>
              <li className="flex items-start opacity-50">
                <div className="flex-shrink-0">
                  <X className="h-6 w-6 text-slate-400" />
                </div>
                <p className="ml-3 text-base text-slate-500">Conseils stratégiques personnalisés</p>
              </li>
              <li className="flex items-start opacity-50">
                <div className="flex-shrink-0">
                  <X className="h-6 w-6 text-slate-400" />
                </div>
                <p className="ml-3 text-base text-slate-500">Liste des établissements recommandés</p>
              </li>
            </ul>

            <button 
              onClick={onStart}
              className="w-full block bg-slate-100 border border-slate-200 rounded-xl py-3 text-center font-semibold text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Commencer gratuitement
            </button>
          </motion.div>

          {/* Offre Premium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-600 relative flex flex-col"
          >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              Recommandé
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Premium</h3>
              <div className="mt-4 flex items-baseline text-slate-900">
                <span className="text-5xl font-extrabold tracking-tight">2 000</span>
                <span className="ml-1 text-xl font-semibold text-slate-500">FCFA</span>
              </div>
              <p className="mt-4 text-indigo-600 font-medium">Paiement unique, accès à vie.</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700">Tout ce qu'il y a dans l'offre Gratuite</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700 font-medium">Score de confiance de l'IA</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700 font-medium">Rapport PDF complet téléchargeable</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700">Analyse détaillée des forces et faiblesses</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700">Conseils stratégiques pour réussir</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700">Liste des meilleures écoles et universités</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="ml-3 text-base text-slate-700">Débouchés professionnels concrets</p>
              </li>
            </ul>

            <button 
              onClick={onStart}
              className="w-full block bg-indigo-600 rounded-xl py-3 text-center font-semibold text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Obtenir mon rapport complet
            </button>
            
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 text-center mb-3">Paiement sécurisé via Mobile Money</p>
              <div className="flex justify-center gap-4 items-center">
                <div className="bg-orange-500 text-white px-3 py-1 rounded font-bold text-xs">Orange Money</div>
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-xs">Moov Money</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Partners />
    </div>
  );
}
