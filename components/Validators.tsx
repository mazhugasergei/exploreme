import ValidatorsClient from "./ValidatorsClient"

export default async function Validators() {
	const validatorsApiKey = `https://api.seistream.app/validators`

	const validatorsData: Validator[] = await fetch(validatorsApiKey, { next: { revalidate: 300 } }).then((res) =>
		res.json()
	)

	if (!validatorsData) return null
	else return <ValidatorsClient {...{ validatorsData }} />
}
