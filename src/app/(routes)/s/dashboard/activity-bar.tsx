import { ButtonIcon } from "@/components/ui/element/button"
import { SidebarActivityBar, SidebarActivityBarTopContent } from "@/components/ui/sidebar/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip/tooltip"
import { Bell, Mail, Settings } from "lucide-react"

export const ActivityBar = () => {
    return (
        <SidebarActivityBar>
            <SidebarActivityBarTopContent>
                <Tooltip tooltipPosition="left">
                    <TooltipTrigger>
                        <ButtonIcon>
                            <Mail className="text-[var(--color-sidebar-ink-2)]" />
                        </ButtonIcon>
                    </TooltipTrigger>
                    <TooltipContent >
                        Inbox
                    </TooltipContent>
                </Tooltip>
                <Tooltip tooltipPosition="left">
                    <TooltipTrigger>
                        <ButtonIcon>
                            <Settings className="text-[var(--color-sidebar-ink-2)]" />
                        </ButtonIcon>
                    </TooltipTrigger>
                    <TooltipContent >
                        Settings
                    </TooltipContent>
                </Tooltip>
                <Tooltip tooltipPosition="left">
                    <TooltipTrigger>
                        <ButtonIcon>
                            <Bell className="text-[var(--color-sidebar-ink-2)]" />
                        </ButtonIcon>
                    </TooltipTrigger>
                    <TooltipContent >
                        Notifications
                    </TooltipContent>
                </Tooltip>

            </SidebarActivityBarTopContent>
        </SidebarActivityBar>
    )
}
