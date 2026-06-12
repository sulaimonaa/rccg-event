'use client';

import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateBusiness() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Handle redirect after success
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                console.log("Redirecting to home...");
                router.push("/");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [success, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData(e.currentTarget);
            const business = formData.get("business") as string;
            const imageFile = formData.get("image") as File | null;
            const service = formData.get("service") as string;
            const contact = formData.get("contact") as string;
            const email = formData.get("email") as string;

            // Validation
            if (!business || !service || !contact || !email) {
                throw new Error("All required fields must be filled");
            }

            if (!imageFile || imageFile.size === 0) {
                throw new Error("Please upload an image");
            }

            // Upload image to Cloudinary with timeout
            let imageUrl = "";
            try {
                const uploadFormData = new FormData();
                uploadFormData.append("file", imageFile);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadFormData,
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!uploadResponse.ok) {
                    const error = await uploadResponse.json();
                    throw new Error(error.message || "Image upload failed");
                }

                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.url;
                console.log("✓ Image uploaded successfully");
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    throw new Error("Image upload timed out. Please check your connection and try again.");
                }
                throw new Error(
                    error instanceof Error ? error.message : "Failed to upload image"
                );
            }

            // Create business with timeout
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

                const response = await fetch("/api/businesses", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        business,
                        image: imageUrl,
                        service,
                        contact,
                        email,
                    }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.message || "Failed to create business");
                }

                console.log("✓ Business created successfully");
                if (formRef.current) {
                    formRef.current.reset();
                    console.log("✓ Form reset");
                }
                setSuccess(true);
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    throw new Error("Request timed out. The server is taking too long to respond. Please try again.");
                }
                throw error;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 text-white min-h-screen">
            <div className="bg-white/10 shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Add Business
                </h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-200">
                        Business created successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
                    {/* Business Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Business Name
                        </label>
                        <input
                            type="text"
                            name="business"
                            required
                            disabled={loading}
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={loading}
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={loading}
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={loading}
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            disabled={loading}
                            className="w-full bg-black/50 rounded-lg p-3 placeholder:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="info@business.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black/50 text-white py-3 rounded-lg hover:bg-black/60 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? "Creating business..." : "Create Business"}
                    </button>
                </form>
            </div>
        </div>
    );
}