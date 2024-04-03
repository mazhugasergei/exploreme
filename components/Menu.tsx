"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function Menu() {
	const searchParams = useSearchParams()
	const params = new URLSearchParams(searchParams.toString())

	return (
		<div className="md:border-b-[0.0625rem] border-[#222] my-[1.25rem] md:my-[2.5rem]">
			<div className="relative isolate md:max-w-[24.5rem] max-md:bg-[#161616] max-md:rounded-[0.1875rem] mx-auto">
				<div
					className={`pointer-events-none absolute md:bottom-0 z-[-1] h-full md:h-[0.125rem] w-[50%] bg-[#2A64BC] max-md:border-[0.0625rem] border-[#1F6FEB] ${
						params.get("set") === "active" ? "border-r-0" : "border-l-0"
					} rounded-[inherit] ${params.get("set") === "active" ? "rounded-e-none" : "rounded-s-none"} transform ${
						params.get("set") === "active" ? "translate-x-0" : "translate-x-[100%]"
					} transition`}
				/>
				<ul className="grid grid-cols-2">
					<li>
						<Link
							href={`/?set=active${params.get("search") ? `&search=${params.get("search")}` : ""}`}
							className={`block text-center text-[0.8125rem] md:text-[1.125rem] leading-[1.25rem] md:leading-[1.58375rem] py-[0.1875rem] md:py-[0.625rem] transition ${
								params.get("set") === "inactive" && "text-[#707070]"
							} ${params.get("set") === "active" && "md:text-[#4E95FF]"}`}
						>
							Active
						</Link>
					</li>
					<li>
						<Link
							href={`/?set=inactive${params.get("search") ? `&search=${params.get("search")}` : ""}`}
							className={`block text-center text-[0.8125rem] md:text-[1.125rem] leading-[1.25rem] md:leading-[1.58375rem] py-[0.1875rem] md:py-[0.625rem] transition ${
								params.get("set") === "active" && "text-[#707070]"
							} ${params.get("set") === "inactive" && "md:text-[#4E95FF]"}`}
						>
							Inactive
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
