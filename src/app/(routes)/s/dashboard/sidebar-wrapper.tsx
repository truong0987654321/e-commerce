"use client"

import { EllipsisTooltip } from "@/components/ui/ellipsis-tooltip"
import { LoaderAvatar, LoaderContainer, LoaderContent, LoaderLine } from "@/components/ui/loader/loader"
import { Sidebar, SidebarContainer, SidebarItem, SidebarItemContainer, SidebarItemContent, SidebarItemContentIcon, SidebarItemContentLabel, SidebarItemHighlight, SidebarItemTitle, SidebarLogo, SidebarLogoIcon, SidebarLogoText, SidebarToggleButton, SidebarToggleButtonIcon } from "@/components/ui/sidebar/sidebar"
import { ROUTES } from "@/constants/routes"
import { useSellerContext } from "@/contexts/seller-context"
import { ChevronRight, LayoutDashboard, Leaf, ListOrdered, PackageSearch, SquarePlus, WalletCards } from "lucide-react"

export const SidebarWrapper = () => {
    const { seller, isLoading } = useSellerContext()
    return (
        <Sidebar>
            <SidebarContainer>
                <SidebarLogo className="py-0 px-5 h-18">
                    {!isLoading && seller ? (
                        <>
                            <SidebarLogoIcon>
                                <Leaf />
                            </SidebarLogoIcon>
                            <SidebarLogoText >
                                {seller?.shop.name}
                                <EllipsisTooltip className="font-medium text-xs text-[var(--color-sidebar-logo-text)] mb-2 w-[10.5rem]" >
                                    {seller?.shop.address}
                                </EllipsisTooltip>
                            </SidebarLogoText>
                        </>
                    ) : (
                        <LoaderContainer className="w-50 max-[1313px]:gap-0">
                            <LoaderAvatar className="size-9 bg-gray-300" />
                            <LoaderContent className="[&>*]:bg-gray-300">
                                <LoaderLine className="h-5 w-full" />
                                <LoaderLine className="h-4 w-4/5" />
                            </LoaderContent>
                        </LoaderContainer>
                    )}
                </SidebarLogo>
                <SidebarItemContainer>
                    <SidebarItemHighlight>
                        <SidebarItem href={ROUTES.DASHBOARD.SELLER_DASHBOARD} tooltip="Dashboard">
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <LayoutDashboard />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label="Dashboard" />
                            </SidebarItemContent>
                        </SidebarItem>
                    </SidebarItemHighlight>

                    <SidebarItemTitle title={"Main Menu"}>
                        <SidebarItem href="//" tooltip="Orders">
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <ListOrdered />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label="Orders" />
                            </SidebarItemContent>
                        </SidebarItem>
                        <SidebarItem
                            href={"//"}
                            tooltip="Payments"
                        >
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <WalletCards />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label={"Payments"} />
                            </SidebarItemContent>
                        </SidebarItem>
                    </SidebarItemTitle>

                    <SidebarItemTitle title={"Products"}>
                        <SidebarItem href={ROUTES.DASHBOARD.SELLER_CREATE_PRODUCT} tooltip="Create Product">
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <SquarePlus />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label="Create Product" />
                            </SidebarItemContent>
                        </SidebarItem>
                        <SidebarItem
                            href={"//"}
                            tooltip="All Products"
                        >
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <PackageSearch />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label={"All Products"} />
                            </SidebarItemContent>
                        </SidebarItem>
                    </SidebarItemTitle>
                    <SidebarItemTitle title={"Events"}>
                        <SidebarItem href="//" tooltip="Create Event">
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <SquarePlus />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label="Create Event" />
                            </SidebarItemContent>
                        </SidebarItem>
                        <SidebarItem
                            href={"//"}
                            tooltip="All Events"
                        >
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <PackageSearch />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label={"All Events"} />
                            </SidebarItemContent>
                        </SidebarItem>
                    </SidebarItemTitle>
                    <SidebarItemTitle title={"Extras"}>
                        <SidebarItem href={ROUTES.DASHBOARD.SELLER_DISCOUNT_CODES} tooltip="Discount Codes">
                            <SidebarItemContent>
                                <SidebarItemContentIcon>
                                    <SquarePlus />
                                </SidebarItemContentIcon>
                                <SidebarItemContentLabel label="Discount Codes" />
                            </SidebarItemContent>
                        </SidebarItem>
                    </SidebarItemTitle>
                </SidebarItemContainer>

                <SidebarToggleButton
                    className="text-[1.5rem]"
                >
                    <SidebarToggleButtonIcon>
                        <ChevronRight />
                    </SidebarToggleButtonIcon>
                </SidebarToggleButton>
            </SidebarContainer>
        </Sidebar >
    )
}
