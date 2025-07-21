/** @type {import('postcss').PluginCreator} */
module.exports = () => ({
	postcssPlugin: 'postcss-zero-ui-vars',

	Once(root) {
		const varNames = new Map(); // signature → --var
		const attrBlocks = new Map(); // "key|val" → { --var: real }

		root.walkRules((rule) => {
			// Match selectors that Tailwind emitted from your variants
			// `[data-theme="dark"] .theme-dark\:bg-...?`
			const m = rule.selector.match(/\[data-([a-z0-9-]+)="([^"]+)"\]/);
			if (!m) return;
			const [, key, val] = m;

			rule.walkDecls((decl) => {
				// create unique var per (key, val, prop, value)
				const sig = `${key}|${val}|${decl.prop}|${decl.value}`;
				if (!varNames.has(sig)) {
					const safeProp = decl.prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
					varNames.set(sig, `--${key}-${val}-${safeProp}`);
				}

				const vName = varNames.get(sig);
				(attrBlocks.get(`${key}|${val}`) ?? (attrBlocks.set(`${key}|${val}`, {}), attrBlocks.get(`${key}|${val}`)))[vName] = decl.value;
				decl.value = `var(${vName})`; // rewrite in‑place
			});
		});

		// Emit 1 rule per state, e.g.  [data-theme="dark"] { --theme-dark-bg-color:#000 }
		for (const [kv, map] of attrBlocks) {
			const [key, val] = kv.split('|');
			const block = new (require('postcss').rule)({ selector: `[data-${key}="${val}"]` });
			for (const [v, real] of Object.entries(map)) {
				block.append({ prop: v, value: real });
			}
			root.prepend(block);
		}
	},
});
module.exports.postcss = true;
