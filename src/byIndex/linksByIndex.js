export const links = ["https://www.instagram.com/lawxtattoo/", "https://www.instagram.com/reverse_de_dante/", "https://www.instagram.com/tattooist_suf/" , "https://www.instagram.com/evexing.art/", "https://www.instagram.com/zara__tt_/"]

const linksByIndex = (index) => links[index % links.length]

export default linksByIndex