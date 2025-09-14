import { faker } from '@faker-js/faker/locale/zh_CN'
import fs from 'fs'

const outputStream = fs.createWriteStream('cloudNetWork.json', { encoding: 'utf8' })

async function generateFakeData () {
  outputStream.write('{"data":[')
  await streamCloudNetWorkItem()
  outputStream.write(']}')
  outputStream.end()
  console.log('生成完成，文件已保存为 cloudNetWork.json')
}

async function streamCloudNetWorkItem () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"cloudNo":"cloudNo_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"label":"云网络",`)
  outputStream.write(`"viewType":"cloud-network",`)
  outputStream.write(`"modelCode":"modelCode_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"modelName":"${faker.lorem.words({ min: 2, max: 4 })}",`)
  outputStream.write(`"measurementPeriod":0,`)
  outputStream.write(`"encryptType":"encryptType_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"encryptSeed":"encryptSeed_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"networkType":"networkType_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"nodeCount":${faker.number.int({ min: 0, max: 9999 })},`)
  outputStream.write(`"modelDescription":"${faker.lorem.paragraphs({ min: 1, max: 2 })}",`)
  outputStream.write(`"modelStatus":"modelStatus_${faker.string.alphanumeric(12)}",`)

  outputStream.write(`"pipeDetail":`)
  await streamArray(generatePipeDetailItem, 20000, 200000, 1000)
  outputStream.write(',')

  outputStream.write(`"children":[`)
  await streamGroupVirtual()
  outputStream.write(',')
  await streamGroupCloudBridge()
  outputStream.write(',')
  await streamGroupCloudWork()
  outputStream.write(',')
  await streamFogNetwork()
  outputStream.write(']')

  outputStream.write('}')
}

// 生成 pipeDetail item
function generatePipeDetailItem () {
  return {
    pipeNo: `pipeNo_${faker.string.alphanumeric(12)}`,
    pipeType: `pipeType_${faker.string.alphanumeric(12)}`,
    pipeDataType: `pipeDataType_${faker.string.alphanumeric(12)}`,
    pipeDescription: faker.lorem.paragraph(1),
    sourcePoint: generatePoint('S端点-PIPE', 'pipe-sourcePoint', false),
    receivePoints: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => generatePoint('R端点-PIPE', 'pipe-receivePoint', false)),
  }
}

// 通用的 point 生成
function generatePoint (label, viewType, withBitDetail) {
  const point = {
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
  }
  if (withBitDetail) {
    point.bitDetail = Array.from({ length: 32 }, generateBitDetailItem)
  }
  return point
}

function generateBitDetailItem () {
  return {
    parentNo: faker.number.int({ min: 0, max: 9999 }),
    parentName: `parentName_${faker.string.alphanumeric(10)}`,
    bitStatus: `bitStatus_${faker.string.alphanumeric(10)}`,
    pointNo: faker.number.int({ min: 0, max: 9999 }),
    pointName: `pointName_${faker.string.alphanumeric(10)}`,
    physicalMeaning: faker.lorem.sentence({ min: 1, max: 2 }),
    remark: faker.lorem.paragraph(1),
    openApiIdentifier: `openApiIdentifier_${faker.string.alphanumeric(10)}`,
  }
}

function generateDigitalDevice () {
  return {
    deviceNo: faker.number.int({ min: 0, max: 9999 }),
    deviceName: `deviceName_${faker.string.alphanumeric(10)}`,
    deviceSn: `deviceSn_${faker.string.alphanumeric(12)}`,
    deviceIdentifier: `deviceIdentifier_${faker.string.alphanumeric(12)}`,
    storageStatus: `storageStatus_${faker.string.alphanumeric(10)}`,
    remark: faker.lorem.paragraph(1),
    templateId: faker.number.int({ min: 0, max: 9999 }),
  }
}

function generatePropertyItem () {
  return {
    propertyNo: faker.number.int({ min: 0, max: 9999 }),
    propertyName: `propertyName_${faker.string.alphanumeric(10)}`,
    physicalMeaning: faker.lorem.sentence({ min: 1, max: 2 }),
    remark: faker.lorem.paragraph(1),
    dataType: `dataType_${faker.string.alphanumeric(10)}`,
    textValue: faker.string.alphanumeric(6),
  }
}

function generateProtocolPropertyItem () {
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
  }
}

