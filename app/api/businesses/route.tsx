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

// GET ALL BUSINESSES
export async function GET() {
    try {
        await connectToDatabase();

        const businesses = await Business.find().sort({
            createdAt: -1,
        });

        return NextResponse.json(
            {
                success: true,
                data: businesses,
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


 // CREATE BUSINESS
export async function POST(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();

        const business = await Business.create(body);

         return NextResponse.json(
             {
                 success: true,
                 data: business,
             },
             { status: 201, headers: corsHeaders }
         );
     } catch (error) {
         // error is unknown in TypeScript catch clauses — normalize to a string message
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
