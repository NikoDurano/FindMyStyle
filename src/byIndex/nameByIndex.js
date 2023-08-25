export const links = ["evexing.art", "reverse_de_dante", "tattooist_suf" , "lawxtattoo", "zara_tt_"]

const nameByIndex = (index) => links[index % links.length]

export default nameByIndex