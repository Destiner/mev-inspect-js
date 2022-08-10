const abi = [
  {
    name: 'TokenExchange',
    inputs: [
      {
        type: 'address',
        name: 'buyer',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'sold_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_sold',
        indexed: false,
      },
      {
        type: 'int128',
        name: 'bought_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_bought',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'TokenExchangeUnderlying',
    inputs: [
      {
        type: 'address',
        name: 'buyer',
        indexed: true,
      },
      {
        type: 'int128',
        name: 'sold_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_sold',
        indexed: false,
      },
      {
        type: 'int128',
        name: 'bought_id',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'tokens_bought',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'AddLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'AddLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[3]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[3]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'AddLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[4]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[4]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[3]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[3]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidity',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[4]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[4]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[2]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[2]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[3]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[3]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RemoveLiquidityImbalance',
    inputs: [
      {
        type: 'address',
        name: 'provider',
        indexed: true,
      },
      {
        type: 'uint256[4]',
        name: 'token_amounts',
        indexed: false,
      },
      {
        type: 'uint256[4]',
        name: 'fees',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'invariant',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'token_supply',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'CommitNewAdmin',
    inputs: [
      {
        type: 'uint256',
        name: 'deadline',
        indexed: true,
      },
      {
        type: 'address',
        name: 'admin',
        indexed: true,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'NewAdmin',
    inputs: [
      {
        type: 'address',
        name: 'admin',
        indexed: true,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'CommitNewFee',
    inputs: [
      {
        type: 'uint256',
        name: 'deadline',
        indexed: true,
      },
      {
        type: 'uint256',
        name: 'fee',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'admin_fee',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'NewFee',
    inputs: [
      {
        type: 'uint256',
        name: 'fee',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'admin_fee',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'RampA',
    inputs: [
      {
        type: 'uint256',
        name: 'old_A',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'new_A',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'initial_time',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 'future_time',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    name: 'StopRampA',
    inputs: [
      {
        type: 'uint256',
        name: 'A',
        indexed: false,
      },
      {
        type: 'uint256',
        name: 't',
        indexed: false,
      },
    ],
    anonymous: false,
    type: 'event',
  },
  {
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_owner',
      },
      {
        type: 'address[2]',
        name: '_coins',
      },
      {
        type: 'address',
        name: '_pool_token',
      },
      {
        type: 'uint256',
        name: '_A',
      },
      {
        type: 'uint256',
        name: '_fee',
      },
      {
        type: 'uint256',
        name: '_admin_fee',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    name: 'A',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'get_virtual_price',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'calc_token_amount',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'uint256[2]',
        name: 'amounts',
      },
      {
        type: 'bool',
        name: 'deposit',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'add_liquidity',
    outputs: [],
    inputs: [
      {
        type: 'uint256[2]',
        name: 'amounts',
      },
      {
        type: 'uint256',
        name: 'min_mint_amount',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'get_dy',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'get_dy_underlying',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'exchange',
    outputs: [],
    inputs: [
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'int128',
        name: 'j',
      },
      {
        type: 'uint256',
        name: 'dx',
      },
      {
        type: 'uint256',
        name: 'min_dy',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'remove_liquidity',
    outputs: [],
    inputs: [
      {
        type: 'uint256',
        name: '_amount',
      },
      {
        type: 'uint256[2]',
        name: 'min_amounts',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'remove_liquidity_imbalance',
    outputs: [],
    inputs: [
      {
        type: 'uint256[2]',
        name: 'amounts',
      },
      {
        type: 'uint256',
        name: 'max_burn_amount',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'calc_withdraw_one_coin',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'uint256',
        name: '_token_amount',
      },
      {
        type: 'int128',
        name: 'i',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'remove_liquidity_one_coin',
    outputs: [],
    inputs: [
      {
        type: 'uint256',
        name: '_token_amount',
      },
      {
        type: 'int128',
        name: 'i',
      },
      {
        type: 'uint256',
        name: 'min_amount',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'ramp_A',
    outputs: [],
    inputs: [
      {
        type: 'uint256',
        name: '_future_A',
      },
      {
        type: 'uint256',
        name: '_future_time',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'stop_ramp_A',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'commit_new_fee',
    outputs: [],
    inputs: [
      {
        type: 'uint256',
        name: 'new_fee',
      },
      {
        type: 'uint256',
        name: 'new_admin_fee',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'apply_new_fee',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'revert_new_parameters',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'commit_transfer_ownership',
    outputs: [],
    inputs: [
      {
        type: 'address',
        name: '_owner',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'apply_transfer_ownership',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'revert_transfer_ownership',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'admin_balances',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'uint256',
        name: 'i',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'withdraw_admin_fees',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'donate_admin_fees',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'kill_me',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'unkill_me',
    outputs: [],
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    name: 'coins',
    outputs: [
      {
        type: 'address',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'uint256',
        name: 'arg0',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'balances',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [
      {
        type: 'uint256',
        name: 'arg0',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'fee',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'admin_fee',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'owner',
    outputs: [
      {
        type: 'address',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'initial_A',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'future_A',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'initial_A_time',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'future_A_time',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'admin_actions_deadline',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'transfer_ownership_deadline',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'future_fee',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'future_admin_fee',
    outputs: [
      {
        type: 'uint256',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'future_owner',
    outputs: [
      {
        type: 'address',
        name: '',
      },
    ],
    inputs: [],
    stateMutability: 'view',
    type: 'function',
  },
];

export default abi;
