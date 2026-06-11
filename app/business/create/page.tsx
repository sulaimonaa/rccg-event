import { connectToDatabase } from "@/lib/mongodb";
import Business from "@/models/Business";
import { redirect } from "next/navigation";
import CreateBtn from "@/components/button/CreateBtn";

async function handleSubmit(formData: FormData) {
    "use server";

    const business = formData.get("business") as string;
    const imageFile = formData.get("image") as File | null;
    const service = formData.get("service") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;

    if (!business || !service || !contact || !email) {
        throw new Error("All required fields must be filled");
    }

    if (!imageFile || imageFile.size === 0) {
        throw new Error("Please upload an image");
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    try {
        const fileFormData = new FormData();
        fileFormData.append("file", imageFile);

        const uploadResponse = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/upload`,
            {
                method: "POST",
                body: fileFormData,
            }
        );

        if (!uploadResponse.ok) {
            const error = await uploadResponse.json();
            throw new Error(error.message || "Image upload failed");
        }

        const uploadResult = await uploadResponse.json();
        imageUrl = uploadResult.url;
    } catch (error) {
        throw new Error(
            error instanceof Error ? error.message : "Failed to upload image"
        );
    }

    await connectToDatabase();

    const newBusiness = await Business.create({
        business,
        image: imageUrl,
        service,
        contact,
        email,
    });

    if (newBusiness) {
        redirect("/");
    }
}

export default function CreateBusiness() {

    return (
        <div className="max-w-2xl mx-auto p-6 text-white">
            <div className="bg-white/10 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Add Business
                </h1>

                <form action={handleSubmit} className="space-y-4">
                    {/* Business Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Business Name
                        </label>
                        <input
                            type="text"
                            name="business"
                            required
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300"
                            placeholder="ABC Technologies"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Business Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300"
                        />
                    </div>

                    {/* Service */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Service
                        </label>
                        <input
                            type="text"
                            name="service"
                            required
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300"
                            placeholder="Web Development"
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Contact
                        </label>
                        <input
                            type="text"
                            name="contact"
                            required
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300"
                            placeholder="+2348012345678"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300"
                            placeholder="info@business.com"
                        />
                    </div>

                    <CreateBtn />
                </form>
            </div>
        </div>
    );
}