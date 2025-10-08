"use client"

import { useState } from "react";
import ImageUploader from "./image-uploader";
import { Input } from "@/components/ui/element/input";
import { Textarea } from "@/components/ui/element/textarea";
import { ColorSelector } from "./color-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";
import {
    DollarSign,
    Info,
    Layers,
    Settings,
    ShieldCheck,
    Sliders,
    Truck
} from "lucide-react";
import { CustomProperties } from "./custom-properties";
import { CustomSpecifications } from "./custom-specifications";
import { useCategories } from "@/hooks/use-categories";
import { ProductDescription } from "./product-description";
import { SizeSelector } from "./size-selector";
import { ButtonSave } from "@/components/ui/element/button";
import { SidebarHeader, SidebarHeaderMessage, SidebarHeaderText, SidebarMain } from "@/components/ui/sidebar/sidebar";
import { Breadcrumbs } from "../breadcrumbs";
import { ROUTES } from "@/constants/routes";

export default function CreateProductPage() {

    const { data, isLoading, isError } = useCategories()

    const [files, setFiles] = useState<File[]>([]);

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState<string>("");
    const [videoUrl, setVideoUrl] = useState("");
    const [regularPrice, setRegularPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [tags, setTags] = useState("");
    const [warranty, setWarranty] = useState("");
    const [slug, setSlug] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState("");
    const [color, setColor] = useState("#000000");
    const [size, setSize] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedSubCategory, setSelectedSubCategory] = useState("")

    const [specs, setSpecs] = useState<{ name: string; value: string }[]>([]);
    const [properties, setProperties] = useState<{ id: string; label: string; values: string[] }[]>([]);

    const categories = data?.categories ?? []
    const subCategories = data?.subCategories ?? {}

    const handleSubmit = () => {
        console.log("Product Description HTML:", description);
    };

    const pageItems = [
        { name: "Dashboard", link: ROUTES.DASHBOARD.SELLER_DASHBOARD },
        { name: "Create Product" },
    ];
    return (<>
        <SidebarHeader
            className="h-18 border border-x-0 border-t-0 border-solid border-b-[var(--color-sidebar-border-line)]"
            style={{ paddingBottom: 0, margin: 0 }}
        >
            <SidebarHeaderMessage>
                <SidebarHeaderText>
                    <div className="flex flex-col gap-1 item">
                        <h2 className="text-2xl font-semibold text-left">Create Product</h2>
                        <Breadcrumbs items={pageItems} />
                    </div>
                </SidebarHeaderText>
            </SidebarHeaderMessage>
        </SidebarHeader>
        <SidebarMain>
            <div className={`mb-16 px-[calc(3*8px)]`} >
                <div className="flex flex-wrap">
                    <div className="flex flex-col flex-[0_0_auto] w-full mt-8 gap-[calc(4*8px)]">
                        <div className="bg-white p-[calc(3*8px)] rounded-2xl pb-10">
                            <div className="mb-2">
                                <Input
                                    label="Product Title *"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Enter product title"
                                />
                            </div>
                            <div className="mb-4">
                                <ImageUploader
                                    images={files}
                                    setImages={setFiles}
                                />
                            </div>
                            <div className="mb-4">
                                <Textarea
                                    className="focus:border-[#3874ff]"
                                    label="Short Description * (Max 150 words)"
                                    value={shortDescription}
                                    maxLength={150}
                                    placeholder="Enter product description for quick view"
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    height={150}
                                />
                            </div>
                            <div className="mb-2">
                                <h2 className="text-lg font-semibold mb-4">Detailed Description * (Min 100 words)</h2>
                                <ProductDescription onChange={setDescription} />
                            </div>

                            <div className="my-8 ">
                                <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                                <Tabs
                                    defaultValue="general"
                                    className="w-full max-w-4xl mx-auto border-b border-t"
                                    activeClassName="text-black tabs-active"
                                    inactiveClassName="text-black/30"
                                >
                                    <div className="md:flex-[0_0_auto] md:w-1/3 w-full max-w-full">
                                        <TabsList className="h-full flex flex-row md:flex-col md:border-b-0 md:border-r md:[&>*]:border-b max-md:[&>*]:border-r md:[&>*:last-child]:border-b-0 max-md:[&>*:last-child]:border-r-0" >
                                            <TabsTrigger
                                                value="general"
                                                className="flex flex-wrap items-center gap-2 outline-none shadow-none p-[.875rem_.5rem] flex-1 font-bold text-[.8rem] relative max-md:justify-center"
                                            >
                                                <Info />
                                                <span className="md:inline hidden">General</span>

                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="pricing"
                                                className="flex flex-wrap items-center gap-2 outline-none shadow-none p-[.875rem_.5rem] flex-1 font-bold text-[.8rem] relative max-md:justify-center"
                                            >
                                                <DollarSign />
                                                <span className="md:inline hidden">Pricing</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="variants"
                                                className="flex flex-wrap items-center gap-2 outline-none shadow-none p-[.875rem_.5rem] flex-1 font-bold text-[.8rem] relative max-md:justify-center"
                                            >
                                                <Layers />
                                                <span className="md:inline hidden">Variants</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="warranty"
                                                className="flex flex-wrap items-center gap-2 outline-none shadow-none p-[.875rem_.5rem] flex-1 font-bold text-[.8rem] relative max-md:justify-center"
                                            >
                                                <ShieldCheck />
                                                <span className="md:inline hidden">Warranty & Shipping</span>
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="custom"
                                                className="flex flex-wrap items-center gap-2 outline-none shadow-none p-[.875rem_.5rem] flex-1 font-bold text-[.8rem] relative max-md:justify-center"
                                            >
                                                <Settings />
                                                <span className="md:inline hidden">Custom Attributes</span>
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent
                                        className="[&>*]:mb-2 [&>*:last-child]:mb-0 h-[20rem] overflow-y-auto tabs-container"
                                        value="general"
                                    >
                                        <Input
                                            label="Slug *"
                                            required
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            type="text"
                                            placeholder="product_sludg"
                                        />
                                        <Input
                                            label="Video URL"
                                            required
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                            type="text"
                                            placeholder="https://www.youtube.com/embed/xyz123"
                                        />
                                        <h2 className="text-lg font-semibold mb-2">Category *</h2>
                                        {isLoading ? (
                                            <p className="text-gray-400">Loading categories...</p>
                                        ) : isError ? (
                                            <p className="text-red-500">Failes to load categories</p>
                                        ) : (
                                            <select
                                                value={selectedCategory}
                                                onChange={(e) => {
                                                    setSelectedCategory(e.target.value)
                                                    setSelectedSubCategory("")
                                                }}
                                                className="block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none"
                                            >
                                                <option value="" disabled>-- Select Category --</option>
                                                {categories?.map((categories: string) => (
                                                    <option
                                                        key={categories}
                                                        value={categories}
                                                        className="bg-white text-gray-900 hover:bg-gray-100 checked:bg-[#44b3e3] checked:text-white"
                                                    >{categories}</option>
                                                ))}
                                            </select>
                                        )}
                                        <h2 className="text-lg font-semibold mb-2">SubCategory *</h2>
                                        {isLoading ? (
                                            <p className="text-gray-400">Loading subcategories...</p>
                                        ) : isError ? (
                                            <p className="text-red-500">Failes to load subcategories</p>
                                        ) : (
                                            <select
                                                value={selectedSubCategory}
                                                onChange={(e) => setSelectedSubCategory(e.target.value)}
                                                className="block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none"
                                            >
                                                <option value="" disabled>-- Select SubCategory --</option>
                                                {selectedCategory &&
                                                    subCategories[selectedCategory]?.map((sub: string) => (
                                                        <option key={sub} value={sub}>
                                                            {sub}
                                                        </option>
                                                    ))}
                                            </select>
                                        )}
                                        <Input
                                            label="Brand"
                                            required
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                            type="text"
                                            placeholder="Apple"
                                        />
                                        <Input
                                            label="Tags *"
                                            required
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            type="text"
                                            placeholder="apple,flagship"
                                        />

                                    </TabsContent>
                                    <TabsContent
                                        className="[&>*]:mb-2 [&>*:last-child]:mb-0 h-[20rem] overflow-y-auto tabs-container"
                                        value="pricing"
                                    >
                                        <Input
                                            label="Regular Price"
                                            required
                                            value={regularPrice}
                                            onChange={(e) => setRegularPrice(e.target.value)}
                                            type="text"
                                            placeholder="20$"
                                        />
                                        <Input
                                            label="Sale Price *"
                                            required
                                            value={salePrice}
                                            onChange={(e) => setSalePrice(e.target.value)}
                                            type="text"
                                            placeholder="15$"
                                        />
                                        <Input
                                            label="Stock *"
                                            required
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            type="text"
                                            placeholder="100"
                                        />
                                        <h2 className="text-lg font-semibold mb-4">Select Discount Codes (optional)</h2>

                                        <h4 className="font-bold mb-4">Cash on delivery</h4>
                                        <select
                                            className="block border-solid border border-[#cbd0dd] rounded-[.375rem] bg-white text-[#31374a] text-[.8rem]/[1.49] font-normal p-[.5rem_1rem] w-full focus:border-[#3874ff] focus-visible:outline-none"
                                            defaultValue="yes"
                                        >
                                            <option
                                                value="yes"
                                                className="bg-white text-gray-900 hover:bg-gray-100 checked:bg-[#44b3e3] checked:text-white"
                                            >
                                                Yes
                                            </option>
                                            <option value="no">No</option>
                                        </select>

                                    </TabsContent>
                                    <TabsContent
                                        className="[&>*]:mb-2 [&>*:last-child]:mb-0 h-[20rem] overflow-y-auto tabs-container"
                                        value="variants"
                                    >
                                        <h2 className="text-lg font-semibold mb-4">Sizes</h2>
                                        <SizeSelector onChange={setSize} />

                                        <ColorSelector
                                            value={color}
                                            onChange={(c) => {
                                                setColor(c);
                                                console.log("Selected color:", c);
                                            }}
                                        />

                                    </TabsContent>
                                    <TabsContent
                                        className="[&>*]:mb-2 [&>*:last-child]:mb-0 h-[20rem] overflow-y-auto tabs-container"
                                        value="warranty"
                                    >
                                        <Input
                                            label="Warranty *"
                                            required
                                            value={warranty}
                                            onChange={(e) => setWarranty(e.target.value)}
                                            type="text"
                                            placeholder="1 Year/No Warranty"
                                        />
                                    </TabsContent>
                                    <TabsContent
                                        className="[&>*]:mb-2 [&>*:last-child]:mb-0 h-[20rem] overflow-y-auto tabs-container"
                                        value="custom"
                                    >
                                        <CustomProperties onChange={setProperties} />
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <h3 className="text-md font-semibold mb-2">Current Properties:</h3>
                                        </div>
                                        <CustomSpecifications onChange={setSpecs} />
                                        <div className="p-4 border rounded-lg bg-gray-50">
                                            <h3 className="text-md font-semibold mb-2">Current Specifications:</h3>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                            <ButtonSave
                                text="Create"
                            />
                        </div>
                    </div>
                </div>
            </div >
        </SidebarMain>
    </>

    )
}
