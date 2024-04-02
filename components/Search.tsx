"use client"

import Image from "next/image"
import SectionTitle from "./SectionTitle"

interface Search {
	search: string
	setSearch: (search: string) => void
	className?: string
}

export default function Search({ search, setSearch, className }: Search) {
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
						search ? "w-full pr-[1.15625rem]" : "w-0 text-center pr-0"
					} focus:w-full focus:text-left focus:pr-[1.15625rem] flex-1 bg-transparent outline-none placeholder-[#DADADA]/20 text-[0.8125rem] transition`}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
		</div>
	)
}
