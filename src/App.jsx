
import EmblaCarousel from './components/EmblaCarousel'
import Hero from './components/Hero'
import backgroundImg from './imgs/tattoos/backTattoo.png'



import './css/base.css'
import './css/embla.css'
import './css/sandbox.css'
import './css/reponsive.css'


const OPTIONS = { align: 'start', dragFree: false, loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const App = () => (
<>

  <div className='main'
  style={{
    display: "flex",
    backgroundColor: "#212325",
    backgroundImage: ` url(${backgroundImg})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left",
    height: "100vh",
    position: "relative",

  }}
  >

  <Hero />
  <div className='sandboxholder'>
  <main className="sandbox"
  style={{
    position: "absolute",
    right: "0",
    zIndex: "1",
  }}
  >
    
    <section className="sandbox__carousel">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </section>
  </main>
  </div>
  <div
  
  style={{
    position: "absolute",
    bottom: "0",
    left: "0",
    zIndex: "1",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    padding: "10px",
    // backgroundColor: "rgba(0,0,0,0.5)",

  
  }}
  >

    Background image from: <a href="https://www.instagram.com/tattooist_judas/" target='_blank' style={{
      color: "white",
      textDecoration: "none",
    }}>tattooist_judas</a>
  </div>
  </div>
  </>
)

export default App
