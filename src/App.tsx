import React from 'react';
import { Package, ClipboardList, ArrowRight, Activity, Settings, Database, ExternalLink } from 'lucide-react';

interface AppCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  badge?: string;
  badgeColor?: 'emerald' | 'blue' | 'amber';
  iconColorClass: string;
  bgGradientClass: string;
}

const AppCard: React.FC<AppCardProps> = ({ 
  title, description, icon, url, badge, badgeColor = 'emerald', 
  iconColorClass, bgGradientClass 
}) => {
  const badgeClasses = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  return (
    <a 
      href={url} 
      className="group relative bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col active:scale-95"
    >
      <div className={`h-2 w-full ${bgGradientClass}`}></div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-xl bg-stone-50 border border-stone-100 group-hover:bg-white group-hover:scale-110 transition-transform ${iconColorClass}`}>
            {icon}
          </div>
          {badge && (
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${badgeClasses[badgeColor]}`}>
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-stone-900 tracking-tight mb-2 group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>
        <p className="text-sm font-medium text-stone-500 mb-6 flex-1 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:text-emerald-500 mt-auto">
          <span>Abrir Aplicación</span>
          <ArrowRight size={14} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-stone-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
    </a>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-black text-stone-900 tracking-tight">Divergente<span className="text-emerald-600">.</span></h1>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <span className="text-xs font-bold uppercase tracking-widest bg-stone-100 px-3 py-1 rounded-full">Workspace ALPRO</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 pt-32 pb-16 w-full animate-fadeIn">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-stone-900 tracking-tight mb-3">Ecosistema Central</h2>
          <p className="text-lg font-medium text-stone-500 max-w-2xl">
            Bienvenido al portal de lanzamiento de Divergente. Selecciona la aplicación corporativa a la que deseas acceder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp">
          <AppCard 
            title="ERP ALPRO"
            description="Motor Operativo y Punto de Venta. Control de Inventario, Recetas, Bodega de Insumos y Finanzas de la cadena."
            icon={<Package size={24} />}
            url="http://localhost:5173" 
            badge="Módulo Core"
            badgeColor="emerald"
            iconColorClass="text-emerald-600"
            bgGradientClass="bg-gradient-to-r from-emerald-500 to-emerald-400"
          />

          <AppCard 
            title="Fábrica de Formularios"
            description="Constructor dinámico de encuestas, checklists operativos y tableros métricos de respuestas."
            icon={<ClipboardList size={24} />}
            url="http://localhost:5174" 
            badge="Nueva App"
            badgeColor="blue"
            iconColorClass="text-blue-600"
            bgGradientClass="bg-gradient-to-r from-blue-500 to-blue-400"
          />

          {/* Placeholder for future systems */}
          <div className="bg-transparent rounded-2xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center p-8 text-center opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-400 mb-4">
              <Settings size={20} />
            </div>
            <h3 className="text-stone-700 font-bold mb-1">Módulo en Desarrollo</h3>
            <p className="text-xs font-medium text-stone-500">Próximamente nuevas integraciones del Ecosistema Divergente.</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs font-bold text-stone-400">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Database size={14} className="text-stone-300" />
            <span>ALPRO Data Layer v1.0.0</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-600 transition-colors flex items-center gap-1">Documentación Corporativa <ExternalLink size={10} /></a>
            <a href="#" className="hover:text-stone-600 transition-colors">Soporte TI</a>
            <span>&copy; 2026 Café Divergente</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
