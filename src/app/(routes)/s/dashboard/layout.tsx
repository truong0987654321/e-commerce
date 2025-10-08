import { SidebarProvider } from "@/components/ui/sidebar/sidebar";
import { SidebarWrapper } from "./sidebar-wrapper";
import { Metadata } from "next";
import { ActivityBar } from "./activity-bar";
import "./create-product/create-product.css"
import { SellerProvider } from "./seller-provider";
export const metadata: Metadata = {
    title: "Dashboard - NamLong",
    description: "NamLong",
};

export default async function SDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SellerProvider>
            <SidebarProvider>
                <SidebarWrapper />
                {children}
                <ActivityBar />
            </SidebarProvider>
        </SellerProvider>
    )
}