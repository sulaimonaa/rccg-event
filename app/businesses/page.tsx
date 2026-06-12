import Image from "next/image";
import { connectToDatabase } from "@/lib/mongodb";
import Business from "@/models/Business";

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

export default async function BusinessesPage() {
    const businesses: IBusinessData[] = await getBusinesses();

    if (!businesses || businesses.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Businesses</h1>
                <p className="text-gray-500">No businesses found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl lg:w-10/12 mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white"></h1>

            <div className="overflow-x-auto bg-black/50 shadow rounded">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-black/25">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">Logo</th>
                            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">Business Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">Service</th>
                            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">Contact</th>
                            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-black/50 divide-y divide-gray-200">
                        {businesses.map((business: IBusinessData) => (
                            <tr key={business._id}>
                                <td className="px-6 py-4 whitespace-nowrap w-28">
                                    {business.image ? (
                                        <div className="relative w-20 h-12 bg-gray-200 rounded overflow-hidden">
                                            <a
                                                href={business.image}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                            <Image src={business.image} alt={business.business} fill className="relative object-cover" sizes="80px" />
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No image</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-white text-center">{business.business}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{business.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{business.contact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{business.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}