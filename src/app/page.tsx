import Herologo from "@/app/herologo";
import Griddata from "@/app/griddata";
import Departments from "@/app/departments";
import Technology from "@/app/technology";

export default function Home() {
  return (
    <div>
        <Herologo />
        <Departments />
        <Technology />
        <Griddata />
    </div>
  );
}
