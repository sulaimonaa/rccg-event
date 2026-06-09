import ExploreBtn from "@/components/button/ExploreBtn";
import BusinessCard from "@/components/BusinessCard";
const businesses = [
  {
    business: 'donadex technology',
    image: '/d.jpeg',
    service: 'travels',
    contact: '07036168688',
    email: 'donadexnet@gmail.com'
  },
  {
    business: 'donadex travels',
    image: '/d.jpeg',
    service: 'travels',
    contact: '07036168688',
    email: 'donadexnet@gmail.com'
  }
]

export default function Home() {
  return (
      <section>
        <div className={"lg:w-10/12 container mx-auto px-4 py-8"}>

              <h1 className={"text-4xl font-bold mt-8 mb-4 text-center text-white"}>Welcome to Business Service</h1>
              <p className={"text-lg mb-6 text-center text-white"}>
                Connect with business minds that evolve. Upload your business and discover new opportunities.
              </p>
                <div className={'mt-7 mx-auto w-full lg:w-2/5 text-center'}>
                <ExploreBtn />
                </div>
              <div id={"business"} className={"mt-20 space-y-7"}>
                <h2 className={"text-3xl font-bold mb-6 text-start text-white"}>Featured Businesses</h2>
                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"}>
                  {businesses.map((business) => (
                      <BusinessCard key={business.business} {...business} />
                  ))}
                </div>
              </div>
        </div>
      </section>
  );
}
