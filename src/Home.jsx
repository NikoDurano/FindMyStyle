import React, { useState, useEffect } from "react";
import Tattooist from "./tattooistProfile.json";
import Nav from "./components/Nav.jsx";
import Masonry from "react-masonry-css";

function Home() {
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [filteredTattooists, setFilteredTattooists] = useState(Tattooist);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [popup, setPopup] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  console.log(selectedTags);

  const [favourites, setFavourites] = useState([]);

  const favouriteArtiest = (id) => {
    const artistIndex = favourites.indexOf(id);
    let newFavourites = [];

    if (artistIndex !== -1) {
      newFavourites = favourites.filter((favouriteId) => favouriteId !== id);
    } else {
      newFavourites = [...favourites, id];
    }

    setFavourites(newFavourites);

    // Update localStorage with the updated newFavourites array
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  // Function to handle tag selection
  const handleTagSelection = (tag) => {
    if (tag === "Favourite") {
      if (selectedTags.includes(tag)) {
        setSelectedTags([]);
      } else {
        setSelectedTags([tag]);
      }
    } else {
      if (selectedTags.includes("Favourite")) {
        setSelectedTags([tag]);
      } else {
        setSelectedTags(
          selectedTags.includes(tag)
            ? selectedTags.filter((t) => t !== tag)
            : [...selectedTags, tag]
        );
      }
    }
  };
  // Update filtered tattooists whenever selectedTags change
  useEffect(() => {
    if (selectedTags.includes("Favourite")) {
      // Filter tattooists based on favorites list
      const favoritesFiltered = Tattooist.filter((tattooist) =>
        favourites.includes(tattooist.id)
      );
      setFilteredTattooists(favoritesFiltered);
    } else if (selectedTags.length === 0) {
      // If no tags selected then display all tattooists
      setFilteredTattooists(Tattooist);
    } else {
      // Filter tattooists based on selected tags
      const filtered = Tattooist.filter((tattooist) => {
        const tagsObject = tattooist.tags[0];
        const tagsArray = Object.values(tagsObject);

        // Check if all selected tags are in the tattooist's tags
        return selectedTags.every((tag) => tagsArray.includes(tag));
      });
      setFilteredTattooists(filtered);
    }
  }, [selectedTags, favourites]);

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
    }, 200); // Adjust the delay time to match your transition duration
  };

  const closePopup = () => {
    setPopup(false);
    setTimeout(() => {
      setSelectedArtist(null);
    }, 500); // Adjust the delay time to match your transition duration
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 830) {
        setShowFilter(true);
      } else {
        setShowFilter(false);
      }
    };

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Initialize the filter visibility on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <>
      <div
        transition-style="in:wipe:down"
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

        <div
          className="HomeFilterSandwich"
          style={{
            display: "none",
            justifyContent: "center",
            alignItems: "center",

            // border: "1px solid red",
            marginTop: "20px",

            textAlign: "center",
            fontSize: "3rem",
            color: "white",
            textTransform: "uppercase",
            cursor: "pointer",

            gridArea: "HomeTagsFilter",
          }}
          onClick={toggleFilter}
        >
          Filter By Tags &nbsp;{" "}
          <span
            className="material-symbols-outlined"
            style={{
              transform: showFilter ? "scaleY(1.7)" : "scale(1)",
              transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",
            }}
          >
            menu
          </span>
        </div>

        <aside
          className="HomeTagsFilter"
          style={{
            gridArea: "HomeTagsFilter",

            overflowY: "auto",
            display: "flex",
            opacity: showFilter ? "1" : "0",
            height: showFilter ? "100%" : "0%",

            flexDirection: "column",

            transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",

            padding: "20px",
            fontSize: "1.5rem",
            color: "white",
          }}
        >
          <div
            className="HomeTagsFilterTitle"
            style={{
              fontSize: "3rem",
              textAlign: "center",
              textTransform: "uppercase",

            }}
          >
            Filter by Tags
          </div>
          <ul style={{}}>
            <li key="Favourite">
              <button
                className={`Homebtn Homefrom-left ${
                  selectedTags.includes("Favourite") ? "selected" : ""
                }`}
                onClick={() => handleTagSelection("Favourite")}
              >
                Favourites
              </button>
            </li>

            {allTags.map((tag) => (
              <li key={tag}>
                <button
                  className={`Homebtn Homefrom-left ${
                    selectedTags.includes(tag) ? "selected" : ""
                  }`}
                  onClick={() => handleTagSelection(tag)}
                  disabled={selectedTags.includes("Favourite") || !showFilter}
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
            overflowY: "auto",
            flexGrow: "1",
    
          }}
        >
          {sortedFilteredTattooists.length === 0 ? (
            <div
              transition-style="in:wipe:down"
              className="HomeNone"
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
                  transition-style="in:wipe:right"
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
          transition-style="in:wipe:left"
          className="HomePopupMaster"
          style={{
            position: "absolute",

            right: "0",

            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            opacity: popup ? "1" : "0",
            zIndex: popup ? "3" : "-1",

            transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",
          }}
          onClick={() => {
            closePopup();
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

                  zIndex: "1",
                }}
              ></div>

              <div
                transition-style="in:wipe:left"
                className="HomePopupCon"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 50px",
                  gridTemplateRows: "100px 1fr",
                  gridTemplateAreas: `
              "HomePopupInfo HomePopupInfo HomeFav"
              "HomePopupArtCon HomePopupArtCon HomePopupArtCon"
              `,

                  backgroundColor: "rgba(0,0,0,1)",

                  position: "absolute",
                  zIndex: "2",
                  overflowY: "auto",

                  right: "0",
                  height: "100%",
                  width: "500px",
                }}
              >
                <a
                  className="HomePopupInfo"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gridArea: "HomePopupInfo",
                    marginTop: "50px",
                    height: "100%",

                    textDecoration: "none",
                  }}
                  href={selectedArtist.link}
                  target="_blank"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
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
                      letterSpacing: "0.5rem",
                      textTransform: "uppercase",

                      transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",

                      padding: "10px",
                      position: "relative",
                    }}
                  >
                    {selectedArtist.name}
                    <span></span>
                  </div>
                </a>

                <div
                  className="HomeFav"
                  style={{
                    gridArea: "HomeFav",
                    color: favourites.includes(selectedArtist.id)
                      ? "red"
                      : "white",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",

                    transition: "all 500ms cubic-bezier(0.77, 0, 0.175, 1)",

                    height: "100%",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    favouriteArtiest(selectedArtist.id);
                    e.stopPropagation();
                  }}
                >
                  <div>
                    <span className="material-symbols-outlined">favorite</span>
                  </div>
                </div>

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
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {getTattooistWork(selectedArtist.id).map(
                      (workImage, index) => (
                        <img
                          className="HomePopupArt"
                          key={index}
                          src={workImage}
                          alt={`work-${index}`}
                          style={
                            {
                              // width: "200px",
                              // height: "200px",
                              // margin: "10px",
                            }
                          }
                        />
                      )
                    )}
                  </Masonry>
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
