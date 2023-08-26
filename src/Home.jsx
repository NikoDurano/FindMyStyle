import React, { useState, useEffect } from "react";
import Tattooist from "./tattooistProfile.json";
import Nav from "./components/Nav.jsx";

import "./css/HomeBtn.css";

function Home() {
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [filteredTattooists, setFilteredTattooists] = useState(Tattooist);

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

  const linkDelay = (link) => {
    setTimeout(() => {
      window.open(link, "_blank");
    }, 700);
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
                  onClick={linkDelay.bind(this, tattooist.link)}
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
      </div>
    </>
  );
}

export default Home;
