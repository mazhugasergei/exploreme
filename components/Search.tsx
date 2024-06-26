"use client"

import Image from "next/image"
import SectionTitle from "./SectionTitle"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Search({ className }: { className?: string }) {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams.toString())

	const [searchValue, setSearchValue] = useState(params.get("search") || "")

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		if (!searchValue) params.delete("search")
		else params.set("search", searchValue)
		history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`)
	}, [searchValue])

	return (
		<div className={`flex justify-between gap-[2rem] ${className}`}>
			<SectionTitle title="Validators" />
			<div className="md:w-full max-w-[33.125rem] flex bg-[#181818] border-[0.0625rem] border-[#222] rounded-[0.1875rem]">
				<label htmlFor="search" className="w-[3.25rem] h-[2rem] grid place-items-center">
					<Image src="/search.svg" alt="" width={14} height={14} />
				</label>
				<input
					id="search"
					type="text"
					placeholder="Search validator"
					className={`${
						searchValue ? "w-full pr-[1.15625rem]" : "w-0 text-center pr-0"
					} focus:w-full focus:text-left focus:pr-[1.15625rem] flex-1 bg-transparent outline-none placeholder-[#DADADA]/20 text-[0.8125rem] transition`}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
		</div>
	)
}
