export const dynamic = "force-dynamic";
import ExploreBtn from "@/components/button/ExploreBtn";
import BusinessCard from "@/components/BusinessCard";
import {connectToDatabase} from "@/lib/mongodb";
import Business from "@/models/Business";
import {FaCableCar} from "react-icons/fa6";
interface IBusinessData {
    _id: string;
    business: string;
    image: string;
    service: string;
    contact: string;
    email: string;
    createdAt?: string;
    updatedAt?: string;
}

async function getBusinesses(): Promise<IBusinessData[]> {
    try {
        await connectToDatabase();
        const businesses = await Business.find().sort({ createdAt: -1 }).lean();
        return businesses as unknown as IBusinessData[];
    } catch (error) {
        console.error("Failed to fetch businesses:", error);
        return [];
    }
}

export default async function Home() {
    const businesses: IBusinessData[] = await getBusinesses();
  return (
      <section>
        <div className={"lg:w-10/12 container mx-auto px-4 py-8"}>

              <h1 className={"text-4xl font-bold mt-8 mb-8 text-center text-white"}>Entrepreneurship Service</h1>
              <p className={"text-lg mb-6 text-center text-white"}>
                Connect with business minds that evolve. Add your business info to increase visibility, use as an event backdrop, and discover new opportunities.
              </p>
                <div className={"flex flex-col md:flex-row items-center justify-center gap-2 text-white text-center"}>
                    <FaCableCar /> Happening on Sunday, 28th June, 2026 from 9:00AM
                </div>
                <div className={'mt-7 mx-auto w-full lg:w-2/5 text-center'}>
                <ExploreBtn />
                </div>
              <div id={"business"} className={"mt-20 space-y-7"}>
                <h2 className={"text-3xl font-bold mb-6 text-start text-white"}>Featured Businesses</h2>
                <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"}>
                  {businesses.map((business: IBusinessData) => (
                      <BusinessCard key={business._id} {...business} />
                  ))}
                </div>
              </div>
        </div>
      </section>
  );
}
