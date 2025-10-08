"use client";

import { SidebarHeader, SidebarHeaderButton, SidebarHeaderMessage, SidebarHeaderText, SidebarMain } from "@/components/ui/sidebar/sidebar"
import React, { useState } from "react"
import { Breadcrumbs } from "../breadcrumbs"
import { ROUTES } from "@/constants/routes";
import { useDiscount } from "@/hooks/use-discount";
import { AlertTriangle, X } from "lucide-react";
import apiClient from "@/lib/api-client";
import { API_ROUTES } from "@/constants/api-routes";
import { Table, TableBody, TableHead, TableHeadEmpty, TableHeader, TableRow } from "@/components/ui/table/table";
import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { useSellerContext } from "@/contexts/seller-context";
import { Input } from "@/components/ui/element/input";
import { Button, ButtonIcon, ButtonSave } from "@/components/ui/element/button";
import { cn } from "@/lib/utils/cn";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogClosed, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog/alert-dialog";
import { useAsyncHandler } from "@/hooks/use-async-handler";
import { useFormHandler } from "@/hooks/use-form-handler";

export default function DiscountCodesPage() {
    const { discounts, isLoading: isDiscountsLoading } = useDiscount()
    const { seller } = useSellerContext();

    const createDiscountCodeHandler = useAsyncHandler();
    const deletesHandler = useAsyncHandler();

    const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

    const handleSelectAll = () => {
        if (selectedDiscounts.length === discounts.length) {
            // Nếu đang chọn hết → bỏ chọn hết
            setSelectedDiscounts([]);
        } else {
            // Nếu chưa chọn hết → chọn toàn bộ ID
            setSelectedDiscounts(discounts.map((d) => d.id));
        }
    };
    const handleSelectOne = (id: string) => {
        setSelectedDiscounts((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id) // nếu đã chọn → bỏ chọn
                : [...prev, id] // nếu chưa chọn → thêm vào
        );
    };

    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const pageItems = [
        { name: "Dashboard", link: ROUTES.DASHBOARD.SELLER_DASHBOARD },
        { name: "Discount Codes" },
    ];

    const { form, handleChange, resetForm } = useFormHandler({
        publicName: "",
        discountType: "percentage",
        discountValue: "",
        discountCode: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const createDiscountCode = () => {
        createDiscountCodeHandler.run(
            () => apiClient.post(API_ROUTES.PRODUCT.CREATE_DISCOUNT_CODE, {
                ...form,
                sellerId: seller.id,
            }),
            {
                onSuccess: (response) => {
                    if (response.data.success) {
                        resetForm()
                        setShowModal(false);
                    }
                },
                onError: (message) => {
                    console.error("Failed to create discount code:", message);
                }
            }
        )
    }
    const handleSubmit = () => {
        if (discounts.length >= 8) {
            console.log("You can only create up to 8 discount codes.")
            return
        }
        createDiscountCode();
    }

    const handleDeletes = async () => {
        deletesHandler.run(
            () => apiClient.post(API_ROUTES.PRODUCT.DELETE_DISCOUNT_CODE, { ids: selectedDiscounts }),
            {
                onSuccess(response) {
                    if (response.data?.deletedIds) {
                        window.location.reload();
                    }
                },
                onError(message) {
                    console.error("Failed to delete discount codes:", message);
                },
            }
        )
    }
    return (
        <>
            <SidebarHeader
                className="h-18 border border-x-0 border-t-0 border-solid border-b-[var(--color-sidebar-border-line)]"
                style={{ paddingBottom: 0, margin: 0 }}
            >
                <SidebarHeaderMessage>
                    <SidebarHeaderText>
                        <div className="flex flex-col gap-1 item">
                            <h2 className="text-2xl font-semibold text-left">Discount Codes</h2>
                            <Breadcrumbs items={pageItems} />
                        </div>
                    </SidebarHeaderText>
                </SidebarHeaderMessage>
                <SidebarHeaderButton
                    onClick={() => setShowModal(true)}
                >
                    + Create Discount
                </SidebarHeaderButton>
            </SidebarHeader>
            <SidebarMain>
                <div className="mb-16 mt-8 px-[calc(3*8px)]">
                    <div className="p-[calc(3*8px)] rounded-2xl pb-10">
                        <div className="mb-2">
                            <div className="border-card_after m-0 overflow-clip w-full">
                                <div className="flex items-center relative min-h-14 w-full !p-0 z-[11]">
                                    <div className={cn(
                                        "flex items-center justify-between relative min-h-[3.5rem] text-[var(--color-table-text)] w-full mx-auto !p-0",
                                        selectedDiscounts.length > 0 ? "bg-[var(--color-checkbox-bg)]" : "bg-[var(--color-table-bg)]"
                                    )}
                                    >
                                        {selectedDiscounts.length > 0 ? (
                                            <>
                                                <div className="flex flex-row items-center gap-2">
                                                    <div className="ml-3">
                                                        <ButtonIcon
                                                            sizeIcon="text-[1.25rem] p-2 text-white"
                                                            onClick={() => setSelectedDiscounts([])}
                                                        >
                                                            <X />
                                                        </ButtonIcon>
                                                    </div>
                                                    <div className="flex flex-row items-center justify-end pr-2">
                                                        <Button
                                                            onClick={() => setIsOpen(true)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-[1_1_auto] flex-row justify-end mr-3">
                                                    <span className="text-white text-sm/[3.5rem] ml-4">{selectedDiscounts.length} selected</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-row items-center gap-4 relative w-auto text-base font-normal ml-3 p-2">
                                                Your Discount Codes
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex flex-col flex-1">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="h-8 font-semibold">
                                                    <TableHead className="w-20 pl-6">
                                                        <div className="inline-flex relative aspect-square h-full">
                                                            <div className="inline-flex items-center align-middle">
                                                                <Checkbox
                                                                    id="checkbox-select-all"
                                                                    checked={selectedDiscounts.length === discounts.length && discounts.length > 0}
                                                                    onChange={handleSelectAll}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TableHead>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Value</TableHead>
                                                    <TableHead>Code</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {isDiscountsLoading ? (
                                                    <TableHeadEmpty
                                                        className="min-h-[120px] p-6 font-normal"
                                                        colSpan={5}
                                                    >
                                                        Loading Discount...
                                                    </TableHeadEmpty>
                                                ) : !isDiscountsLoading && discounts?.length === 0 ? (
                                                    <TableHeadEmpty
                                                        className="min-h-[120px] p-6 font-normal"
                                                        colSpan={5}
                                                    >
                                                        No Discount Codes Avalable!
                                                    </TableHeadEmpty>
                                                ) : (
                                                    discounts.map((discount) => (
                                                        <TableRow
                                                            key={discount.id}
                                                            className="h-12 font-normal"
                                                        >
                                                            <TableHead className="w-20 pl-6">
                                                                <Checkbox
                                                                    id={`checkbox-${discount.id}`}
                                                                    checked={selectedDiscounts.includes(discount.id)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    onChange={() => handleSelectOne(discount.id)}
                                                                />
                                                            </TableHead>
                                                            <TableHead>{discount.publicName}</TableHead>
                                                            <TableHead>
                                                                {discount.discountType === "percentage" ? "Percentage (%)" : "Flat ($)"}
                                                            </TableHead>
                                                            <TableHead>
                                                                {discount.discountType === "percentage"
                                                                    ? `${discount.discountValue}%`
                                                                    : `$${discount.discountValue}`}
                                                            </TableHead>
                                                            <TableHead>{discount.discountCode}</TableHead>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <div className="fixed top-0 left-0 size-full bg-black/50 flex items-center justify-center z-[9999]">
                        <div className="bg-white p-6 rounded-lg w-[28.125rem] shadow-lg">
                            <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                                <h3 className="text-xl text-black">Create Discount Code</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-black/50"
                                >
                                    <X size={22} />
                                </button>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-4"
                            >
                                <Input
                                    label="Title (Public Name)"
                                    required
                                    name="publicName"
                                    value={form.publicName}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Public Name"
                                />
                                <h2 className="font-bold mb-4 mt-2">Discount Type</h2>
                                <select
                                    name="discountType"
                                    value={form.discountType}
                                    onChange={handleChange}
                                    className="block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none"
                                >
                                    <option value="percentage" >Percentage (%)</option>
                                    <option value="flat" >Flat Amount ($)</option>

                                </select>
                                <div className="mt-2">
                                    <Input
                                        label="Discount Value"
                                        required
                                        name="discountValue"
                                        value={form.discountValue}
                                        onChange={handleChange}
                                        type="number"
                                        placeholder="Discount Value"
                                    />
                                </div>
                                <div className="mt-2">
                                    <Input
                                        label="Discount Code"
                                        required
                                        name="discountCode"
                                        value={form.discountCode}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Discount Code"
                                    />
                                </div>
                                <ButtonSave
                                    disabled={createDiscountCodeHandler.isLoading}
                                    type="submit"
                                    text={createDiscountCodeHandler.isLoading ? "Creating..." : "Create"}
                                />
                            </form>
                        </div>
                    </div>
                )}
            </SidebarMain>
            <AlertDialog open={isOpen} setOpen={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">Delete Selected Discounts?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to permanently delete{" "}
                            <strong>{selectedDiscounts.length}</strong> discount
                            {selectedDiscounts.length > 1 ? "s" : ""}?
                        </AlertDialogDescription>
                        <div className=" flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <AlertTriangle className="text-red-600 w-5 h-5" />
                            <p className="text-sm text-red-700 font-medium">
                                This action cannot be undone.
                            </p>
                        </div>
                        <AlertDialogClosed ><X size={20} /></AlertDialogClosed>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={deletesHandler.isLoading}
                            onClick={handleDeletes}
                            style={{ width: "5rem" }}
                        >{deletesHandler.isLoading ? "" : "Delete"}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
