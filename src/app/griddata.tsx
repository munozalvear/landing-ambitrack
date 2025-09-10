import Hour from "@/app/hour";
import City from "@/app/city";
export default function Griddata() {
  return (
    <section className="flex gap-8 flex-col max-w-4xl mx-auto pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <div className="bg-white dark:bg-gray-800 border border-black/50 dark:border-white/50 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wider">
            Hora Actual
          </div>
          <Hour />
        </div>
        <div className="bg-white dark:bg-gray-800 border border-black/50 dark:border-white/50 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wider">
            Ubicación
          </div>
          <City />
        </div>
        <div className="bg-white dark:bg-gray-800 border border-black/50 dark:border-white/50 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
          <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 uppercase tracking-wider">
            Fecha
          </div>
          <h3 className='text-2xl lg:text-3xl font-extrabold text-center text-black dark:text-white'>
            {new Date().toLocaleDateString('es-CO', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </h3>
        </div>
      </div>
    </section>
  );
}
