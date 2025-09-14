<template>
	<div>
		<el-button type="primary" @click="generateFakeData">生成数据</el-button>
	</div>
</template>

<script setup lang="ts">
import { faker } from '@faker-js/faker/locale/zh_CN';
import { saveAs } from 'file-saver';

const generateFakeData = async () => {
	const stream: string[] = [];
	stream.push('{"data":[');
	await streamCloudNetWorkItem(stream, 2000, 100); // 降低 pipeDetail 为 2000，batchSize 500
	stream.push(']}');
	const blob = new Blob(stream, { type: 'application/json' });
	saveAs(blob, 'cloudNetWork.json');
};

// 流式生成单个 cloudNetWork item
async function streamCloudNetWorkItem(stream: string[], pipeDetailMax: number, batchSize: number) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"cloudNo":"cloudNo_${faker.string.alphanumeric(12)}",`);
	stream.push(`"label":"云网络",`);
	stream.push(`"viewType":"cloud-network",`);
	stream.push(`"modelCode":"modelCode_${faker.string.alphanumeric(12)}",`);
	stream.push(`"modelName":"${faker.lorem.words({ min: 2, max: 4 })}",`);
	stream.push(`"measurementPeriod":0,`);
	stream.push(`"encryptType":"encryptType_${faker.string.alphanumeric(12)}",`);
	stream.push(`"encryptSeed":"encryptSeed_${faker.string.alphanumeric(12)}",`);
	stream.push(`"networkType":"networkType_${faker.string.alphanumeric(12)}",`);
	stream.push(`"nodeCount":${faker.number.int({ min: 0, max: 9999 })},`);
	stream.push(`"modelDescription":"${faker.lorem.paragraphs({ min: 1, max: 2 })}",`);
	stream.push(`"modelStatus":"modelStatus_${faker.string.alphanumeric(12)}",`);

	stream.push(`"pipeDetail":`);
	await streamArray(stream, generatePipeDetailItem, 200, pipeDetailMax, batchSize);
	stream.push(',');

	stream.push(`"children":[`);
	await streamGroupVirtual(stream);
	stream.push(',');
	await streamGroupCloudBridge(stream);
	stream.push(',');
	await streamGroupCloudWork(stream);
	stream.push(',');
	await streamFogNetwork(stream);
	stream.push(']');

	stream.push('}');
}

// 生成 pipeDetail item
function generatePipeDetailItem() {
	return {
		pipeNo: `pipeNo_${faker.string.alphanumeric(12)}`,
		pipeType: `pipeType_${faker.string.alphanumeric(12)}`,
		pipeDataType: `pipeDataType_${faker.string.alphanumeric(12)}`,
		pipeDescription: faker.lorem.paragraph(1),
		sourcePoint: generatePoint('S端点-PIPE', 'pipe-sourcePoint', false),
		receivePoints: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => generatePoint('R端点-PIPE', 'pipe-receivePoint', false)),
	};
}

// 通用的 point 生成（source/receive，bitDetail 可选）
function generatePoint(label: string, viewType: string, withBitDetail: boolean) {
	const point: any = {
		uniqueId: faker.string.uuid(),
		label,
		viewType,
		pointNo: faker.number.int({ min: 0, max: 9999 }),
		pointName: `pointName_${faker.string.alphanumeric(10)}`,
		physicalMeaning: faker.lorem.sentence({ min: 1, max: 3 }),
		remark: faker.lorem.paragraph(1),
		dataType: `dataType_${faker.string.alphanumeric(10)}`,
		unit: `unit_${faker.string.alphanumeric(6)}`,
		pipeNo: faker.number.int({ min: 0, max: 9999 }),
		pipeType: `pipeType_${faker.string.alphanumeric(8)}`,
	};
	if (withBitDetail) {
		point.bitDetail = Array.from({ length: 32 }, generateBitDetailItem);
	}
	return point;
}

// bitDetail item
function generateBitDetailItem() {
	return {
		parentNo: faker.number.int({ min: 0, max: 9999 }),
		parentName: `parentName_${faker.string.alphanumeric(10)}`,
		bitStatus: `bitStatus_${faker.string.alphanumeric(10)}`,
		pointNo: faker.number.int({ min: 0, max: 9999 }),
		pointName: `pointName_${faker.string.alphanumeric(10)}`,
		physicalMeaning: faker.lorem.sentence({ min: 1, max: 2 }),
		remark: faker.lorem.paragraph(1),
		openApiIdentifier: `openApiIdentifier_${faker.string.alphanumeric(10)}`,
	};
}

// digitalDevice/digitalPanel item (相同结构)
function generateDigitalDevice() {
	return {
		deviceNo: faker.number.int({ min: 0, max: 9999 }),
		deviceName: `deviceName_${faker.string.alphanumeric(10)}`,
		deviceSn: `deviceSn_${faker.string.alphanumeric(12)}`,
		deviceIdentifier: `deviceIdentifier_${faker.string.alphanumeric(12)}`,
		storageStatus: `storageStatus_${faker.string.alphanumeric(10)}`,
		remark: faker.lorem.paragraph(1),
		templateId: faker.number.int({ min: 0, max: 9999 }),
	};
}

// property item (network/special)
function generatePropertyItem() {
	return {
		propertyNo: faker.number.int({ min: 0, max: 9999 }),
		propertyName: `propertyName_${faker.string.alphanumeric(10)}`,
		physicalMeaning: faker.lorem.sentence({ min: 1, max: 2 }),
		remark: faker.lorem.paragraph(1),
		dataType: `dataType_${faker.string.alphanumeric(10)}`,
		textValue: faker.string.alphanumeric(6),
	};
}

// protocolProperty item
function generateProtocolPropertyItem() {
	return {
		blockNo: `blockNo_${faker.string.alphanumeric(10)}`,
		functionId: `functionId_${faker.string.alphanumeric(10)}`,
		functionNo: `functionNo_${faker.string.alphanumeric(10)}`,
		dataType: `dataType_${faker.string.alphanumeric(10)}`,
		functionDescription: faker.lorem.sentence({ min: 1, max: 2 }),
		unit: `unit_${faker.string.alphanumeric(6)}`,
		functionStatus: `functionStatus_${faker.string.alphanumeric(10)}`,
		registerAddress: `registerAddress_${faker.string.alphanumeric(10)}`,
		registerDataType: `registerDataType_${faker.string.alphanumeric(10)}`,
		registerNum: faker.number.int({ min: 0, max: 100 }),
		functionCode: `functionCode_${faker.string.alphanumeric(10)}`,
		gain: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
		offset: faker.number.int({ min: 0, max: 10 }),
		byteOrder: faker.helpers.arrayElement(['big', 'little']),
		offsetBit: faker.number.int({ min: 0, max: 7 }),
		significanceBit: faker.number.int({ min: 0, max: 7 }),
	};
}

// 修改 streamArray 为更小 batch
async function streamArray(stream: string[], generateFunc: () => any, min: number, max: number, batchSize = 500) {
	const length = faker.number.int({ min, max });
	stream.push('[');
	let first = true;
	for (let i = 0; i < length; i += batchSize) {
		const batchLen = Math.min(batchSize, length - i);
		const batch = Array.from({ length: batchLen }, generateFunc);
		let str = JSON.stringify(batch).slice(1, -1);
		if (!first) str = ',' + str;
		stream.push(str);
		first = false;
		console.log(`进度: ${(((i + batchLen) / length) * 100).toFixed(2)}%`);
		await new Promise((resolve) => setTimeout(resolve, 10));
	}
	stream.push(']');
}

// 流式生成混合 virtual-field 数组 (A/B 模板)
async function streamMixedVirtualFields(stream: string[], min: number, max: number) {
	await streamArray(stream, () => generateVirtualField(faker.helpers.arrayElement(['A', 'B'])), min, max, 10); // 小 batch 因为每个 field 大
}

// 生成 virtual-field (A/B)
function generateVirtualField(type: 'A' | 'B') {
	const field: any = {
		uniqueId: faker.string.uuid(),
		viewType: 'virtual-field',
		fieldId: faker.number.int({ min: 0, max: 9999 }),
		fieldNo: faker.number.int({ min: 0, max: 9999 }),
		fieldName: `fieldName_${faker.string.alphanumeric(10)}`,
		fieldStatus: `fieldStatus_${faker.string.alphanumeric(12)}`,
		roleCount: faker.number.int({ min: 0, max: 5 }),
	};
	const num = faker.number.int({ min: 1, max: 999 });
	if (type === 'A') {
		field.label = `F${num}-数字设备组`;
		field.digitalDevices = Array.from({ length: faker.number.int({ min: 5000, max: 10000 }) }, generateDigitalDevice);
		field.children = Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
			generatePoint(`R端点-V${faker.number.int({ min: 1, max: 999 })}`, 'virtual-receivePoint', true)
		);
	} else {
		field.label = `F${num}-数字面板组`;
		field.digitalPanels = Array.from({ length: faker.number.int({ min: 5000, max: 10000 }) }, generateDigitalDevice); // 结构相同
		field.children = Array.from({ length: faker.number.int({ min: 500, max: 1024 }) }, () =>
			generatePoint(`S端点-V${faker.number.int({ min: 1, max: 999 })}`, 'virtual-sourcePoint', true)
		);
	}
	return field;
}

// 流式生成 group-virtual
async function streamGroupVirtual(stream: string[]) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"label":"云虚拟节点",`);
	stream.push(`"viewType":"group-virtual",`);
	stream.push(`"children":`);
	await streamMixedVirtualFields(stream, 500, 1000);
	stream.push('}');
}

