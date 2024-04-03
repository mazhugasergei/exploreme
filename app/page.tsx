import Menu from "@/components/Menu"
import Search from "@/components/Search"
import SectionTitle from "@/components/SectionTitle"
import Validators from "@/components/Validators"
import ValidatorsStats from "@/components/ValidatorsStats"

export default function Home() {
	return (
		<>
			<Search className="md:hidden mb-[1.25rem]" />
			<SectionTitle title="Validators Stats" className="max-md:hidden mb-[2.5rem]" />
			<ValidatorsStats />
			<Search className="max-md:hidden my-[2.5rem]" />
			<Menu />
			<Validators />
		</>
	)
}
