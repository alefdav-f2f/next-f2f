import Header from "../components/navbar"

export default function About(){
  return(
    <>
    <Header/>
    <main>
      <div className="banner min-h-screen">
          <div className="md:container mx-auto flex justify-center h-screen gap-x-16">
            <div className="flex justify-center flex-col columns-xs w-screen gap-y-8">
              <h1 className="pb-4 text-5xl">Lorem Ipsum</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio neque animi quia similique reprehenderit expedita vero voluptates excepturi at, repudiandae, harum adipisci asperiores ea, fugiat veritatis soluta! Numquam, blanditiis cumque.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, laudantium totam? Nulla quod rem ut velit nisi? Rem aspernatur porro amet repudiandae, nam, soluta eius quod explicabo obcaecati voluptatibus eos.
              </p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident illo quis eligendi maiores omnis iusto, debitis eveniet exercitationem consequuntur at commodi quo vel vitae est nemo temporibus minima libero mollitia!
              </p>
            </div>
          </div>
        </div>
    </main>
    </>
  )
}
