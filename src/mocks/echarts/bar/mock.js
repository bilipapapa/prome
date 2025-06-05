export const mockList = {
	code: 200,
	msg: '获取柱状图数据成功',
	'data|20': [{
		id: '@string(20)',
		name: '@cword(2, 4)',
		value: '@float(0, 2000, 0, 2)'
	}],
}

export const mockList2 = {
	code: 200,
	msg: '获取柱状图数据成功',
	'data|40': [{
		id: '@string(20)',
		name: '@cword(2, 6)',
		value: '@float(0, 2000, 0, 2)'
	}],
}
