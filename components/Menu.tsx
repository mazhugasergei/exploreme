interface Menu {
	set: "active" | "inactive"
	setSet: (set: "active" | "inactive") => void
}

export default function Menu({ set, setSet }: Menu) {
	return (
		<div className="md:border-b-[0.0625rem] border-[#222] my-[1.25rem] md:my-[2.5rem]">
			<div className="relative isolate md:max-w-[24.5rem] max-md:bg-[#161616] max-md:rounded-[0.1875rem] mx-auto">
				<div
					className={`pointer-events-none absolute md:bottom-0 z-[-1] h-full md:h-[0.125rem] w-[50%] bg-[#2A64BC] max-md:border-[0.0625rem] border-[#1F6FEB] ${
						set === "active" ? "border-r-0" : "border-l-0"
					} rounded-[inherit] ${set === "active" ? "rounded-e-none" : "rounded-s-none"} transform ${
						set === "active" ? "translate-x-0" : "translate-x-[100%]"
					} transition`}
				/>
				<ul className="grid grid-cols-2">
					<li>
						<button
							className={`w-full text-[0.8125rem] md:text-[1.125rem] leading-[1.25rem] md:leading-[1.58375rem] py-[0.1875rem] md:py-[0.625rem] transition ${
								set === "inactive" && "text-[#707070]"
							} ${set === "active" && "md:text-[#4E95FF]"}`}
							onClick={() => setSet("active")}
						>
							Active
						</button>
					</li>
					<li>
						<button
							className={`w-full text-[0.8125rem] md:text-[1.125rem] leading-[1.25rem] md:leading-[1.58375rem] py-[0.1875rem] md:py-[0.625rem] transition ${
								set === "active" && "text-[#707070]"
							} ${set === "inactive" && "md:text-[#4E95FF]"}`}
							onClick={() => setSet("inactive")}
						>
							Inactive
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}
