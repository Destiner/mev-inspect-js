const abi = [
  {
    anonymous: false,
    inputs: [],
    name: 'SwapNFTInPair',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'SwapNFTOutPair',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        internalType: 'uint128',
        name: 'newSpotPrice',
        type: 'uint128',
      },
    ],
    name: 'SpotPriceUpdate',
    type: 'event',
  },
  {
    inputs: [],
    name: 'factory',
    outputs: [
      {
        internalType: 'ILSSVMPairFactoryLike',
        name: 'factory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'ERC20',
        name: 'token',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nft',
    outputs: [
      {
        internalType: 'IERC721',
        name: 'nft',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bondingCurve',
    outputs: [
      {
        internalType: 'ICurve',
        name: 'bondingCurve',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'delta',
    outputs: [
      {
        internalType: 'uint128',
        name: 'delta',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        internalType: 'uint96',
        name: 'fee',
        type: 'uint96',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default abi;
