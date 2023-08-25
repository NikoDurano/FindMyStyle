import image1 from '../imgs/carousel/BrushWork.jpg'
import image2 from '../imgs/carousel/blackwork.jpg'
import image3 from '../imgs/carousel/realism.jpg'
import image4 from '../imgs/carousel/microrealism.jpg'
import image5 from '../imgs/carousel/microrealism2.jpg'


export const images = [image1, image2, image3, image4, image5]

const imageByIndex = (index) => images[index % images.length]

export default imageByIndex
