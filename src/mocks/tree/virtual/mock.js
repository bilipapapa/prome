export const tree = {
  'data|100-1000': [{
    id: '@natural',
    label: '@ctitle(3,8)',
    'children|10-50': [{
      id: '@natural',
      label: '@ctitle(4,8)',
      'children|2-10': [{
        id: '@natural',
        label: '@ctitle(5,10)',
      }]
    }]
  }],
}


export const tree2 = {
  'data|1000-10000': [{
    id: '@natural',
    label: '@ctitle(3,8)',
    'children|10-50': [{
      id: '@natural',
      label: '@ctitle(4,8)',
      'children|2-10': [{
        id: '@natural',
        label: '@ctitle(5,10)',
      }]
    }]
  }],
}

export const tree3 = {
  'data|10000-100000': [{
    id: '@natural',
    label: '@ctitle(3,8)',
    'children|1-3': [{
      id: '@natural',
      label: '@ctitle(4,8)',
      'children|2-10': [{
        id: '@natural',
        label: '@ctitle(5,10)',
      }]
    }]
  }],
}

export const cloudNetWork = {
  "data|1": [{
    "uniqueId": "@guid",
    "cloudNo": "cloudNo_@string(12)",
    "label": "云网络",
    "viewType": "cloud-network",
    "modelCode": "modelCode_@string(12)",
    "modelName": "@ctitle(2,4)",
    "measurementPeriod": 0,
    "encryptType": "encryptType_@string(12)",
    "encryptSeed": "encryptSeed_@string(12)",
    "networkType": "networkType_@string(12)",
    "nodeCount": "@integer(0,9999)",
    "modelDescription": "@cparagraph(1,2)",
    "modelStatus": "modelStatus_@string(12)",

    // pipeDetail：每个 pipe 有单个 sourcePoint 和多个 receivePoints
    "pipeDetail|20000-200000": [
      {
        "pipeNo": "pipeNo_@string(12)",
        "pipeType": "pipeType_@string(12)",
        "pipeDataType": "pipeDataType_@string(12)",
        "pipeDescription": "@cparagraph(1)",
        "sourcePoint": {
          "uniqueId": "@guid",
          "label": "S端点-PIPE",
          "viewType": "pipe-sourcePoint",
          "pointNo": "@integer(0,9999)",
          "pointName": "pointName_@string(10)",
          "physicalMeaning": "@csentence(1,3)",
          "remark": "@cparagraph(1)",
          "dataType": "dataType_@string(10)",
          "unit": "unit_@string(6)",
          "pipeNo": "@integer(0,9999)",
          "pipeType": "pipeType_@string(8)"
        },
        "receivePoints|1-8": [
          {
            "uniqueId": "@guid",
            "label": "R端点-PIPE",
            "viewType": "pipe-receivePoint",
            "pointNo": "@integer(0,9999)",
            "pointName": "pointName_@string(10)",
            "physicalMeaning": "@csentence(1,3)",
            "remark": "@cparagraph(1)",
            "dataType": "dataType_@string(10)",
            "unit": "unit_@string(6)",
            "pipeNo": "@integer(0,9999)",
            "pipeType": "pipeType_@string(8)"
          }
        ]
      }
    ],

    // 根 children：固定 4 个分组（顺序与你样例一致）
    "children": [
      // 1) 云虚拟节点（group-virtual）
      {
        "uniqueId": "@guid",
        "label": "云虚拟节点",
        "viewType": "group-virtual",
        // virtual-field 多条（混合两种模板：digitalDevices 型 和 digitalPanels 型）
        "children|500-1000": [
          // 模板 A: 带 digitalDevices，children 只能是 virtual-receivePoint
          {
            "uniqueId": "@guid",
            "label": "F@integer(1,999)-数字设备组",
            "viewType": "virtual-field",
            "fieldId": "@integer(0,9999)",
            "fieldNo": "@integer(0,9999)",
            "fieldName": "fieldName_@string(10)",
            "fieldStatus": "fieldStatus_@string(12)",
            "roleCount": "@integer(0,5)",
            // digitalDevices 也大量生成
            "digitalDevices|5000-10000": [
              {
                "deviceNo": "@integer(0,9999)",
                "deviceName": "deviceName_@string(10)",
                "deviceSn": "deviceSn_@string(12)",
                "deviceIdentifier": "deviceIdentifier_@string(12)",
                "storageStatus": "storageStatus_@string(10)",
                "remark": "@cparagraph(1)",
                "templateId": "@integer(0,9999)"
              }
            ],
            // children（**仅 virtual-receivePoint**）
            "children|500-1000": [
              {
                "uniqueId": "@guid",
                "label": "R端点-V@integer(1,999)",
                "viewType": "virtual-receivePoint",
                "pointNo": "@integer(0,9999)",
                "pointName": "pointName_@string(10)",
                "physicalMeaning": "@csentence(1,3)",
                "remark": "@cparagraph(1)",
                "dataType": "dataType_@string(10)",
                "unit": "unit_@string(6)",
                "pipeNo": "@integer(0,9999)",
                "pipeType": "pipeType_@string(8)",
                // bitDetail 也严格生成（多条）
                "bitDetail|32": [
                  {
                    "parentNo": "@integer(0,9999)",
                    "parentName": "parentName_@string(10)",
                    "bitStatus": "bitStatus_@string(10)",
                    "pointNo": "@integer(0,9999)",
                    "pointName": "pointName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "openApiIdentifier": "openApiIdentifier_@string(10)"
                  }
                ]
              }
            ]
          },

          // 模板 B: 带 digitalPanels，children 只能是 virtual-sourcePoint
          {
            "uniqueId": "@guid",
            "label": "F@integer(1,999)-数字面板组",
            "viewType": "virtual-field",
            "fieldId": "@integer(0,9999)",
            "fieldNo": "@integer(0,9999)",
            "fieldName": "fieldName_@string(10)",
            "fieldStatus": "fieldStatus_@string(12)",
            "roleCount": "@integer(0,5)",
            "digitalPanels|5000-10000": [
              {
                "deviceNo": "@integer(0,9999)",
                "deviceName": "deviceName_@string(10)",
                "deviceSn": "deviceSn_@string(12)",
                "deviceIdentifier": "deviceIdentifier_@string(12)",
                "storageStatus": "storageStatus_@string(10)",
                "remark": "@cparagraph(1)",
                "templateId": "@integer(0,9999)"
              }
            ],
            // children（**仅 virtual-sourcePoint**）
            "children|500-1024": [
              {
                "uniqueId": "@guid",
                "label": "S端点-V@integer(1,999)",
                "viewType": "virtual-sourcePoint",
                "pointNo": "@integer(0,9999)",
                "pointName": "pointName_@string(10)",
                "physicalMeaning": "@csentence(1,3)",
                "remark": "@cparagraph(1)",
                "dataType": "dataType_@string(10)",
                "unit": "unit_@string(6)",
                "pipeNo": "@integer(0,9999)",
                "pipeType": "pipeType_@string(8)",
                "bitDetail|32": [
                  {
                    "parentNo": "@integer(0,9999)",
                    "parentName": "parentName_@string(10)",
                    "bitStatus": "bitStatus_@string(10)",
                    "pointNo": "@integer(0,9999)",
                    "pointName": "pointName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "openApiIdentifier": "openApiIdentifier_@string(10)"
                  }
                ]
              }
            ]
          }
        ]
      },

      // 2) 桥节点分组（group-cloud-bridge）
      {
        "uniqueId": "@guid",
        "label": "桥节点",
        "viewType": "group-cloud-bridge",
        // cloud-bridge-node 多条
        "children|100-200": [
          {
            "uniqueId": "@guid",
            "redundantGroupId": "@pick(['', ''])", // 桥节点通常不强制冗余
            "label": "桥节点@integer(1,999)",
            "viewType": "cloud-bridge-node",
            "nodeNo": "@integer(0,9999)",
            "backupNodeNo": "@integer(0,9999)",
            "nodeModel": "nodeModel_@string(12)",
            "nodeName": "nodeName_@string(10)",
            "nodeId": "nodeId_@string(12)",
            "softVersion": "softVersion_@string(10)",
            "nodeType": "nodeType_@string(10)",
            "syncNodeFlag": "@pick(['syncNodeFlag_true','syncNodeFlag_false'])",
            "syncNodeNo": "syncNodeNo_@string(8)",
            "networkProperties|500-1000": [
              {
                "propertyNo": "@integer(0,9999)",
                "propertyName": "propertyName_@string(10)",
                "physicalMeaning": "@csentence(1,2)",
                "remark": "@cparagraph(1)",
                "dataType": "dataType_@string(10)",
                "textValue": "@string(6)"
              }
            ],
            // cloud-bridge-field 列表（1-3 个 field，但每个 field 内的大数组会很多）
            "children|1-3": [
              {
                "uniqueId": "@guid",
                "label": "身份-B@integer(1,999)",
                "viewType": "cloud-bridge-field",
                "fieldId": "@integer(0,9999)",
                "fieldNo": "@integer(0,9999)",
                "fieldName": "fieldName_@string(10)",
                "fieldStatus": "fieldStatus_@string(12)",
                "roleCount": "@integer(0,5)",
                "specialProperties|10000-20000": [
                  {
                    "propertyNo": "@integer(0,9999)",
                    "propertyName": "propertyName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "dataType": "dataType_@string(10)",
                    "textValue": "@string(6)"
                  }
                ],
                "protocolProperties|500-1000": [
                  {
                    "blockNo": "blockNo_@string(10)",
                    "functionId": "functionId_@string(10)",
                    "functionNo": "functionNo_@string(10)",
                    "dataType": "dataType_@string(10)",
                    "functionDescription": "@csentence(1,2)",
                    "unit": "unit_@string(6)",
                    "functionStatus": "functionStatus_@string(10)",
                    "registerAddress": "registerAddress_@string(10)",
                    "registerDataType": "registerDataType_@string(10)",
                    "registerNum": "@integer(0,100)",
                    "functionCode": "functionCode_@string(10)",
                    "gain": "@float(0,10,0,2)",
                    "offset": "@integer(0,10)",
                    "byteOrder": "@pick(['big','little'])",
                    "offsetBit": "@integer(0,7)",
                    "significanceBit": "@integer(0,7)"
                  }
                ],
                // field 的 children **严格只含两个分组**：S端点分组 和 R端点分组
                "children": [
                  {
                    "uniqueId": "@guid",
                    "label": "S端点分组",
                    "viewType": "group-cloud-source",
                    "children|500-1000": [
                      {
                        "uniqueId": "@guid",
                        "label": "S端点-B@integer(1,999)",
                        "viewType": "cloud-bridge-sourcePoint",
                        "pointNo": "@integer(0,9999)",
                        "pointName": "pointName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "unit": "unit_@string(6)",
                        "pipeNo": "@integer(0,9999)",
                        "pipeType": "pipeType_@string(8)"
                      }
                    ]
                  },
                  {
                    "uniqueId": "@guid",
                    "label": "R端点分组",
                    "viewType": "group-cloud-receive",
                    "children|500-1000": [
                      {
                        "uniqueId": "@guid",
                        "label": "R端点-B@integer(1,999)",
                        "viewType": "cloud-bridge-receivePoint",
                        "pointNo": "@integer(0,9999)",
                        "pointName": "pointName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "unit": "unit_@string(6)",
                        "pipeNo": "@integer(0,9999)",
                        "pipeType": "pipeType_@string(8)"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      // 3) 普通节点分组（group-cloud-work）
      {
        "uniqueId": "@guid",
        "label": "普通节点",
        "viewType": "group-cloud-work",
        // children 中混合 cloud-work-node 与 cloud-backup-node 两种视图
        "children|100-200": [
          // cloud-work-node 模板
          {
            "uniqueId": "@guid",
            "redundantGroupId": "@pick(['', '001', '002', '003'])",
            "label": "普通节点@integer(1,999)",
            "viewType": "@pick(['cloud-work-node','cloud-backup-node'])",
            "nodeNo": "@integer(0,9999)",
            "backupNodeNo": "@integer(0,9999)",
            "nodeModel": "nodeModel_@string(12)",
            "nodeName": "nodeName_@string(10)",
            "nodeId": "nodeId_@string(12)",
            "softVersion": "softVersion_@string(10)",
            "nodeType": "nodeType_@string(10)",
            "syncNodeFlag": "@pick(['syncNodeFlag_true','syncNodeFlag_false'])",
            "syncNodeNo": "syncNodeNo_@string(8)",
            "networkProperties|500-1000": [
              {
                "propertyNo": "@integer(0,9999)",
                "propertyName": "propertyName_@string(10)",
                "physicalMeaning": "@csentence(1,2)",
                "remark": "@cparagraph(1)",
                "dataType": "dataType_@string(10)",
                "textValue": "@string(6)"
              }
            ],
            // children（field 列表，field 的 children 必为两个分组）
            "children|8": [
              {
                "uniqueId": "@guid",
                "label": "身份-W@integer(1,999)",
                "viewType": "cloud-work-field",
                "fieldId": "@integer(0,9999)",
                "fieldNo": "@integer(0,9999)",
                "fieldName": "fieldName_@string(10)",
                "fieldStatus": "fieldStatus_@string(12)",
                "roleCount": "@integer(0,5)",

                "specialProperties|10000-20000": [
                  {
                    "propertyNo": "@integer(0,9999)",
                    "propertyName": "propertyName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "dataType": "dataType_@string(10)",
                    "textValue": "@string(6)"
                  }
                ],

                "protocolProperties|500-1000": [
                  {
                    "blockNo": "blockNo_@string(10)",
                    "functionId": "functionId_@string(10)",
                    "functionNo": "functionNo_@string(10)",
                    "dataType": "dataType_@string(10)",
                    "functionDescription": "@csentence(1,2)",
                    "unit": "unit_@string(6)",
                    "functionStatus": "functionStatus_@string(10)",
                    "registerAddress": "registerAddress_@string(10)",
                    "registerDataType": "registerDataType_@string(10)",
                    "registerNum": "@integer(0,100)",
                    "functionCode": "functionCode_@string(10)",
                    "gain": "@float(0,10,0,2)",
                    "offset": "@integer(0,10)",
                    "byteOrder": "@pick(['big','little'])",
                    "offsetBit": "@integer(0,7)",
                    "significanceBit": "@integer(0,7)"
                  }
                ],

                // field 的 children **严格两组**：S端点分组 & R端点分组
                "children": [
                  {
                    "uniqueId": "@guid",
                    "label": "S端点分组",
                    "viewType": "group-cloud-source",
                    "children|500-1000": [
                      {
                        "uniqueId": "@guid",
                        "label": "S端点-W@integer(1,999)",
                        "viewType": "cloud-work-sourcePoint",
                        "pointNo": "@integer(0,9999)",
                        "pointName": "pointName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "unit": "unit_@string(6)",
                        "pipeNo": "@integer(0,9999)",
                        "pipeType": "pipeType_@string(8)",
                        "bitDetail|32": [
                          {
                            "parentNo": "@integer(0,9999)",
                            "parentName": "parentName_@string(10)",
                            "bitStatus": "bitStatus_@string(10)",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "openApiIdentifier": "openApiIdentifier_@string(10)"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "uniqueId": "@guid",
                    "label": "R端点分组",
                    "viewType": "group-cloud-receive",
                    "children|500-1000": [
                      {
                        "uniqueId": "@guid",
                        "label": "R端点-W@integer(1,999)",
                        "viewType": "cloud-work-receivePoint",
                        "pointNo": "@integer(0,9999)",
                        "pointName": "pointName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "unit": "unit_@string(6)",
                        "pipeNo": "@integer(0,9999)",
                        "pipeType": "pipeType_@string(8)",
                        "bitDetail|32": [
                          {
                            "parentNo": "@integer(0,9999)",
                            "parentName": "parentName_@string(10)",
                            "bitStatus": "bitStatus_@string(10)",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "openApiIdentifier": "openApiIdentifier_@string(10)"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },

              // cloud-backup-node 模板（保证备份节点存在）
              {
                "uniqueId": "@guid",
                "redundantGroupId": "@pick(['', '001', '002', '003'])",
                "label": "备份节点@integer(1,999)",
                "viewType": "cloud-backup-node",
                "nodeNo": "@integer(0,9999)",
                "backupNodeNo": "@integer(0,9999)",
                "nodeModel": "nodeModel_@string(12)",
                "nodeName": "nodeName_@string(10)",
                "nodeId": "nodeId_@string(12)",
                "softVersion": "softVersion_@string(10)",
                "nodeType": "nodeType_@string(10)",
                "syncNodeFlag": "@pick(['syncNodeFlag_true','syncNodeFlag_false'])",
                "syncNodeNo": "syncNodeNo_@string(8)",
                "networkProperties|500-1000": [
                  {
                    "propertyNo": "@integer(0,9999)",
                    "propertyName": "propertyName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "dataType": "dataType_@string(10)",
                    "textValue": "@string(6)"
                  }
                ],
                "children|8": [
                  {
                    "uniqueId": "@guid",
                    "label": "身份-BU@integer(1,999)",
                    "viewType": "cloud-backup-field",
                    "fieldId": "@integer(0,9999)",
                    "fieldNo": "@integer(0,9999)",
                    "fieldName": "fieldName_@string(10)",
                    "fieldStatus": "fieldStatus_@string(12)",
                    "roleCount": "@integer(0,5)",
                    "specialProperties|10000-20000": [
                      {
                        "propertyNo": "@integer(0,9999)",
                        "propertyName": "propertyName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "textValue": "@string(6)"
                      }
                    ],
                    "protocolProperties|500-1000": [
                      {
                        "blockNo": "blockNo_@string(10)",
                        "functionId": "functionId_@string(10)",
                        "functionNo": "functionNo_@string(10)",
                        "dataType": "dataType_@string(10)",
                        "functionDescription": "@csentence(1,2)",
                        "unit": "unit_@string(6)",
                        "functionStatus": "functionStatus_@string(10)",
                        "registerAddress": "registerAddress_@string(10)",
                        "registerDataType": "registerDataType_@string(10)",
                        "registerNum": "@integer(0,100)",
                        "functionCode": "functionCode_@string(10)",
                        "gain": "@float(0,10,0,2)",
                        "offset": "@integer(0,10)",
                        "byteOrder": "@pick(['big','little'])",
                        "offsetBit": "@integer(0,7)",
                        "significanceBit": "@integer(0,7)"
                      }
                    ],
                    "children": [
                      {
                        "uniqueId": "@guid",
                        "label": "S端点分组",
                        "viewType": "group-cloud-source",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "S端点-BU@integer(1,999)",
                            "viewType": "cloud-backup-sourcePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      },
                      {
                        "uniqueId": "@guid",
                        "label": "R端点分组",
                        "viewType": "group-cloud-receive",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "R端点-BU@integer(1,999)",
                            "viewType": "cloud-backup-receivePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },

      // 4) 雾网络（fog-network）
      {
        "uniqueId": "@guid",
        "label": "雾网络",
        "viewType": "fog-network",
        "fogId": "fogId_@string(12)",
        "modelCode": "modelCode_@string(12)",
        "modelName": "name_@ctitle(2,4)",
        "measurementPeriod": 0,
        "nodeCount": "@integer(0,9999)",
        "networkType": "networkType_@string(12)",
        "pipeDetail|5000-10000": [
          {
            "pipeNo": "pipeNo_@string(12)",
            "pipeType": "pipeType_@string(12)",
            "pipeDataType": "pipeDataType_@string(12)",
            "pipeDescription": "@cparagraph(1)",
            "sourcePoint": {
              "uniqueId": "@guid",
              "label": "S端点-FG-PIPE",
              "viewType": "fog-pipe-sourcePoint",
              "pointNo": "@integer(0,9999)",
              "pointName": "pointName_@string(10)",
              "physicalMeaning": "@csentence(1,2)",
              "remark": "@cparagraph(1)",
              "dataType": "dataType_@string(10)",
              "unit": "unit_@string(6)",
              "pipeNo": "@integer(0,9999)",
              "pipeType": "pipeType_@string(8)"
            },
            "receivePoints|1-8": [
              {
                "uniqueId": "@guid",
                "label": "R端点-FG-PIPE",
                "viewType": "fog-pipe-receivePoint",
                "pointNo": "@integer(0,9999)",
                "pointName": "pointName_@string(10)",
                "physicalMeaning": "@csentence(1,2)",
                "remark": "@cparagraph(1)",
                "dataType": "dataType_@string(10)",
                "unit": "unit_@string(6)",
                "pipeNo": "@integer(0,9999)",
                "pipeType": "pipeType_@string(8)"
              }
            ]
          }
        ],
        // fog-network 的 children 固定包含两个分组（桥节点分组 + 普通节点分组）
        "children": [
          // fog - 桥节点分组
          {
            "uniqueId": "@guid",
            "label": "桥节点",
            "viewType": "group-fog-bridge",
            "children|3": [
              {
                "uniqueId": "@guid",
                "redundantGroupId": "@pick(['', ''])",
                "label": "桥节点@integer(1,999)",
                "viewType": "fog-bridge-node",
                "nodeNo": "@integer(0,9999)",
                "backupNodeNo": "@integer(0,9999)",
                "nodeModel": "nodeModel_@string(12)",
                "nodeName": "nodeName_@string(10)",
                "nodeId": "nodeId_@string(12)",
                "softVersion": "softVersion_@string(10)",
                "nodeType": "nodeType_@string(10)",
                "syncNodeFlag": "@pick(['syncNodeFlag_true','syncNodeFlag_false'])",
                "syncNodeNo": "syncNodeNo_@string(8)",
                "networkProperties|500-1000": [
                  {
                    "propertyNo": "@integer(0,9999)",
                    "propertyName": "propertyName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "dataType": "dataType_@string(10)",
                    "textValue": "@string(6)"
                  }
                ],
                "children|8": [
                  {
                    "uniqueId": "@guid",
                    "label": "身份-FB@integer(1,999)",
                    "viewType": "fog-bridge-field",
                    "fieldId": "@integer(0,9999)",
                    "fieldNo": "@integer(0,9999)",
                    "fieldName": "fieldName_@string(10)",
                    "fieldStatus": "fieldStatus_@string(12)",
                    "roleCount": "@integer(0,5)",
                    "specialProperties|10000-20000": [
                      {
                        "propertyNo": "@integer(0,9999)",
                        "propertyName": "propertyName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "textValue": "@string(6)"
                      }
                    ],
                    "protocolProperties|500-1000": [
                      {
                        "blockNo": "blockNo_@string(10)",
                        "functionId": "functionId_@string(10)",
                        "functionNo": "functionNo_@string(10)",
                        "dataType": "dataType_@string(10)",
                        "functionDescription": "@csentence(1,2)",
                        "unit": "unit_@string(6)",
                        "functionStatus": "functionStatus_@string(10)",
                        "registerAddress": "registerAddress_@string(10)",
                        "registerDataType": "registerDataType_@string(10)",
                        "registerNum": "@integer(0,100)",
                        "functionCode": "functionCode_@string(10)",
                        "gain": "@float(0,10,0,2)",
                        "offset": "@integer(0,10)",
                        "byteOrder": "@pick(['big','little'])",
                        "offsetBit": "@integer(0,7)",
                        "significanceBit": "@integer(0,7)"
                      }
                    ],
                    // **特殊：fog-bridge-field 的 children 固定 4 个分组**
                    "children": [
                      // 1: 雾-S端点分组
                      {
                        "uniqueId": "@guid",
                        "label": "雾-S端点分组",
                        "viewType": "group-fog-bridge-sourcePoint",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "S端点-FB@integer(1,999)",
                            "viewType": "fog-bridge-sourcePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      },
                      // 2: 雾-R端点分组
                      {
                        "uniqueId": "@guid",
                        "label": "雾-R端点分组",
                        "viewType": "group-fog-bridge-receivePoint",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "R端点-FB@integer(1,999)",
                            "viewType": "fog-bridge-receivePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      },
                      // 3: 云-S端点分组（示例跨层混合）
                      {
                        "uniqueId": "@guid",
                        "label": "云-S端点分组",
                        "viewType": "group-cloud-bridge-sourcePoint",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "S端点-B@integer(1,999)",
                            "viewType": "cloud-bridge-sourcePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      },
                      // 4: 云-R端点分组
                      {
                        "uniqueId": "@guid",
                        "label": "云-R端点分组",
                        "viewType": "group-cloud-bridge-receivePoint",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "R端点-B@integer(1,999)",
                            "viewType": "cloud-bridge-receivePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          // fog - 普通节点分组（group-fog-work）
          {
            "uniqueId": "@guid",
            "label": "普通节点",
            "viewType": "group-fog-work",
            "children|50-100": [
              {
                "uniqueId": "@guid",
                "redundantGroupId": "@pick(['', '002', '003', '004'])",
                "label": "普通节点-FG@integer(1,999)",
                "viewType": "@pick(['fog-work-node','fog-backup-node'])",
                "nodeNo": "@integer(0,9999)",
                "backupNodeNo": "@integer(0,9999)",
                "nodeModel": "nodeModel_@string(12)",
                "nodeName": "nodeName_@string(10)",
                "nodeId": "nodeId_@string(12)",
                "softVersion": "softVersion_@string(10)",
                "nodeType": "nodeType_@string(10)",
                "syncNodeFlag": "@pick(['syncNodeFlag_true','syncNodeFlag_false'])",
                "syncNodeNo": "syncNodeNo_@string(8)",
                "networkProperties|500-1000": [
                  {
                    "propertyNo": "@integer(0,9999)",
                    "propertyName": "propertyName_@string(10)",
                    "physicalMeaning": "@csentence(1,2)",
                    "remark": "@cparagraph(1)",
                    "dataType": "dataType_@string(10)",
                    "textValue": "@string(6)"
                  }
                ],
                "children|8": [
                  {
                    "uniqueId": "@guid",
                    "label": "身份-FW@integer(1,999)",
                    "viewType": "fog-work-field",
                    "fieldId": "@integer(0,9999)",
                    "fieldNo": "@integer(0,9999)",
                    "fieldName": "fieldName_@string(10)",
                    "fieldStatus": "fieldStatus_@string(12)",
                    "roleCount": "@integer(0,5)",
                    "specialProperties|10000-20000": [
                      {
                        "propertyNo": "@integer(0,9999)",
                        "propertyName": "propertyName_@string(10)",
                        "physicalMeaning": "@csentence(1,2)",
                        "remark": "@cparagraph(1)",
                        "dataType": "dataType_@string(10)",
                        "textValue": "@string(6)"
                      }
                    ],
                    "protocolProperties|500-1000": [
                      {
                        "blockNo": "blockNo_@string(10)",
                        "functionId": "functionId_@string(10)",
                        "functionNo": "functionNo_@string(10)",
                        "dataType": "dataType_@string(10)",
                        "functionDescription": "@csentence(1,2)",
                        "unit": "unit_@string(6)",
                        "functionStatus": "functionStatus_@string(10)",
                        "registerAddress": "registerAddress_@string(10)",
                        "registerDataType": "registerDataType_@string(10)",
                        "registerNum": "@integer(0,100)",
                        "functionCode": "functionCode_@string(10)",
                        "gain": "@float(0,10,0,2)",
                        "offset": "@integer(0,10)",
                        "byteOrder": "@pick(['big','little'])",
                        "offsetBit": "@integer(0,7)",
                        "significanceBit": "@integer(0,7)"
                      }
                    ],
                    // field 的 children 两组：S 与 R
                    "children": [
                      {
                        "uniqueId": "@guid",
                        "label": "S端点分组",
                        "viewType": "group-fog-work-sourcePoint",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "S端点-FW@integer(1,999)",
                            "viewType": "fog-work-sourcePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      },
                      {
                        "uniqueId": "@guid",
                        "label": "R端点分组",
                        "viewType": "group-fog-work-receivePoint",
                        "children|500-1000": [
                          {
                            "uniqueId": "@guid",
                            "label": "R端点-FW@integer(1,999)",
                            "viewType": "fog-work-receivePoint",
                            "pointNo": "@integer(0,9999)",
                            "pointName": "pointName_@string(10)",
                            "physicalMeaning": "@csentence(1,2)",
                            "remark": "@cparagraph(1)",
                            "dataType": "dataType_@string(10)",
                            "unit": "unit_@string(6)",
                            "pipeNo": "@integer(0,9999)",
                            "pipeType": "pipeType_@string(8)"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
      }
    ]
  }]
}