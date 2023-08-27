import image1 from '../imgs/carousel/BrushWork.jpg'
import image2 from '../imgs/carousel/dante2.jpg'
import image3 from '../imgs/carousel/realism.jpg'
import image4 from '../imgs/carousel/microrealism.jpg'
import image5 from '../imgs/carousel/microrealism2.jpg'


export const images = [image4, image2, image3, image1, image5]

const imageByIndex = (index) => images[index % images.length]

export default imageByIndex
