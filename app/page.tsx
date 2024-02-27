import Image from "next/image";
import Link from "next/link";
import Header from "./components/navbar";

const getRandomItems = () => {
  const items = ["Maçã", "Banana", "Laranja", "Pera", "Abacaxi", "Melancia"];
  return items;
};

export default function Home() {
  const randomItems = getRandomItems();

  return (
    <>
      <Header />
      <main className="">
        <div className="banner min-h-screen">
          <div className="md:container mx-auto flex flex-col lg:flex-row justify-center h-screen gap-x-16 gap-y-16 lg:gap-y-0 pt-32 lg:pt-0 px-8">
            <div className="flex justify-center flex-col columns-xs lg:w-3/4">
              <h1 className="pb-4 text-5xl">Lorem Ipsum</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quidem, quod deleniti nulla atque molestias omnis officiis porro repellendus dolore harum quis, sapiente voluptatem soluta ea laboriosam earum dolores aspernatur.  

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit excepturi non natus quo obcaecati! Ex autem saepe in quisquam illum labore vel deleniti iure, perferendis modi dolore odio obcaecati.
              </p>
            </div>

            <div className="flex justify-center flex-col columns-xs w-1/2 h-screen">
              <div className="container mx-auto flex flex-col align-middle">
                <h1 className="text-2xl font-bold mb-4">Lista Aleatória</h1>
                <ul className="list-disc pl-4">
                  {randomItems.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
