import Link from 'next/link';
import Layout from '../app/components/Layout';

export default function Home() {
    return (
        <Layout>
            <section className="relative bg-orange-100">
              <div className="relative">
                  {/* Main Background Image */}
                  <img src="/images/homepage.png" alt="Bubble Tea" className="w-full h-auto" />

                  {/* Overlay Image */}
                  <div className="absolute inset-0">
                      <img
                          src="/images/blank.png"
                          alt="Blank filler"
                          className="absolute top-[45%] right-[2%] transform translate-y-[-72%] w-[40%] h-auto"
                      />
                  </div>
                  {/* Overlay Image 2 */}
                  <div className="absolute inset-0">
                      <img
                          src="/images/blank.png"
                          alt="Blank filler"
                          className="absolute top-[45%] right-[2%] transform translate-y-[-30%] w-[30%] h-auto"
                      />
                  </div>
                  {/* Overlay Image Slogan */}
                  <div className="absolute inset-0">
                      <img
                          src="/images/slogan.png"
                          alt="Spark Up Every Moment"
                          className="absolute top-[45%] right-[2%] transform translate-y-[-50%] w-[35%] h-auto"
                      />
                  </div>
              </div>
            </section>

            {/* Build-a-Drink Feature Promo */}
            <section className="py-12 bg-white">
                <h2 className="text-center text-3xl font-bold font-caveat text-[#653128]">
                    Can't decide? Build your own!
                </h2>
                <a href="/menu" rel="menu" style={{ textDecoration: "none" }}>
                    <p
                        className="text-center text-lg"
                        style={{
                            cursor: "pointer", 
                            color: "#FF8000",
                        }}
                    >
                        Unlimited Options!
                    </p>
                </a>
                <div className="flex justify-center space-x-6 mt-8">
                    {["ChocoDream", "grapefruit", "bsmt", "popping", "matcha"].map((drink, index) => {
                        const imageSizes = [
                            { width: "200px", height: "260px" }, // ChocoDream
                            { width: "200px", height: "260px" }, // grapefruit
                            { width: "180px", height: "260px" }, // bsmt
                            { width: "180px", height: "240px" }, // popping
                            { width: "180px", height: "260px" }, // matcha
                        ];

                        return (
                            <img
                                key={index}
                                src={`/images/${drink}.png`}
                                alt={`Drink ${index + 1}`}
                                style={{
                                    width: imageSizes[index]?.width || "100px", 
                                    height: imageSizes[index]?.height || "150px", 
                                    objectFit: "cover", 
                                }}
                            />
                        );
                    })}
                </div>
            </section>



            {/* App Download Promo */}
            <section
              className="flex flex-col lg:flex-row items-center justify-between py-12 px-6"
              style={{
                  backgroundColor: "#FFF5EB",
                  padding: "3rem",
                  maxWidth: "1500px",
                  margin: "0",
                  marginLeft: "0",
              }}
            >
              <img
                  src="/images/appdownload.png"
                  alt="App Download"
                  className="object-contain"
                  style={{ width: "600px", height: "auto" }}
              />
              <div
                  className="text-center lg:text-left"
                  style={{
                      position: "relative", 
                      top: "20px", 
                      right: "300px",
                  }}
              >
                  <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#653128" }}>Pick and pay!</h2>
                  <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#653128" }}>Skip the line!</h2>
                  <h2 style={{ fontSize: "48px", fontWeight: "bold", color: "#653128" }}>Get the latest offers!</h2>
                  <a href="https://apps.apple.com/ca/app/coco-calgary/id1603524472" target="_blank" rel="app store" style={{ textDecoration: "none" }}>
                    <p
                        style={{
                            fontSize: "24px",
                            color: "#FF8000",
                            marginRight: "200px",
                            marginTop: "1px",
                            whiteSpace: "nowrap",
                            cursor: "pointer", 
                        }}
                    >
                        Download the App today!
                    </p>
                </a>
              </div>
            </section>


            {/* About CoCo */}
            <section
                className="flex flex-col lg:flex-row items-center justify-between py-12 px-6"
                style={{
                    backgroundColor: "#FFF5EB",
                    padding: "3rem",
                    maxWidth: "1500px",
                    margin: "0",
                    marginRight: "0",
                    marginLeft: "auto",
                    marginTop: "100px",
                }}
            >
                <img
                    src="/images/homelittle.png"
                    alt="Little CoCo illustration"
                    className="object-contain"
                    style={{
                        width: "1400px",
                        height: "auto",
                    }}
                />

                {/* Text Content */}
                <div
                    className="flex items-center"
                    style={{
                        position: "relative",
                        top: "240px",
                        left: "-1100px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "#653128",
                            marginRight: "20px",
                            whiteSpace: "nowrap", 
                        }}
                    >
                        Interested in the CoCo story? Learn More!
                    </h2>
                    <a href="/about" style={{ textDecoration: "none" }}>
                    <p
                        style={{
                            fontSize: "24px",
                            color: "#FF8000",
                            marginLeft: "-140px",
                            marginTop: "100px",
                            whiteSpace: "nowrap",
                            cursor: "pointer", 
                        }}
                    >
                        About Us
                    </p>
                </a>
                </div>
            </section>

            {/* Menu and Find Your CoCo */}
            <section
                className="flex justify-center items-center py-12"
                style={{
                    paddingBottom: "20px",
                }}
            >
                <div className="text-center">
                    <img
                        src="/images/menu_find.png"
                        alt="Menu and Find Your CoCo"
                        useMap="#menu-map"
                        style={{
                            width: "900px", 
                            height: "800px", 
                            objectFit: "contain", 
                        }}
                    />
                    <map name="menu-map">
                        {/* Left side of the image */}
                        <area
                            shape="rect"
                            coords="0,0,450,800" 
                            href="/menu"
                            alt="Menu"
                        />
                        {/* Right side of the image */}
                        <area
                            shape="rect"
                            coords="451,0,900,800" 
                            href="/locations"
                            alt="Find Your CoCo"
                        />
                    </map>
                </div>
            </section>

            </Layout>
    );
}
