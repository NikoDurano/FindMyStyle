import Tattooist from "./tattooistProfile.json";

function Home() {
  return (
    <>
      <div
        className="HomeMainCon"
        style={{
          display: "grid",
          gridTemplateColumns: "150px 1fr",
          gridTemplateRows: "100px 1fr 1fr",
          gridTemplateAreas: `
        "HomeSearch HomeSearch"
        "HomeTagsFilter HomeTattooistProfileCon"
        "HomeTagsFilter HomeTattooistProfileCon"

        `,

          height: "100%",
        }}
      >
        <div
          className="HomeSearch"
          style={{
            border: "1px solid red",
            gridArea: "HomeSearch",
          }}
        >
          search
        </div>

        <aside
          className="HomeTagsFilter"
          style={{
            border: "1px solid blue",
            gridArea: "HomeTagsFilter",
          }}
        >
          tag filter
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
          }}
        >
          {Tattooist &&
            Tattooist.map((tattooist) => {
              return (
                <div
                  className="HomeTattooistBox"
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
                  }}
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

                  <a
                    className="HomeTattooistName"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      marginLeft: "10px",
                    }}
                    href={tattooist.link}
                    target="_blank"
                  >
                    {tattooist.name}
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
