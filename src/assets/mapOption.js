export default {
	tooltip: {},
	series: [
		{
			name: '丽水市',
			type: 'map',
			aspectScale: 1,
			layoutCenter: ['48%', '44%'],
			layoutSize: 720,
			map: '丽水市',
			selectedMode: false,
			label: {
				normal: {
					show: true,
					textStyle: {
						fontSize: 18,
						color: '#fff',
					},
				},
				emphasis: {
					textStyle: {
						color: '#fff',
					},
				},
			},
			itemStyle: {
				normal: {
					borderColor: 'white',
					borderWidth: 1,
					areaColor: {
						type: 'radial',
						x: 0.5,
						y: 0.5,
						r: 0.8,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(35, 114, 157, 0.1)',
							},
							{
								offset: 1,
								color: 'rgba(35, 114, 157, 0.1)',
							},
						],
						globalCoord: false,
					},
					shadowColor: 'rgba(46, 150, 246,0.2)',
					shadowBlur: 4,
				},
				emphasis: {
					areaColor: 'rgba(2, 157, 183,0.6)',
					borderWidth: 1,
				},
			},
		},
		{
			name: 'grigio',
			symbolSize: 4,
			type: 'effectScatter',
			coordinateSystem: 'geo',
			effectType: 'ripple',
			symbol: 'circle',
			rippleEffect: {
				period: 4,
				scale: 6,
			},
			label: {
				show: false,
			},
			hoverAnimation: true,
			itemStyle: {
				normal: {
					color: '#aab9b4',
					shadowBlur: 0,
					shadowColor: '#333',
				},
			},
			zlevel: 1,
			data: [
				{
					value: ['', '', ''],
				},
			],
		},
		{
			name: 'green',
			symbolSize: 4,
			type: 'effectScatter',
			coordinateSystem: 'geo',
			effectType: 'ripple',
			symbol: 'rect',
			rippleEffect: {
				period: 4,
				scale: 6,
				brushType: 'stroke',
			},
			label: {
				show: false,
			},
			hoverAnimation: true,
			itemStyle: {
				normal: {
					color: '#8fd80d',
					shadowBlur: 0,
					shadowColor: '#333',
				},
			},
			zlevel: 1,
			data: [],
		},
	],
	geo: {
		map: '丽水市',
		aspectScale: 1,
		layoutCenter: ['48%', '44%'],
		layoutSize: 720,
		label: {
			normal: {
				show: true,
				textStyle: {
					fontSize: 18,
					color: '#fff',
				},
			},
			emphasis: {
				textStyle: {
					color: '#fff',
				},
			},
		},
		itemStyle: {
			normal: {
				borderColor: 'white',
				borderWidth: 2,
				areaColor: {
					image: {},
					repeat: 'repeat',
				},
				shadowColor: 'rgba(13, 128, 240,0.9)',
				shadowOffsetX: 10,
				shadowOffsetY: 10,
				shadowBlur: 4,
			},
			emphasis: {
				shadowColor: 'rgba(6,46,50,0.8)',
				areaColor: 'rgba(2, 157, 183,0.6)',
				borderWidth: 0,
			},
		},
	},
};
