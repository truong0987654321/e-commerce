import { SidebarHeader, SidebarHeaderButton, SidebarHeaderIcon, SidebarHeaderMessage, SidebarHeaderText, SidebarMain } from '@/components/ui/sidebar/sidebar'
import { useDiscount } from '@/hooks/use-discount'
import React from 'react'

export default function DiscountCodesPage() {
    const { discounts, isLoading, isError } = useDiscount()

    return (
        <>
            <SidebarHeader>
                <SidebarHeaderMessage>
                    <SidebarHeaderIcon>
                        abc
                    </SidebarHeaderIcon>
                    <SidebarHeaderText>
                        and
                    </SidebarHeaderText>
                </SidebarHeaderMessage>
                <SidebarHeaderButton>
                    create
                </SidebarHeaderButton>
            </SidebarHeader>
            <SidebarMain>

            </SidebarMain>
        </>
    )
}