// 流式生成 group-cloud-bridge
async function streamGroupCloudBridge(stream: string[]) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"label":"桥节点",`);
	stream.push(`"viewType":"group-cloud-bridge",`);
	stream.push(`"children":`);
	await streamArray(stream, generateCloudBridgeNode, 100, 200);
	stream.push('}');
}

// 生成 cloud-bridge-node
function generateCloudBridgeNode() {
	const node = {
		uniqueId: faker.string.uuid(),
		redundantGroupId: faker.helpers.arrayElement(['', '']),
		label: `桥节点${faker.number.int({ min: 1, max: 999 })}`,
		viewType: 'cloud-bridge-node',
		nodeNo: faker.number.int({ min: 0, max: 9999 }),
		backupNodeNo: faker.number.int({ min: 0, max: 9999 }),
		nodeModel: `nodeModel_${faker.string.alphanumeric(12)}`,
		nodeName: `nodeName_${faker.string.alphanumeric(10)}`,
		nodeId: `nodeId_${faker.string.alphanumeric(12)}`,
		softVersion: `softVersion_${faker.string.alphanumeric(10)}`,
		nodeType: `nodeType_${faker.string.alphanumeric(10)}`,
		syncNodeFlag: faker.helpers.arrayElement(['syncNodeFlag_true', 'syncNodeFlag_false']),
		syncNodeNo: `syncNodeNo_${faker.string.alphanumeric(8)}`,
		networkProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generatePropertyItem),
		children: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, generateCloudBridgeField),
	};
	return node;
}

// 生成 cloud-bridge-field
function generateCloudBridgeField() {
	const field = {
		uniqueId: faker.string.uuid(),
		label: `身份-B${faker.number.int({ min: 1, max: 999 })}`,
		viewType: 'cloud-bridge-field',
		fieldId: faker.number.int({ min: 0, max: 9999 }),
		fieldNo: faker.number.int({ min: 0, max: 9999 }),
		fieldName: `fieldName_${faker.string.alphanumeric(10)}`,
		fieldStatus: `fieldStatus_${faker.string.alphanumeric(12)}`,
		roleCount: faker.number.int({ min: 0, max: 5 }),
		specialProperties: Array.from({ length: faker.number.int({ min: 10000, max: 20000 }) }, generatePropertyItem),
		protocolProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generateProtocolPropertyItem),
		children: [
			{
				uniqueId: faker.string.uuid(),
				label: 'S端点分组',
				viewType: 'group-cloud-source',
				children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
					generatePoint(`S端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-sourcePoint', false)
				),
			},
			{
				uniqueId: faker.string.uuid(),
				label: 'R端点分组',
				viewType: 'group-cloud-receive',
				children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
					generatePoint(`R端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-receivePoint', false)
				),
			},
		],
	};
	return field;
}

// 流式生成 group-cloud-work
async function streamGroupCloudWork(stream: string[]) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"label":"普通节点",`);
	stream.push(`"viewType":"group-cloud-work",`);
	stream.push(`"children":`);
	await streamArray(stream, () => generateCloudWorkNode(faker.helpers.arrayElement(['work', 'backup'])), 100, 200);
	stream.push('}');
}

