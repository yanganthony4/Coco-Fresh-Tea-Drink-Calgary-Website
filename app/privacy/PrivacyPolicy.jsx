import { ArrowRight } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#FF5C28] mb-8">Privacy Policy</h1>

        <div className="space-y-8">
          <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <p className="mb-4">
              This privacy policy will help you understand how CoCo Fresh Tea & Juice Ontario uses and protects the data
              you provide to us when you visit our website.
            </p>
            <p>
              We reserve the right to change this policy at any given time, of which you will be promptly updated. If
              you want to make sure that you are up to date with the latest changes, we advise you to frequently visit
              this page.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              What User Data We Collect
              <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
            </h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="mb-4">When you visit the website, we may collect the following data:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Your IP address.</li>
                <li>Your contact information and email address.</li>
                <li>Other information such as interests and preferences.</li>
                <li>Data profile regarding your online behaviour on our website.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              Why We Collect Your Data
              <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
            </h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="mb-4">We are collecting your data for several reasons:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>To better understand your needs.</li>
                <li>To improve our services and products.</li>
                <li>To send you promotional emails containing the information we think you will find interesting.</li>
                <li>To contact you to fill out surveys and participate in other types of market research.</li>
                <li>To customize our website according to your online behaviour and personal preferences.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              Safeguarding and Securing the Data
              <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
            </h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p>
                CoCo Fresh Tea & Juice Ontario is committed to securing your data and keeping it confidential. We have
                done all in our power to prevent data theft, unauthorized access, and disclosure by implementing the
                latest technologies and software, which help us safeguard all the information we collect online.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              Our Cookie Policy
              <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
            </h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg space-y-4">
              <p>
                Once you agree to allow our website to use cookies, you also agree to use the data it collects regarding
                your online behaviour (analyze web traffic, web pages you spend the most time on, and websites you
                visit).
              </p>
              <p>
                The data we collect by using cookies is used to customize our website to your needs. After we use the
                data for statistical analysis, the data is completely removed from our systems.
              </p>
              <p>
                Please note that cookies don't allow us to gain control of your computer in any way. They are strictly
                used to monitor which pages you find useful and which you do not so that we can provide a better
                experience for you.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              Links to Other Websites
              <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
            </h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p>
                Our website contains links that lead to other websites. If you click on these links CoCo Fresh Tea &
                Juice Ontario is not held responsible for your data and privacy protection. Visiting those websites is
                not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the
                website you go to from our website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              Restricting the Collection of your Personal Data
              <ArrowRight className="h-6 w-6 text-[#FF5C28]" />
            </h2>
            <div className="bg-[#FFB485] rounded-md p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="mb-4">
                At some point, you might wish to restrict the use and collection of your personal data. You can achieve
                this by doing the following:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>
                  When you are filling the forms on the website, make sure to check if there is a box that you can leave
                  unchecked, if you don't want to disclose your personal information.
                </li>
                <li>
                  If you have already agreed to share your information with us, feel free to contact us via email and we
                  will be more than happy to change this for you.
                </li>
              </ul>
              <p>
                CoCo Fresh Tea & Juice Ontario will not lease, sell or distribute your personal information to any third
                parties unless we have your permission. We might do so if the law forces us. Your personal information
                will be used when we need to send you promotional materials if you agree to this privacy policy.
              </p>
            </div>
          </section>

          <p className="text-sm text-gray-600 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

