import Image from "next/image"
import Link from "next/link"
import useSWR, { SWRConfig } from "swr"

const Item = ({ item }: { item: Validator }) => {
	const rank = item.rank
	const moniker = item.description.moniker
	const tokens = item.tokens.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")
	const votingPower = `${(item.votingPowerPercent * 100).toFixed(2)}%`
	const cumulativeShare = `${(item.cumulativeShare * 100).toFixed(2)}%`
	const commissionRates = `${parseInt(item.commission.commissionRates.rate) / 10 / 1000 / 1000 / 1000 / 1000 / 1000}%`
	const uptime = item.jailed
		? item.signingInfo.tombstoned
			? "Tombstoned"
			: "In Jailed"
		: `${(item.uptime.windowUptime.uptime * 100).toFixed(2)}%`
	const participationRate = `${(item.participation.rate * 100).toFixed(2)}%`
	const participationVoted = item.participation.voted
	const participationTotal = item.participation.total

	return (
		<Link
			href=""
			className="w-full grid lg:grid-cols-[auto_2fr_2fr_2fr_1fr_1fr_1fr_auto] lg:items-center gap-[0.625rem] bg-[#181818] border-b-[0.0625rem] max-lg:border-[0.0625rem] border-[#222] rounded-[0.1875rem] lg:rounded-[0.3125rem] p-[0.9375rem] lg:px-[1.25rem] lg:py-[1.625rem] lg:pr-[2.0625rem]"
		>
			{/* Rank */}
			<span className="max-lg:hidden text-[#707070] font-medium mr-[1.5rem]">{rank}</span>
			{/* Moniker */}
			<div className="flex items-center justify-between max-lg:mb-[0.3125rem]">
				<div className="flex items-center gap-[0.4375rem]">
					<span className="w-[0.9375rem] h-[0.9375rem] lg:w-[1.5625rem] lg:h-[1.5625rem] rounded-full bg-[#222]" />
					<span className="max-lg:text-[0.8125rem] font-medium text-[#4E95FF]">{moniker}</span>
				</div>
				{/* cumulative share (mobile) */}
				<div className="lg:hidden flex items-center gap-[0.4375rem]">
					<div className="w-[7rem] h-[0.3125rem] bg-[#222]">
						<div className="h-full bg-[#16B481]" style={{ width: `${cumulativeShare}` }} />
					</div>
					<span className="text-[0.8125rem] text-[#707070] font-medium">{cumulativeShare}</span>
				</div>
			</div>
			{/* Tokens & Voting Power */}
			<div className="flex justify-between">
				<span className="lg:hidden text-[0.8125rem] text-[#707070]/80">Voting Power</span>
				<div className="flex items-center gap-[0.625rem]">
					<Image
						src="/token.svg"
						alt=""
						width={16}
						height={15}
						className="w-[0.75rem] h-[0.703125rem] lg:w-[1rem] lg:h-[0.9375rem] rounded-full bg-[#222]"
					/>
					<span className="max-lg:text-[0.8125rem] text-[#DADADA] font-medium">{tokens}</span>
					<span className="text-[0.6875rem] lg:text-[0.8125rem] text-[#707070] font-medium">{votingPower}</span>
				</div>
			</div>
			{/* Cumulative Share (Desktop) */}
			<div className="max-lg:hidden flex items-center gap-[0.625rem]">
				<div className="w-[7rem] h-[0.3125rem] bg-[#222]">
					<div className="h-full bg-[#16B481]" style={{ width: `${cumulativeShare}` }} />
				</div>
				<span className="text-[#707070] font-medium">{cumulativeShare}</span>
			</div>
			{/* Commission Rates */}
			<div className="flex justify-between">
				<span className="lg:hidden text-[0.8125rem] text-[#707070]/80">Comm.</span>
				<span className="max-lg:text-[0.8125rem] text-[#F8F8F8] max-lg:font-medium">{commissionRates}</span>
			</div>
			{/* Uptime */}
			<div className="flex justify-between">
				<span className="lg:hidden text-[0.8125rem] text-[#707070]/80">Uptime</span>
				<span
					className={`max-lg:text-[0.8125rem] font-medium ${
						uptime === "In Jailed"
							? "text-[#FF7676] lg:text-[#B23030] bg-[#FF7676]/[.16]"
							: uptime === "Tombstoned"
							? "text-[#707070] bg-[#707070]/[.30]"
							: ""
					} ${
						uptime === ("In Jailed" || "Tombstoned")
							? "leading-[0.8125rem] rounded-[0.125rem] px-[0.625rem] lg:px-[1.25rem] py-[0.125rem] lg:py-[0.3125rem]"
							: "text-[#F8F8F8]"
					}`}
				>
					{uptime}
				</span>
			</div>
			{/* Participation */}
			<div className="flex justify-between">
				<span className="lg:hidden text-[0.8125rem] text-[#707070]/80">Participation</span>
				<div className="flex items-center gap-[0.625rem]">
					<span
						className={`max-lg:text-[0.8125rem] ${
							participationVoted ? "text-[#F8F8F8]" : "text-[#FF7676]/80"
						} font-medium`}
					>
						{participationRate}
					</span>
					<span
						className={`text-[0.6875rem] lg:text-[0.8125rem] ${
							participationVoted ? "text-[#707070]" : "text-[#FF7676]/50"
						} font-medium`}
					>
						{participationVoted}/{participationTotal}
					</span>
				</div>
			</div>
			{/* Arrow */}
			<Image src="/arrow.svg" alt="" width={14} height={6} className="max-lg:hidden" />
		</Link>
	)
}

const Items = ({ set, search }: { set: "active" | "inactive"; search: string }) => {
	const validatorsApiKey = `https://api.seistream.app/validators`

	const fetchData: () => Promise<Validator[]> = async () => await fetch(validatorsApiKey).then((res) => res.json())

	const { data: validatorsData } = useSWR("validators-data", fetchData)

	return (
		<ul className="grid gap-[0.625rem]">
			{
				// filter set
				(set === "active"
					? validatorsData?.filter(({ status }) => status === "BOND_STATUS_BONDED")
					: validatorsData?.filter(({ status }) => status === "BOND_STATUS_UNBONDING")
				)
					// filter search
					?.filter((item) => item.description.moniker.toLowerCase().includes(search.toLowerCase()))
					// map items
					.map((item) => (
						<li key={item.accountAddress}>
							<Item {...{ item }} />
						</li>
					))
			}
		</ul>
	)
}

export default function Validators({ set, search }: { set: "active" | "inactive"; search: string }) {
	return (
		<SWRConfig value={{ provider: () => new Map(), dedupingInterval: 300000 }}>
			<Items {...{ set, search }} />
		</SWRConfig>
	)
}
