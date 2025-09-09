import Hour from "@/app/hour";
import City from "@/app/city";
export default function Griddata() {
  return (
    <section className="flex gap-8 flex-col max-w-4xl mx-auto">
        <Hour />
        <City />
        <h3 className='text-6xl font-extrabold' >{new Date().toLocaleDateString()}</h3>
    </section>
  );
}
