import { SidebarProvider } from "@/components/ui/sidebar/sidebar";
import { SidebarWrapper } from "./sidebar-wrapper";
import { Metadata } from "next";
import { ActivityBar } from "./activity-bar";
import "./create-product/create-product.css"
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
        <SidebarProvider>
            <SidebarWrapper />
            {children}
            <ActivityBar />
        </SidebarProvider>
    )
}