// 生成 cloud-work-node or backup
function generateCloudWorkNode(type: 'work' | 'backup') {
	const isWork = type === 'work';
	const labelPrefix = isWork ? '普通节点' : '备份节点';
	const viewTypeNode = isWork ? 'cloud-work-node' : 'cloud-backup-node';
	const viewTypeField = isWork ? 'cloud-work-field' : 'cloud-backup-field';
	const pointPrefix = isWork ? 'W' : 'BU';
	const viewTypeSource = isWork ? 'cloud-work-sourcePoint' : 'cloud-backup-sourcePoint';
	const viewTypeReceive = isWork ? 'cloud-work-receivePoint' : 'cloud-backup-receivePoint';
	const labelField = `身份-${pointPrefix}${faker.number.int({ min: 1, max: 999 })}`;

	const node = {
		uniqueId: faker.string.uuid(),
		redundantGroupId: faker.helpers.arrayElement(['', '001', '002', '003']),
		label: `${labelPrefix}${faker.number.int({ min: 1, max: 999 })}`,
		viewType: viewTypeNode,
		nodeNo: faker.number.int({ min: 0, max: 9999 }),
		backupNodeNo: faker.number.int({ min: 0, max: 9999 }),
		nodeModel: `nodeModel_${faker.string.alphanumeric(12)}`,
		nodeName: `nodeName_${faker.string.alphanumeric(10)}`,
		nodeId: `nodeId_${faker.string.alphanumeric(12)}`,
		softVersion: `softVersion_${faker.string.alphanumeric(10)}`,
		nodeType: `nodeType_${faker.string.alphanumeric(10)}`,
		syncNodeFlag: faker.helpers.arrayElement(['syncNodeFlag_true', 'syncNodeFlag_false']),
		syncNodeNo: `syncNodeNo_${faker.string.alphanumeric(8)}`,
		networkProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generatePropertyItem),
		children: Array.from({ length: 8 }, () => ({
			uniqueId: faker.string.uuid(),
			label: labelField,
			viewType: viewTypeField,
			fieldId: faker.number.int({ min: 0, max: 9999 }),
			fieldNo: faker.number.int({ min: 0, max: 9999 }),
			fieldName: `fieldName_${faker.string.alphanumeric(10)}`,
			fieldStatus: `fieldStatus_${faker.string.alphanumeric(12)}`,
			roleCount: faker.number.int({ min: 0, max: 5 }),
			specialProperties: Array.from({ length: faker.number.int({ min: 10000, max: 20000 }) }, generatePropertyItem),
			protocolProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generateProtocolPropertyItem),
			children: [
				{
					uniqueId: faker.string.uuid(),
					label: 'S端点分组',
					viewType: 'group-cloud-source',
					children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
						generatePoint(`S端点-${pointPrefix}${faker.number.int({ min: 1, max: 999 })}`, viewTypeSource, true)
					),
				},
				{
					uniqueId: faker.string.uuid(),
					label: 'R端点分组',
					viewType: 'group-cloud-receive',
					children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
						generatePoint(`R端点-${pointPrefix}${faker.number.int({ min: 1, max: 999 })}`, viewTypeReceive, true)
					),
				},
			],
		})),
	};
	return node;
}