async function streamArray (generateFunc, min, max, batchSize) {
  const length = faker.number.int({ min, max })
  outputStream.write('[')
  let first = true
  for (let i = 0; i < length; i += batchSize) {
    const batchLen = Math.min(batchSize, length - i)
    const batch = Array.from({ length: batchLen }, generateFunc)
    let str = JSON.stringify(batch).slice(1, -1)
    if (!first) str = ',' + str
    outputStream.write(str)
    first = false
    console.log(`进度: ${((i + batchLen) / length * 100).toFixed(2)}%`)
    await new Promise(resolve => setTimeout(resolve, 0))
  }
  outputStream.write(']')
}

async function streamMixedVirtualFields (min, max) {
  await streamArray(() => generateVirtualField(faker.helpers.arrayElement(['A', 'B'])), min, max, 10)
}

function generateVirtualField (type) {
  const field = {
    uniqueId: faker.string.uuid(),
    viewType: 'virtual-field',
    fieldId: faker.number.int({ min: 0, max: 9999 }),
    fieldNo: faker.number.int({ min: 0, max: 9999 }),
    fieldName: `fieldName_${faker.string.alphanumeric(10)}`,
    fieldStatus: `fieldStatus_${faker.string.alphanumeric(12)}`,
    roleCount: faker.number.int({ min: 0, max: 5 }),
  }
  const num = faker.number.int({ min: 1, max: 999 })
  if (type === 'A') {
    field.label = `F${num}-数字设备组`
    field.digitalDevices = Array.from({ length: faker.number.int({ min: 5000, max: 10000 }) }, generateDigitalDevice)
    field.children = Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`R端点-V${faker.number.int({ min: 1, max: 999 })}`, 'virtual-receivePoint', true))
  } else {
    field.label = `F${num}-数字面板组`
    field.digitalPanels = Array.from({ length: faker.number.int({ min: 5000, max: 10000 }) }, generateDigitalDevice)
    field.children = Array.from({ length: faker.number.int({ min: 500, max: 1024 }) }, () => generatePoint(`S端点-V${faker.number.int({ min: 1, max: 999 })}`, 'virtual-sourcePoint', true))
  }
  return field
}

async function streamGroupVirtual () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"label":"云虚拟节点",`)
  outputStream.write(`"viewType":"group-virtual",`)
  outputStream.write(`"children":`)
  await streamMixedVirtualFields(500, 1000)
  outputStream.write('}')
}

async function streamGroupCloudBridge () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"label":"桥节点",`)
  outputStream.write(`"viewType":"group-cloud-bridge",`)
  outputStream.write(`"children":`)
  await streamArray(generateCloudBridgeNode, 100, 200)
  outputStream.write('}')
}

function generateCloudBridgeNode () {
  return {
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
  }
}

function generateCloudBridgeField () {
  return {
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
        children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`S端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-sourcePoint', false)),
      },
      {
        uniqueId: faker.string.uuid(),
        label: 'R端点分组',
        viewType: 'group-cloud-receive',
        children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`R端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-receivePoint', false)),
      },
    ],
  }
}

async function streamGroupCloudWork () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"label":"普通节点",`)
  outputStream.write(`"viewType":"group-cloud-work",`)
  outputStream.write(`"children":`)
  await streamArray(() => generateCloudWorkNode(faker.helpers.arrayElement(['work', 'backup'])), 100, 200)
  outputStream.write('}')
}

function generateCloudWorkNode (type) {
  const isWork = type === 'work'
  const labelPrefix = isWork ? '普通节点' : '备份节点'
  const viewTypeNode = isWork ? 'cloud-work-node' : 'cloud-backup-node'
  const viewTypeField = isWork ? 'cloud-work-field' : 'cloud-backup-field'
  const pointPrefix = isWork ? 'W' : 'BU'
  return {
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
      label: `身份-${pointPrefix}${faker.number.int({ min: 1, max: 999 })}`,
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
          children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`S端点-${pointPrefix}${faker.number.int({ min: 1, max: 999 })}`, isWork ? 'cloud-work-sourcePoint' : 'cloud-backup-sourcePoint', true)),
        },
        {
          uniqueId: faker.string.uuid(),
          label: 'R端点分组',
          viewType: 'group-cloud-receive',
          children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`R端点-${pointPrefix}${faker.number.int({ min: 1, max: 999 })}`, isWork ? 'cloud-work-receivePoint' : 'cloud-backup-receivePoint', true)),
        },
      ],
    })),
  }
}

async function streamFogNetwork () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"label":"雾网络",`)
  outputStream.write(`"viewType":"fog-network",`)
  outputStream.write(`"fogId":"fogId_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"modelCode":"modelCode_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"modelName":"name_${faker.lorem.words({ min: 2, max: 4 })}",`)
  outputStream.write(`"measurementPeriod":0,`)
  outputStream.write(`"nodeCount":${faker.number.int({ min: 0, max: 9999 })},`)
  outputStream.write(`"networkType":"networkType_${faker.string.alphanumeric(12)}",`)
  outputStream.write(`"pipeDetail":`)
  await streamArray(generateFogPipeDetailItem, 5000, 10000)
  outputStream.write(',')
  outputStream.write(`"children":[`)
  await streamGroupFogBridge()
  outputStream.write(',')
  await streamGroupFogWork()
  outputStream.write(']')
  outputStream.write('}')
}

