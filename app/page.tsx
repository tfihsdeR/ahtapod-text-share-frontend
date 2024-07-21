import { getServerSession } from "next-auth";

export default async function Home() {
    return (
        <section className="container justify-center">
            <h1>Home</h1>
        </section>
    );
}