// 流式生成 fog-network
async function streamFogNetwork(stream: string[]) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"label":"雾网络",`);
	stream.push(`"viewType":"fog-network",`);
	stream.push(`"fogId":"fogId_${faker.string.alphanumeric(12)}",`);
	stream.push(`"modelCode":"modelCode_${faker.string.alphanumeric(12)}",`);
	stream.push(`"modelName":"name_${faker.lorem.words({ min: 2, max: 4 })}",`);
	stream.push(`"measurementPeriod":0,`);
	stream.push(`"nodeCount":${faker.number.int({ min: 0, max: 9999 })},`);
	stream.push(`"networkType":"networkType_${faker.string.alphanumeric(12)}",`);

	stream.push(`"pipeDetail":`);
	await streamArray(stream, generateFogPipeDetailItem, 5000, 10000);
	stream.push(',');

	stream.push(`"children":[`);
	await streamGroupFogBridge(stream);
	stream.push(',');
	await streamGroupFogWork(stream);
	stream.push(']');
	stream.push('}');
}

// 生成 fog pipeDetail item
function generateFogPipeDetailItem() {
	return {
		pipeNo: `pipeNo_${faker.string.alphanumeric(12)}`,
		pipeType: `pipeType_${faker.string.alphanumeric(12)}`,
		pipeDataType: `pipeDataType_${faker.string.alphanumeric(12)}`,
		pipeDescription: faker.lorem.paragraph(1),
		sourcePoint: generatePoint('S端点-FG-PIPE', 'fog-pipe-sourcePoint', false),
		receivePoints: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => generatePoint('R端点-FG-PIPE', 'fog-pipe-receivePoint', false)),
	};
}

// 流式生成 group-fog-bridge
async function streamGroupFogBridge(stream: string[]) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"label":"桥节点",`);
	stream.push(`"viewType":"group-fog-bridge",`);
	stream.push(`"children":`);
	await streamArray(stream, generateFogBridgeNode, 3, 3); // 固定3
	stream.push('}');
}