function generateFogPipeDetailItem () {
  return {
    pipeNo: `pipeNo_${faker.string.alphanumeric(12)}`,
    pipeType: `pipeType_${faker.string.alphanumeric(12)}`,
    pipeDataType: `pipeDataType_${faker.string.alphanumeric(12)}`,
    pipeDescription: faker.lorem.paragraph(1),
    sourcePoint: generatePoint('S端点-FG-PIPE', 'fog-pipe-sourcePoint', false),
    receivePoints: Array.from({ length: faker.number.int({ min: 1, max: 8 }) }, () => generatePoint('R端点-FG-PIPE', 'fog-pipe-receivePoint', false)),
  }
}

async function streamGroupFogBridge () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"label":"桥节点",`)
  outputStream.write(`"viewType":"group-fog-bridge",`)
  outputStream.write(`"children":`)
  await streamArray(generateFogBridgeNode, 3, 3)
  outputStream.write('}')
}

function generateFogBridgeNode () {
  return {
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
  }
}

function generateFogBridgeField () {
  return {
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
        children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`S端点-FB${faker.number.int({ min: 1, max: 999 })}`, 'fog-bridge-sourcePoint', false)),
      },
      {
        uniqueId: faker.string.uuid(),
        label: '雾-R端点分组',
        viewType: 'group-fog-bridge-receivePoint',
        children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`R端点-FB${faker.number.int({ min: 1, max: 999 })}`, 'fog-bridge-receivePoint', false)),
      },
      {
        uniqueId: faker.string.uuid(),
        label: '云-S端点分组',
        viewType: 'group-cloud-bridge-sourcePoint',
        children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`S端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-sourcePoint', false)),
      },
      {
        uniqueId: faker.string.uuid(),
        label: '云-R端点分组',
        viewType: 'group-cloud-bridge-receivePoint',
        children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`R端点-B${faker.number.int({ min: 1, max: 999 })}`, 'cloud-bridge-receivePoint', false)),
      },
    ],
  }
}

async function streamGroupFogWork () {
  outputStream.write('{')
  outputStream.write(`"uniqueId":"${faker.string.uuid()}",`)
  outputStream.write(`"label":"普通节点",`)
  outputStream.write(`"viewType":"group-fog-work",`)
  outputStream.write(`"children":`)
  await streamArray(() => generateFogWorkNode(faker.helpers.arrayElement(['work', 'backup'])), 50, 100)
  outputStream.write('}')
}

function generateFogWorkNode (type) {
  const isWork = type === 'work'
  const viewTypeNode = isWork ? 'fog-work-node' : 'fog-backup-node'
  return {
    uniqueId: faker.string.uuid(),
    redundantGroupId: faker.helpers.arrayElement(['', '002', '003', '004']),
    label: `普通节点-FG${faker.number.int({ min: 1, max: 999 })}`,
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
      viewType: 'fog-work-field',
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
          children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`S端点-FW${faker.number.int({ min: 1, max: 999 })}`, 'fog-work-sourcePoint', false)),
        },
        {
          uniqueId: faker.string.uuid(),
          label: 'R端点分组',
          viewType: 'group-fog-work-receivePoint',
          children: Array.from({ length: faker.number.int({ min: 500, max: 1000 }) }, () => generatePoint(`R端点-FW${faker.number.int({ min: 1, max: 999 })}`, 'fog-work-receivePoint', false)),
        },
      ],
    })),
  }
}

generateFakeData().catch(err => console.error('错误:', err))