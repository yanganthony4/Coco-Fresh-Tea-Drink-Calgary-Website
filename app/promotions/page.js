import Toolbar from '../components/Toolbar';

export default function Promotions() {
    return (
        <div>
            <Toolbar />
            {/* Promotions Layout Section */}
            <section className="relative">
                <div className="relative">
                    {/* Background Image */}
                    <img
                        src="/images/promobackground.png"
                        alt="Promotions Background"
                        className="absolute top-[20%] right-[%] transform translate-y-[24%] w-[-40%] h-auto"
                    />

                    {/* Left Splash Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/left splash.png"
                            alt="Left Splash"
                            className="absolute top-[20%] left-[%] transform translate-y-[-15%] w-[60%] h-auto"
                        />
                    </div>

                    {/* Right Splash Image */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/right splash.png"
                            alt="Right Splash"
                            className="absolute top-[20%] right-[5%] transform translate-y-[-20%] w-[62%] h-auto"
                        />
                    </div>

                    {/* Center Promo Blank */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/promoblank.png"
                            alt="Promo Blank"
                            className="absolute top-[5%] left-[20%] transform translate-x-[-50%] translate-y-[-70%] w-[20%] h-auto"
                        />
                    </div>

                    {/* Leaf Left */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/leaf.png"
                            alt="Leaf Left"
                            className="absolute top-[10%] left-[15%] transform translate-y-[8%] w-[10%] h-auto"
                        />
                    </div>

                    {/* Leaf Right */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/leafright.png"
                            alt="Leaf Right"
                            className="absolute top-[10%] right-[25%] transform translate-y-[8%] w-[10%] h-auto"
                        />
                    </div>

                    {/* Bubble Gaga */}
                    <div className="absolute inset-0">
                        <img
                            src="/images/bbgg.png"
                            alt="Bubblegaga"
                            className="absolute top-[25%] left-[50%] transform translate-x-[-50%] translate-y-[1%] w-[25%] h-auto"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