// 生成 fog-bridge-node
function generateFogBridgeNode() {
	const node = {
		uniqueId: faker.string.uuid(),
		redundantGroupId: faker.helpers.arrayElement(['', '']),
		label: `桥节点${faker.number.int({ min: 1, max: 999 })}`,
		viewType: 'fog-bridge-node',
		nodeNo: faker.number.int({ min: 0, max: 9999 }),
		backupNodeNo: faker.number.int({ min: 0, max: 9999 }),
		nodeModel: `nodeModel_${faker.string.alphanumeric(12)}`,
		nodeName: `nodeName_${faker.string.alphanumeric(10)}`,
		nodeId: `nodeId_${faker.string.alphanumeric(12)}`,
		softVersion: `softVersion_${faker.string.alphanumeric(10)}`,
		nodeType: `nodeType_${faker.string.alphanumeric(10)}`,
		syncNodeFlag: faker.helpers.arrayElement(['syncNodeFlag_true', 'syncNodeFlag_false']),
		syncNodeNo: `syncNodeNo_${faker.string.alphanumeric(8)}`,
		networkProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generatePropertyItem),
		children: Array.from({ length: 8 }, generateFogBridgeField),
	};
	return node;
}

// 生成 fog-bridge-field
function generateFogBridgeField() {
	const field = {
		uniqueId: faker.string.uuid(),
		label: `身份-FB${faker.number.int({ min: 1, max: 999 })}`,
		viewType: 'fog-bridge-field',
		fieldId: faker.number.int({ min: 0, max: 9999 }),
		fieldNo: faker.number.int({ min: 0, max: 9999 }),
		fieldName: `fieldName_${faker.string.alphanumeric(10)}`,
		fieldStatus: `fieldStatus_${faker.string.alphanumeric(12)}`,
		roleCount: faker.number.int({ min: 0, max: 5 }),
		specialProperties: Array.from({ length: faker.number.int({ min: 10000, max: 20000 }) }, generatePropertyItem),
		protocolProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generateProtocolPropertyItem),
		children: [
			{
				uniqueId: faker.string.uuid(),
				label: '雾-S端点分组',
				viewType: 'group-fog-bridge-sourcePoint',
				children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
					generatePoint(`S端点-FB${faker.number.int({ min: 1, max: 999 })}`, 'fog-bridge-sourcePoint', false)
				),
			},
			{
				uniqueId: faker.string.uuid(),
				label: '雾-R端点分组',
				viewType: 'group-fog-bridge-receivePoint',
				children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
					generatePoint(`R端点-FB${faker.number.int({ min: 1, max: 999 })}`, 'fog-bridge-receivePoint', false)
				),
			},
			{
				uniqueId: faker.string.uuid(),
				label: '云-S端点分组',
				viewType: 'group-cloud-bridge-sourcePoint',
				children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
					generatePoint(`S端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-sourcePoint', false)
				),
			},
			{
				uniqueId: faker.string.uuid(),
				label: '云-R端点分组',
				viewType: 'group-cloud-bridge-receivePoint',
				children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
					generatePoint(`R端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-receivePoint', false)
				),
			},
		],
	};
	return field;
}

