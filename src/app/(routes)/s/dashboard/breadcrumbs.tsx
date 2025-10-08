import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb/breadcrumb";
import React from "react";

type BreadcrumbEntry = {
    name: string;
    link?: string;
};

interface BreadcrumbsProps {
    items: BreadcrumbEntry[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink>{item.link ? <a href={item.link}>{item.name}</a> : item.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb >
    )
}