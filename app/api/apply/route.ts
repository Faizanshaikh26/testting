import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@/lib/supabase/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function calculateAge(dob: string) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const designCategory = formData.get("designCategory") as string;
    const dob = formData.get("dob") as string;
    const portfolioLink = formData.get("portfolioLink") as string;
    const answerCollection = formData.get("answerCollection") as string;
    const answerProject = formData.get("answerProject") as string;
    const answerInspiration = formData.get("answerInspiration") as string;
    
    const resumeFile = formData.get("resume") as File;
    const portfolioImageFiles = formData.getAll("portfolioImages") as File[];

    // 1. Age Filter (Backend Logic Only)
    const age = calculateAge(dob);
    if (age >= 30) {
      // Silently discard
      return NextResponse.json({ success: true });
    }

    // 2. Upload to Cloudinary
    const uploadFile = async (file: File, folder: string) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: `fashion-hiring/${folder}` },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!.secure_url);
          }
        ).end(buffer);
      });
    };

    const resumeUrl = await uploadFile(resumeFile, "resumes");
    const portfolioImageUrls = await Promise.all(
      portfolioImageFiles.map((file) => uploadFile(file, "portfolios"))
    );

    // 3. Save to Supabase
    const supabase = await createClient();
    const { error } = await supabase.from("applications").insert({
      full_name: fullName,
      email: email,
      phone: phone,
      design_category: designCategory,
      portfolio_link: portfolioLink,
      resume_url: resumeUrl,
      portfolio_images: portfolioImageUrls,
      answer_collection: answerCollection,
      answer_project: answerProject,
      answer_inspiration: answerInspiration,
      // score and label will be handled by auto-scoring in a later step
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
