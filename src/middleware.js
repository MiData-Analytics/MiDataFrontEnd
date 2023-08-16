import { NextResponse } from "next/server";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://midatatest.netlify.app"
    : "http://localhost:3000";

export async function middleware(req,res){
    const url = req.url
    const cookies = req.cookies
    const token = cookies.get("token");

    if(url.includes('dashboard')){
        if(!token){
            return NextResponse.redirect(`${baseUrl}/login`);
        }
    }

    if(url.includes('login') || url.includes('signup')){
        if(token){
            return NextResponse.redirect(`${baseUrl}/dashboard`)
        }
    }

    return NextResponse.next()
}
