import QuizGame from "@/app/questions/game";
export default function Game() {
    return (
        <section className=" flex flex-col max-w-4xl dark: mx-auto mt-6" >
            <QuizGame />
        </section>
    );
}
