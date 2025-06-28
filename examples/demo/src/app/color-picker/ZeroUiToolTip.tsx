'use client';
import { useUI } from '@react-zero-ui/core';
import { CSSProperties } from 'react';

/**
 * ZeroTooltip
 * -----------
 *
 * Only this component relies on the helper; no global state or extra deps added.
 */
export function ZeroTooltip({ tooltip, shadeIdx }: { tooltip: string; shadeIdx: number }) {
	// Local UI state: "on" | "off"
	const [, set] = useUI('tooltip', 'off');

	return (
		<div
			onMouseEnter={e => set('on', { scope: e.currentTarget })}
			onMouseLeave={e => set('off', { scope: e.currentTarget })}
			className="relative"
			/* Initial attribute value. Zero-UI's build step normally injects this. */
			data-tooltip="off">
			{shadeIdx === 0 && (
				<>
					<div className="pointer-events-none absolute -top-1 -left-1 h-screen border-l border-gray-950/5 dark:border-white/10" />
					<div className="pointer-events-none absolute -top-1 -left-1 h-16 origin-top-left translate-px rotate-225 border-l border-gray-950/5 sm:h-24 dark:border-white/10" />
				</>
			)}

			<div
				className="h-(--height) w-(--width) bg-(--color) inset-ring inset-ring-gray-950/10 transition-opacity group-hover:opacity-75 hover:opacity-100 dark:inset-ring-white/10"
				style={{ '--color': tooltip, backgroundColor: tooltip } as CSSProperties}
			/>

			{/* Tooltip panel. Becomes visible when data-tooltip="on" */}
			<div className="pointer-events-none absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 -translate-y-18 rounded-full border border-gray-950 bg-gray-950/90 pt-0.5 pr-2 pb-1 pl-3 text-center font-mono text-xs/6 font-medium whitespace-nowrap text-white opacity-0 inset-ring inset-ring-white/10 transition-opacity dark:border-white/10 tooltip-on:opacity-100 tooltip-on:delay-100">
				{tooltip}
			</div>
		</div>
	);
}
