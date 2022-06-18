const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes4',
        name: 'id',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'assetProxy',
        type: 'address',
      },
    ],
    name: 'AssetProxyRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'makerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'feeRecipientAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'makerAssetData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'takerAssetData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'senderAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
    ],
    name: 'Cancel',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'makerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'orderSenderAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'orderEpoch',
        type: 'uint256',
      },
    ],
    name: 'CancelUpTo',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'makerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'feeRecipientAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'makerAssetData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'takerAssetData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'makerFeeAssetData',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'takerFeeAssetData',
        type: 'bytes',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'takerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'senderAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'makerAssetFilledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'takerAssetFilledAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'makerFeePaid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'takerFeePaid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'protocolFeePaid',
        type: 'uint256',
      },
    ],
    name: 'Fill',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'oldProtocolFeeCollector',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'updatedProtocolFeeCollector',
        type: 'address',
      },
    ],
    name: 'ProtocolFeeCollectorAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'oldProtocolFeeMultiplier',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'updatedProtocolFeeMultiplier',
        type: 'uint256',
      },
    ],
    name: 'ProtocolFeeMultiplier',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'signerAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'validatorAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isApproved',
        type: 'bool',
      },
    ],
    name: 'SignatureValidatorApproval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'transactionHash',
        type: 'bytes32',
      },
    ],
    name: 'TransactionExecution',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'EIP1271_MAGIC_VALUE',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'EIP712_EXCHANGE_DOMAIN_HASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowedValidators',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
    ],
    name: 'batchCancelOrders',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gasPrice',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'signerAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibZeroExTransaction.ZeroExTransaction[]',
        name: 'transactions',
        type: 'tuple[]',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'batchExecuteTransactions',
    outputs: [
      {
        internalType: 'bytes[]',
        name: '',
        type: 'bytes[]',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: 'takerAssetFillAmounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'batchFillOrKillOrders',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults[]',
        name: 'fillResults',
        type: 'tuple[]',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: 'takerAssetFillAmounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'batchFillOrders',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults[]',
        name: 'fillResults',
        type: 'tuple[]',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256[]',
        name: 'takerAssetFillAmounts',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'batchFillOrdersNoThrow',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults[]',
        name: 'fillResults',
        type: 'tuple[]',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'leftOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'rightOrders',
        type: 'tuple[]',
      },
      {
        internalType: 'bytes[]',
        name: 'leftSignatures',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes[]',
        name: 'rightSignatures',
        type: 'bytes[]',
      },
    ],
    name: 'batchMatchOrders',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults[]',
            name: 'left',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults[]',
            name: 'right',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'profitInLeftMakerAsset',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'profitInRightMakerAsset',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.BatchMatchedFillResults',
        name: 'batchMatchedFillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'leftOrders',
        type: 'tuple[]',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'rightOrders',
        type: 'tuple[]',
      },
      {
        internalType: 'bytes[]',
        name: 'leftSignatures',
        type: 'bytes[]',
      },
      {
        internalType: 'bytes[]',
        name: 'rightSignatures',
        type: 'bytes[]',
      },
    ],
    name: 'batchMatchOrdersWithMaximalFill',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults[]',
            name: 'left',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults[]',
            name: 'right',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'profitInLeftMakerAsset',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'profitInRightMakerAsset',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.BatchMatchedFillResults',
        name: 'batchMatchedFillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'cancelOrder',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'targetOrderEpoch',
        type: 'uint256',
      },
    ],
    name: 'cancelOrdersUpTo',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'cancelled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'currentContextAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'detachProtocolFeeCollector',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gasPrice',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'signerAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibZeroExTransaction.ZeroExTransaction',
        name: 'transaction',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'executeTransaction',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'order',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'takerAssetFillAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'fillOrKillOrder',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults',
        name: 'fillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'order',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'takerAssetFillAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'fillOrder',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults',
        name: 'fillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'filled',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes4',
        name: 'assetProxyId',
        type: 'bytes4',
      },
    ],
    name: 'getAssetProxy',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'order',
        type: 'tuple',
      },
    ],
    name: 'getOrderInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'orderStatus',
            type: 'uint8',
          },
          {
            internalType: 'bytes32',
            name: 'orderHash',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'orderTakerAssetFilledAmount',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibOrder.OrderInfo',
        name: 'orderInfo',
        type: 'tuple',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'signerAddress',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'isValidHashSignature',
    outputs: [
      {
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'order',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'isValidOrderSignature',
    outputs: [
      {
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'gasPrice',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'signerAddress',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibZeroExTransaction.ZeroExTransaction',
        name: 'transaction',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'isValidTransactionSignature',
    outputs: [
      {
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'makerAssetFillAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'marketBuyOrdersFillOrKill',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults',
        name: 'fillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'makerAssetFillAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'marketBuyOrdersNoThrow',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults',
        name: 'fillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'takerAssetFillAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'marketSellOrdersFillOrKill',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults',
        name: 'fillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: 'orders',
        type: 'tuple[]',
      },
      {
        internalType: 'uint256',
        name: 'takerAssetFillAmount',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'signatures',
        type: 'bytes[]',
      },
    ],
    name: 'marketSellOrdersNoThrow',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'makerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetFilledAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFeePaid',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'protocolFeePaid',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.FillResults',
        name: 'fillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'leftOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'rightOrder',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'leftSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'rightSignature',
        type: 'bytes',
      },
    ],
    name: 'matchOrders',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults',
            name: 'left',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults',
            name: 'right',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'profitInLeftMakerAsset',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'profitInRightMakerAsset',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.MatchedFillResults',
        name: 'matchedFillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'leftOrder',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'makerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'takerAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'feeRecipientAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'senderAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'makerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerAssetAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'makerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'takerFee',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expirationTimeSeconds',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'salt',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'makerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'makerFeeAssetData',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'takerFeeAssetData',
            type: 'bytes',
          },
        ],
        internalType: 'struct LibOrder.Order',
        name: 'rightOrder',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'leftSignature',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'rightSignature',
        type: 'bytes',
      },
    ],
    name: 'matchOrdersWithMaximalFill',
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults',
            name: 'left',
            type: 'tuple',
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'makerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerAssetFilledAmount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'makerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'takerFeePaid',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'protocolFeePaid',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibFillResults.FillResults',
            name: 'right',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'profitInLeftMakerAsset',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'profitInRightMakerAsset',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibFillResults.MatchedFillResults',
        name: 'matchedFillResults',
        type: 'tuple',
      },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'orderEpoch',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: 'preSign',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'preSigned',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'protocolFeeCollector',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'protocolFeeMultiplier',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'assetProxy',
        type: 'address',
      },
    ],
    name: 'registerAssetProxy',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'updatedProtocolFeeCollector',
        type: 'address',
      },
    ],
    name: 'setProtocolFeeCollectorAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: 'updatedProtocolFeeMultiplier',
        type: 'uint256',
      },
    ],
    name: 'setProtocolFeeMultiplier',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'validatorAddress',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approval',
        type: 'bool',
      },
    ],
    name: 'setSignatureValidatorApproval',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'assetData',
        type: 'bytes[]',
      },
      {
        internalType: 'address[]',
        name: 'fromAddresses',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'toAddresses',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]',
      },
    ],
    name: 'simulateDispatchTransferFromCalls',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'transactionsExecuted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export default abi;