import type { App } from 'vue';

/**
 * 按钮波浪指令
 * @directive 默认方式：v-wave，如 `<div v-wave</div>`
 * @directive 参数方式：v-wave="theme|light|red|orange|purple|green|teal"，如 `<div v-wave="'theme'"></div>`
 */
export default function waveDirective(app: App) {
	app.directive('wave', {
		mounted(el, binding) {
			el.classList.add('wave-effect');
			binding.value && el.classList.add(`wave-${binding.value}`);

			function setConvertStyle(obj: { [key: string]: unknown }) {
				let style: string = '';
				for (let i in obj) {
					if (obj.hasOwnProperty(i)) style += `${i}:${obj[i]};`;
				}
				return style;
			}

			function onCurrentClick(e: { [key: string]: unknown }) {
				let elDiv = document.createElement('div');
				elDiv.classList.add('wave-ripple');
				el.appendChild(elDiv);
				let styles = {
					left: `${e.layerX}px`,
					top: `${e.layerY}px`,
					opacity: 1,
					transform: `scale(${(el.clientWidth / 100) * 10})`,
					'transition-duration': `600ms`,
					'transition-timing-function': `cubic-bezier(.3,.4,.6,.7)`,
				};
				elDiv.setAttribute('style', setConvertStyle(styles));
				setTimeout(() => {
					elDiv.setAttribute(
						'style',
						setConvertStyle({
							opacity: 0,
							transform: styles.transform,
							left: styles.left,
							top: styles.top,
						})
					);
					setTimeout(() => {
						elDiv && el.removeChild(elDiv);
					}, 600);
				}, 400);
			}
			el.addEventListener('mousedown', onCurrentClick, false);
		},
		unmounted(el) {
			el.addEventListener('mousedown', () => {});
		},
	});
}
