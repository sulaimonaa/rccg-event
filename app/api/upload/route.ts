import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    [key: string]: string | number | boolean | object | null;
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file provided" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary with timeout
        const result = await Promise.race([
            new Promise<CloudinaryUploadResult>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        folder: "rccgevent/businesses",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                );

                uploadStream.end(buffer);
            }),
            new Promise<CloudinaryUploadResult>((_, reject) =>
                setTimeout(() => reject(new Error("Upload timeout")), 25000)
            ),
        ]);

        return NextResponse.json({
            success: true,
            url: result.secure_url,
        });
    } catch (error) {
        console.error("Upload error:", error);
        const errorMessage = error instanceof Error ? error.message : "Upload failed";
        return NextResponse.json(
            {
                success: false,
                message: errorMessage,
            },
            { status: 500 }
        );
    }
}

