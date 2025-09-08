import Hour from "@/app/hour";
import City from "@/app/city";
export default function Griddata() {
    return(
        <section className="flex flex-col max-w-4xl mx-auto pb-36">
            <div className="flex flex-col">
                <h2 className="text-7xl font-extrabold text-center mb-12">Hora:</h2>

                <div className="py-24 border mb-24 rounded-xl flex justify-center">
                    <Hour />
                </div>
                <h2 className="text-7xl font-extrabold text-center mb-12">Fecha:</h2>
                <div className="py-24 border mb-24 rounded-xl flex justify-center">
                    <h3 className="text-7xl font-extrabold">{new Date().toLocaleDateString()}</h3>
                </div>
                <h2 className="text-7xl font-extrabold text-center mb-12">Ciudad:</h2>
                <div className="py-24 border mb-24 rounded-xl flex justify-center">
                    <City />
                </div>
            </div>
        </section>
    );
}