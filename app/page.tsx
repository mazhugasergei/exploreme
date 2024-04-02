"use client"

import Menu from "@/components/Menu"
import Search from "@/components/Search"
import SectionTitle from "@/components/SectionTitle"
import Validators from "@/components/Validators"
import ValidatorsStats from "@/components/ValidatorsStats"
import { useState } from "react"

export default function Home() {
	const [set, setSet] = useState<"active" | "inactive">("active")
	const [search, setSearch] = useState("")

	return (
		<>
			<Search {...{ search, setSearch }} className="md:hidden mb-[1.25rem]" />
			<SectionTitle title="Validators Stats" className="max-md:hidden mb-[2.5rem]" />
			<ValidatorsStats {...{ set }} />
			<Search {...{ search, setSearch }} className="max-md:hidden my-[2.5rem]" />
			<Menu {...{ set, setSet }} />
			<Validators {...{ set, search }} />
		</>
	)
}
