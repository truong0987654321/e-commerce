"use client"

import { ButtonIcon } from "@/components/ui/element/button";
import { SidebarHeader, SidebarHeaderButton } from "@/components/ui/sidebar/sidebar";
import { Mail } from "lucide-react";

export default function TestPage() {
    return (
        <>
            <ButtonIcon>
                <Mail className="text-[var(--theme-color-ink-2)]" />
            </ButtonIcon>
            <SidebarHeader>
                <SidebarHeaderButton>
                    <Mail className="text-[var(--theme-color-ink-2)]" />
                </SidebarHeaderButton>

            </SidebarHeader>
        </>
    );
}
