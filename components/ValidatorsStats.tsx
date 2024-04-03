"use client"

import useSWR, { SWRConfig } from "swr"

const Widget = ({ text, subtext, children }: { text: string; subtext: string; children?: JSX.Element }) => {
	return (
		<div className="flex flex-col items-center bg-[#181818] max-md:border-[0.045rem] rounded-[0.125rem] border-[#222] p-[0.625rem] md:p-[1.875rem]">
			<div className="flex max-md:flex-col items-center gap-[0.125rem] md:gap-[0.3125rem]">
				<p className="text-[0.9375rem] md:text-[1.875rem] leading-[1.125rem] md:leading-[2.64rem]">{text}</p>
				<p className="text-[0.8125rem] md:text-[0.9375rem] text-[#707070] leading-[0.8125rem] md:leading-[0.875rem]">
					{subtext}
				</p>
			</div>
			{children}
		</div>
	)
}

const Widgets = ({ set }: { set: "active" | "inactive" }) => {
	const networkDataApiKey = `https://api.seistream.app/chain/network`

	const fetchData: () => Promise<ChainNetwork> = async () => await fetch(networkDataApiKey).then((res) => res.json())

	const { data: networkData } = useSWR("widgets-data", fetchData)

	return (
		<>
			<Widget
				text={`${
					networkData
						? set === "active"
							? networkData.validators.active
							: networkData.validators.total - networkData.validators.active
						: "---"
				}/${networkData ? networkData.validators.total : "---"}`}
				subtext={`${set === "active" ? "Active" : "Inactive"}/Total`}
			/>
			<Widget
				text={`${
					networkData ? ((networkData.validators.active / networkData.validators.total) * 100).toFixed(2) + "%" : "---"
				}`}
				subtext="Onchain APY"
			/>
			<Widget text={`${networkData ? networkData.window.round : "---"}`} subtext="Window">
				<div className="max-md:hidden w-[7rem] h-[0.3125rem] bg-[#222] mt-[0.25rem]">
					<div className="h-full bg-[#16B481]" style={{ width: `${30}%` }} />
				</div>
			</Widget>
		</>
	)
}

export default function ValidatorsStats({ set }: { set: "active" | "inactive" }) {
	return (
		<div className="grid gap-[0.625rem] md:gap-[1.875rem] md:grid-cols-3 py-[0.625rem]">
			{/* <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 300000 }}> */}
			<Widgets {...{ set }} />
			{/* </SWRConfig> */}
		</div>
	)
}
