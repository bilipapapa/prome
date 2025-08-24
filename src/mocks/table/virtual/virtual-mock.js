import Mock from 'mockjs'
const Random = Mock.Random

export const mock = {

	'data|100-1000': [
		{
			name: '@cname()',
			address: '@county()',
			age: '@integer(18, 60)',
			sex: '@pick(["男", "女"])',
			phone: /^1[3456789]\d{9}$/,
			enName: '@name(true)'
		},
	],
	code: 200,
	msg: '获取数据成功',
}
