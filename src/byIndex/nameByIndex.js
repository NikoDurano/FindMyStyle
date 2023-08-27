export const links = ["lawxtattoo", "reverse_de_dante", "tattooist_suf" , "evexing.art", "zara_tt_"]

const nameByIndex = (index) => links[index % links.length]

export default nameByIndex