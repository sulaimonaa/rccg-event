import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Business from "@/models/Business";

// CORS headers for local and cross-origin requests
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// Handle CORS preflight requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
    });
}

// GET SINGLE BUSINESS
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const business = await Business.findById(id);

        if (!business) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Business not found",
                },
                { status: 404, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: business,
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status: 500, headers: corsHeaders }
        );
    }
}


// UPDATE BUSINESS
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const body = await request.json();

        const business = await Business.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!business) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Business not found",
                },
                { status: 404, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: business,
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status: 500, headers: corsHeaders }
        );
    }
}


// DELETE BUSINESS
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const business = await Business.findByIdAndDelete(
            id
        );

        if (!business) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Business not found",
                },
                { status: 404, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Business deleted successfully",
            },
            { status: 200, headers: corsHeaders }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            {
                success: false,
                message,
            },
            { status: 500, headers: corsHeaders }
        );
    }
}