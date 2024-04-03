import Menu from "@/components/Menu"
import Search from "@/components/Search"
import SectionTitle from "@/components/SectionTitle"
import Validators from "@/components/Validators"
import ValidatorsStats from "@/components/ValidatorsStats"
import { redirect } from "next/navigation"

export default function Home({ searchParams }: { searchParams: { set?: "active" | "inactive"; search?: string } }) {
	const { set, search } = searchParams
	let redirectLink = "/"
	if (set === "active" || set === "inactive") redirectLink += `?set=${set}`
	else redirectLink += "?set=active"
	if (search) redirectLink += `&search=${search}`
	if ((set !== "active" && set !== "inactive") || (typeof search === "string" && !search.length)) redirect(redirectLink)

	return (
		<>
			<Search {...{ search }} className="md:hidden mb-[1.25rem]" />
			<SectionTitle title="Validators Stats" className="max-md:hidden mb-[2.5rem]" />
			<ValidatorsStats {...{ set }} />
			<Search {...{ search }} className="max-md:hidden my-[2.5rem]" />
			<Menu {...{ set, search }} />
			<Validators {...{ set, search }} />
		</>
	)
}
