import React from 'react';
import { BookOpen, LineChart, User } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onStart?: () => void;
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
  onPricing?: () => void;
  onProjects?: () => void;
}

export function Header({ onStart, isAuthenticated, onLogin, onLogout, onPricing, onProjects }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onStart}>
          <Logo className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight text-slate-900">OrientationBF</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={onPricing} className="hover:text-indigo-600 transition-colors">
            Nos Offres
          </button>
          {isAuthenticated && (
            <button onClick={onProjects} className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Mes Projets
            </button>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button 
              onClick={onLogout}
              className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              Déconnexion
            </button>
          ) : (
            <button 
              onClick={onLogin}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Connexion
            </button>
          )}
          <button 
            onClick={onStart}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
          >
            Commencer
          </button>
        </div>
      </div>
    </header>
  );
}

interface FooterProps {
  onOpenMethodology?: () => void;
  onOpenAdmin?: () => void;
  isAdmin?: boolean;
}

export function Footer({ onOpenMethodology, onOpenAdmin, isAdmin }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="container mx-auto px-4 text-center text-slate-500">
        <p className="mb-4 text-sm">
          © {new Date().getFullYear()} OrientationBF. Plateforme d'aide à la décision pour l'orientation post-BEPC.
        </p>
        
        {isAdmin && (
          <div className="flex justify-center gap-4 mb-6 text-sm">
            {onOpenMethodology && (
              <button 
                onClick={onOpenMethodology}
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Modèles mathématiques
              </button>
            )}
            <span className="text-slate-300">|</span>
            {onOpenAdmin && (
              <button 
                onClick={onOpenAdmin}
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Tableau de bord Admin
              </button>
            )}
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Logo className="h-6 w-6 opacity-50 grayscale" />
          <BookOpen className="h-5 w-5 opacity-50" />
          <LineChart className="h-5 w-5 opacity-50" />
        </div>
      </div>
    </footer>
  );
}