// 流式生成 group-fog-work
async function streamGroupFogWork(stream: string[]) {
	stream.push('{');
	stream.push(`"uniqueId":"${faker.string.uuid()}",`);
	stream.push(`"label":"普通节点",`);
	stream.push(`"viewType":"group-fog-work",`);
	stream.push(`"children":`);
	await streamArray(stream, () => generateFogWorkNode(faker.helpers.arrayElement(['work', 'backup'])), 50, 100);
	stream.push('}');
}

// 生成 fog-work-node or backup
function generateFogWorkNode(type: 'work' | 'backup') {
	const isWork = type === 'work';
	const labelPrefix = isWork ? '普通节点-FG' : '普通节点-FG'; // 模板中统一普通节点-FG
	const viewTypeNode = isWork ? 'fog-work-node' : 'fog-backup-node';
	const viewTypeField = 'fog-work-field'; // 模板中统一 fog-work-field
	const pointPrefix = 'FW';
	const viewTypeSource = 'fog-work-sourcePoint';
	const viewTypeReceive = 'fog-work-receivePoint';

	const node = {
		uniqueId: faker.string.uuid(),
		redundantGroupId: faker.helpers.arrayElement(['', '002', '003', '004']),
		label: `${labelPrefix}${faker.number.int({ min: 1, max: 999 })}`,
		viewType: viewTypeNode,
		nodeNo: faker.number.int({ min: 0, max: 9999 }),
		backupNodeNo: faker.number.int({ min: 0, max: 9999 }),
		nodeModel: `nodeModel_${faker.string.alphanumeric(12)}`,
		nodeName: `nodeName_${faker.string.alphanumeric(10)}`,
		nodeId: `nodeId_${faker.string.alphanumeric(12)}`,
		softVersion: `softVersion_${faker.string.alphanumeric(10)}`,
		nodeType: `nodeType_${faker.string.alphanumeric(10)}`,
		syncNodeFlag: faker.helpers.arrayElement(['syncNodeFlag_true', 'syncNodeFlag_false']),
		syncNodeNo: `syncNodeNo_${faker.string.alphanumeric(8)}`,
		networkProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generatePropertyItem),
		children: Array.from({ length: 8 }, () => ({
			uniqueId: faker.string.uuid(),
			label: `身份-FW${faker.number.int({ min: 1, max: 999 })}`,
			viewType: viewTypeField,
			fieldId: faker.number.int({ min: 0, max: 9999 }),
			fieldNo: faker.number.int({ min: 0, max: 9999 }),
			fieldName: `fieldName_${faker.string.alphanumeric(10)}`,
			fieldStatus: `fieldStatus_${faker.string.alphanumeric(12)}`,
			roleCount: faker.number.int({ min: 0, max: 5 }),
			specialProperties: Array.from({ length: faker.number.int({ min: 10000, max: 20000 }) }, generatePropertyItem),
			protocolProperties: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, generateProtocolPropertyItem),
			children: [
				{
					uniqueId: faker.string.uuid(),
					label: 'S端点分组',
					viewType: 'group-fog-work-sourcePoint',
					children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
						generatePoint(`S端点-FW${faker.number.int({ min: 1, max: 999 })}`, viewTypeSource, false)
					),
				},
				{
					uniqueId: faker.string.uuid(),
					label: 'R端点分组',
					viewType: 'group-fog-work-receivePoint',
					children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () =>
						generatePoint(`R端点-FW${faker.number.int({ min: 1, max: 999 })}`, viewTypeReceive, false)
					),
				},
			],
		})),
	};
	return node;
}
</script>

<style lang="scss" scoped></style>
