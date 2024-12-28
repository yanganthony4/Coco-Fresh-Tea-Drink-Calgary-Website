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

              <p className="text-center text-lg text-orange-500">Try our new "Build a Drink" feature!</p>
              <div className="flex justify-center space-x-6 mt-8">
                  {["ChocoDream", "grapefruit", "bsmt", "popping", "matcha"].map((drink, index) => (
                      <img
                          key={index}
                          src={`/images/${drink}.png`}
                          alt={`Drink ${index + 1}`}
                          className="w-32 h-64 object-cover"
                      />
                  ))}
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
                  <p style={{ fontSize: "25px", color: "#FF8000" }}>Download the app today!</p>
              </div>
            </section>


            {/* About CoCo */}
            <section className="py-12 bg-orange-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#653128]">Interested in the CoCo story? Learn more!</h2>
                </div>
                <div className="flex justify-around">
                    <div className="text-center">
                        <img src="/images/menu:find.png" alt="Menu" className="w-24 h-24 mx-auto" />
                        <p className="mt-4 text-lg font-medium text-[#653128]">Menu</p>
                    </div>
                    <div className="text-center">
                        <img src="/images/homelittle.png" alt="Find your CoCo" className="w-24 h-24 mx-auto" />
                        <p className="mt-4 text-lg font-medium text-[#653128]">Find your CoCo</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
