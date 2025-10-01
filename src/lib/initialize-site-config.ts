import prisma from "./prisma"

export const initializeSiteConfig = async () => {
    try {
        const existingConfig = await prisma.siteConfig.findFirst()
        if (!existingConfig) {
            await prisma.siteConfig.create({
                data: {
                    categories: [
                        "Electronics",
                        "Fashion",
                        "Home & Kitchen",
                        "Sports & Fitness",
                    ],
                    subCategories: {
                        "Electronics": ["Mobiles", "Laptops", "Accessories", "Gaming"],
                        "Fashion": ["Men", "Women", "Kids", "Footwear"],
                        "Home & Kitchen": ["Furniture", "Appliances", "Decor"],
                        "Sports & Fitness": ["Gym Equipment", "Outdoor Sports", "Wearables"],
                    }
                }
            })
        }
    } catch (error) {
        console.log("Error initializing site config:", error)
    }
}
