import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-orange-300 py-6 text-white w-full">
      <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Row 1: Social Media + Handle/Search Box */}
        <div className="flex items-center space-x-4 justify-center">
          <Link
            href="https://www.instagram.com/cocobubbletea.calgary/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Image
              src="/images/art/instalogow.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="hover:opacity-80"
            />
          </Link>

          <Link
            href="https://www.tiktok.com/@cocoteacalgary?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Image
              src="/images/art/tiktok.svg"
              alt="TikTok"
              width={28}
              height={28}
              className="hover:opacity-80"
            />
          </Link>

          <div className="flex items-center border-2 border-white rounded-md overflow-hidden">
            <span className="px-3 py-1 text-white">@cocobubbleteacalgary</span>
            <Link
              href="https://www.facebook.com/cococalgary/"
              className="bg-white p-1.5"
              aria-label="Search"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/art/searchlogo.svg"
                alt="Search"
                width={20}
                height={20}
                className="text-orange-400"
                style={{ color: "#f15a24" }}
              />
            </Link>
          </div>
        </div>

        {/* Row 2: Privacy Policy & Accessibility Links */}
        <div className="flex space-x-6 items-center justify-center font-sora uppercase">
          <Link href="/privacy" className="text-white hover:underline">
            Privacy Policy
          </Link>
          <Link href="/accessibility" className="text-white hover:underline">
            Accessibility
          </Link>
        </div>

        {/* Row 3: Copyright */}
        <div className="text-sm text-white">©2025 Coco Bubble Tea Calgary</div>
      </div>
    </footer>
  );
}
