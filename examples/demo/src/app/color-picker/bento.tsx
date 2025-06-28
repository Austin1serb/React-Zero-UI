import clsx from 'clsx';
import { ReactNode } from 'react';

export function BentoItem({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<div
			className={clsx(
				'@container isolate flex flex-col gap-2 overflow-hidden rounded-2xl bg-white p-2 outline outline-gray-950/5 dark:bg-gray-950 dark:outline-white/10',
				className
			)}>
			{children}
		</div>
	);
}

export function BentoHeader({ children }: { children: ReactNode }) {
	return (
		<>
			<div className="flex flex-col gap-6 p-6 @md:flex-row @md:gap-x-8 @md:p-8">{children}</div>
			<div className="flex-1" />
		</>
	);
}

export function BentoIcon({ children }: { children?: ReactNode }) {
	if (children) {
		return <div className="flex h-18 w-28 shrink-0 items-center justify-center">{children}</div>;
	}
	return <div className="h-18 w-28 shrink-0 bg-black/5" />;
}

export function BentoTitle({ children }: { children: ReactNode }) {
	return <span className="text-xl/10 font-medium text-gray-950 @md:text-2xl/10 dark:text-white">{children}</span>;
}

export function BentoDescription({ children }: { children: ReactNode }) {
	// TODO: Maybe not hardcode the max-width here
	return <p className="max-w-xl text-sm/7 text-gray-600 dark:text-gray-400">{children}</p>;
}

export function BentoBody({ children, className, padding = true }: { children: ReactNode; className?: string; padding?: boolean }) {
	return (
		<div
			className={clsx(
				className,
				padding && 'p-4 sm:p-8',
				'relative overflow-hidden',
				'rounded-lg bg-gray-950/[2.5%]',
				'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10',
				'bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'
			)}>
			{children}
		</div>
	);
}
