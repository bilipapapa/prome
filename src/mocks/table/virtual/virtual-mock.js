import Mock from 'mockjs'
const Random = Mock.Random

export const mock = {
	'data|1000000-10000000': [
		{
			name: '@cname()',
			address: '@county()',
			age: '@integer(18, 60)',
			sex: '@pick(["男", "女"])',
			phone: /^1[3456789]\d{9}$/,
			enName: `${'@first()'} ${'@last()'}`,
		},
	],
	code: 200,
	msg: '获取数据成功',
}

export const mock1 = {
	'data|100000-1000000': [
		{
			name: '@cname()',
			address: '@county()',
			age: '@integer(18, 60)',
			sex: '@pick(["男", "女"])',
			phone: /^1[3456789]\d{9}$/,
			enName: `${'@first()'} ${'@last()'}`,
		},
	],
	code: 200,
	msg: '获取数据成功',
}

export const mock2 = {
	'data|10000-100000': [
		{
			name: '@cname()',
			address: '@county()',
			age: '@integer(18, 60)',
			sex: '@pick(["男", "女"])',
			phone: /^1[3456789]\d{9}$/,
			enName: `${'@first()'} ${'@last()'}`,
		},
	],
	code: 200,
	msg: '获取数据成功',
}

export const mock3 = {
	'data|1000-10000': [
		{
			name: '@cname()',
			address: '@county()',
			age: '@integer(18, 60)',
			sex: '@pick(["男", "女"])',
			phone: /^1[3456789]\d{9}$/,
			enName: `${'@first()'} ${'@last()'}`,
		},
	],
	code: 200,
	msg: '获取数据成功',
}