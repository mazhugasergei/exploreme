type ChainNetwork = {
	validators: {
		active: number
		total: number
	}
	latestBlock: {
		height: number
		time: Date
	}
	network: string
	blockTime: {
		startHeight: number
		endHeight: number
		diffTime: number
	}
	token: {
		alias: string
		denom: string
	}
	valPrefix: string
	window: {
		round: number
		windowStart: number
		windowEnd: number
	}
}

type Validator = {
	operatorAddress: string
	hexAddress: string
	accountAddress: string
	consensusAddress: string
	consensusPubkey: {
		typeUrl: string
		value: string
	}
	jailed: true
	status: string
	signingInfo: {
		bondedHeight: number
		tombstoned: true
		jailedUntil: string
	}
	tokens: number
	delegatorShares: string
	description: {
		moniker: string
		identity: string
		details: string
		avatar: string
		website: string
		securityContact: string
		socials: {
			twitterUrl: string
			githubUrl: string
			webUrl: string
		}
	}
	commission: {
		commissionRates: {
			rate: string
			maxRate: string
			maxChangeRate: string
		}
		updateTime: {
			seconds: string
			nanos: number
		}
	}
	cumulativeShare: number
	votingPowerPercent: number
	uptime: {
		historicalUptime: {
			earliestHeight: number
			lastSyncHeight: number
			successBlocks: number
		}
		windowUptime: {
			uptime: number
			windowStart: number
			windowEnd: number
		}
	}
	participation: {
		rate: number
		voted: number
		total: number
	}
	rank: number
}
