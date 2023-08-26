import React, { useState, useEffect } from "react";
import Tattooist from "./tattooistProfile.json";
import Nav from "./components/Nav.jsx";

import "./css/HomeBtn.css";

function Home() {
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [filteredTattooists, setFilteredTattooists] = useState(Tattooist);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [popup, setPopup] = useState(false);

  // Function to handle tag selection
  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      // If tag already selected then remove tag from selected
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // If tag not selected then add tag to selected
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Update filtered tattooists whenever selectedTags change
  useEffect(() => {
    if (selectedTags.length === 0) {
      // If no tags selected then display all tattooists
      setFilteredTattooists(Tattooist);
    } else {
      // If tags selected then filter tattooists
      const filtered = Tattooist.filter((tattooist) => {
        const tagsObject = tattooist.tags[0];
        const tagsArray = Object.values(tagsObject);

        // Check if all selected tags are in the tattooist's tags
        return selectedTags.every((tag) => tagsArray.includes(tag));
      });
      setFilteredTattooists(filtered);
    }
  }, [selectedTags]);

  // Get all tags from all tattooists
  const allTags = Array.from(
    new Set(Tattooist.flatMap((tattooist) => Object.values(tattooist.tags[0])))
  ).sort();

  // Sort filtered tattooists by name
  const sortedFilteredTattooists = filteredTattooists
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  // Define a function to get all of a tattooist's work based on their ID
  const getTattooistWork = (tattooistId) => {
    const tattooist = Tattooist.find((artist) => artist.id === tattooistId);

    if (tattooist) {
      return tattooist.work.map((work) => Object.values(work)[0]);
    }

    return [];
  };

  // Inside your component, you can call this function when an artist is clicked
  const artistClick = (id) => {
    setTimeout(() => {
    const clickedArtist = Tattooist.find((artist) => artist.id === id);
    if (clickedArtist) {
      setSelectedArtist(clickedArtist);
      const artistWork = getTattooistWork(id);
      setPopup(true);
      // Do something with the artist's work array
      console.log(artistWork);
    }
  }, 500); // Adjust the delay time to match your transition duration
  };

  const closePopup = () => {
    setPopup(false);
    setTimeout(() => {
      setSelectedArtist(null);
    }, 500); // Adjust the delay time to match your transition duration
  };

  return (
    <>
      <div
        className="HomeMainCon"
        style={{
          display: "grid",
          gridTemplateColumns: "350px 1fr",
          gridTemplateRows: "100px 1fr 1fr",
          gridTemplateAreas: `
        "HomeNav HomeNav"
        "HomeTagsFilter HomeTattooistProfileCon"
        "HomeTagsFilter HomeTattooistProfileCon"

        `,

          height: "100%",
          position: "relative",

          backgroundColor: "#212325",
          background:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, #212325 50%,#212325 60%,#212325 100%)",
        }}
      >
        <Nav />

        <aside
          className="HomeTagsFilter"
          style={{
            gridArea: "HomeTagsFilter",
            overflowY: "auto",

            padding: "20px",
            fontSize: "1.5rem",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            Filter by Tags
          </div>
          <ul style={{}}>
            {allTags.map((tag) => (
              <li key={tag}>
                <button
                  className={`Homebtn Homefrom-left ${
                    selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => handleTagSelection(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div
          className="HomeTattooistProfileCon"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "flex-start",

            gridArea: "HomeTattooistProfileCon",

            padding: "20px",
            marginTop: "50px",
          }}
        >
          {sortedFilteredTattooists.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20px",

                fontSize: "3rem",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              No artists match the selected tags.
            </div>
          ) : (
            sortedFilteredTattooists.map((tattooist) => {
              return (
                <div
                  className="HomeTattooistBox HomeTattooistBox-center"
                  key={tattooist.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",

                    padding: "20px",
                    margin: "10px",

                    border: "1px solid black",

                    width: "fit-content",
                    height: "fit-content",

                    textDecoration: "none",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%,#212325 100%)",
                  }}
                  target="_blank"
                  onClick={artistClick.bind(this, tattooist.id)}
                >
                  <div
                    className="HomeTattooistPFP"
                    style={{
                      height: "50px",
                      width: "50px",
                    }}
                  >
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={tattooist.pfp}
                      alt="pfp"
                    />
                  </div>

                  <div
                    className="HomeTattooistName"
                    style={{
                      textDecoration: "none",

                      marginLeft: "10px",
                    }}
                  >
                    {tattooist.name}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div
          className="HomePopupMaster"
          style={{
            position: "absolute",

            right: "0",
            
            
            
       

            width: popup ? "100%" : "0%",
            height: popup ? "100%" : "0%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

           

            opacity: popup ? "1" : "0",
            zIndex: popup ? "2" : "-1",
            transform: popup ? "  translateX(0px)" : "translateX(220px)",

            transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",
          }}
        >
          {selectedArtist && (
            <>
              <div
                className="HomePopupBG"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backgroundColor: "rgba(0,0,0,0.5)",

                  opacity: popup ? "1" : "0",
                  transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",

                  zIndex: "1",
                }}
                onClick={() => {
                  closePopup();
                }}
              ></div>

              <div
                className="HomePopupCon"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "100px 1fr",
                  gridTemplateAreas: `
              "HomePopupInfo HomePopupInfo"
              "HomePopupArtCon HomePopupArtCon"
              `,

                  backgroundColor: "rgba(0,0,0,1)",

                  position: "absolute",
                  zIndex: "1",

                  right: "0",
                  height: "100%",
                  width: "500px",
                  transform: popup ? "  translateX(0px)" : "translateX(220px)",
                  transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",
                }}
              >
                <a
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gridArea: "HomePopupInfo",
                    marginTop: "50px",

                    textDecoration: "none",
                  }}
                  href={selectedArtist.link}
                  target="_blank"
                >
                  <div
                    className="HomePopupPFP"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      overflow: "hidden",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "20px",
                    }}
                  >
                    <img
                      src={selectedArtist.pfp}
                      alt="pfp"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    className="HomePopupName"
                    style={{
                      color: "white",
                      fontSize: "2rem",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      letterSpacing: "1.1rem",
                      textTransform: "uppercase",

                      margin: "20px",
                    }}
                  >
                    {selectedArtist.name}
                  </div>
                </a>

                <div
                  className="HomePopupArtCon"
                  style={{
                    gridArea: "HomePopupArtCon",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignContent: "stretch",
                    justifyContent: "space-evenly",

                    padding: "20px",
                    marginTop: "50px",
                    overflowY: "auto",
                  }}
                >
                  {getTattooistWork(selectedArtist.id).map(
                    (workImage, index) => (
                      <img
                        className="HomePopupArt"
                        key={index}
                        src={workImage}
                        alt={`work-${index}`}
                        style={{
                          width: "200px",
                          height: "200px",
                          margin: "5px",
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
