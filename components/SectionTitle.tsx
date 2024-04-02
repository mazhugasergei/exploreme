export default ({ title, className }: { title: string; className?: string }) => {
	return <h2 className={`text-[1.375rem] md:text-[1.25rem] md:font-medium ${className}`}>{title}</h2>
}
