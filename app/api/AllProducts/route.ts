import { AllProducts } from "@/lib/AllProducts";

export async function GET() {
    
    return Response.json(AllProducts)
}