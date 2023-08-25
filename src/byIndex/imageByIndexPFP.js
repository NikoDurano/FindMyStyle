import image1 from '../imgs/pfp/evexing.jpg'
import image2 from '../imgs/pfp/dante.jpg'
import image3 from '../imgs/pfp/suf.jpg'
import image4 from '../imgs/pfp/law.jpg'
import image5 from '../imgs/pfp/zara.jpg'


export const images = [image1, image2, image3, image4, image5]

const imageByIndexPFP = (index) => images[index % images.length]

export default imageByIndexPFP