export const mockList = {
	code: 200,
	message: '获取树结构数据成功',
	'data|10-100': [{ // 随机生成 10-200 个根节点
		id: '@natural',
		label: '@ctitle(3,8)', // 中文标题稍长些
		'children|10-50': [{ // 每个根节点有 10-50 个子节点
			id: '@natural',
			label: '@ctitle(4,8)',
			'children|2-10': [{ // 每个子节点再有 2-10 个孙子节点
				id: '@natural',
				label: '@ctitle(5,10)',
				// 'children|0-3': [{ // 末端节点随机出现 0-3 个子节点
				// 	id: '@natural',
				// 	label: '@ctitle(6,12)'
				// }]
			}]
		}]
	}],
}
