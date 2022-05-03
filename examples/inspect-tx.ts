import Inspector from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

const UNI_V2_SINGLE_SWAP_TX = '0xad39a3e5109e2c146f85f5db53a72da9af886b861d4965aacafdb165c1aec35e';
const UNI_V2_MULTI_PATH_TX = '0xd4ddb9ff1d8368dad9f3710d513021b093f303e02c7169467c0badcf6f44231b';
const SUSHI_UNI_V2_ARB_TX = '0x8baefcf7a8b848bdf8be594d55cb84ed26bf6ea6191dafaf33eedf09198453c6';
const SUSHI_SUSHI_SUSHI_ARB_TX = '0x861d5aba1de00eb99af5f6130d67543c0c79df9471b8ba4a8fe3ff9da60af2dc';
// const UNI3_UNI3_UNI3_UNI3_ARB_TX = '0x06387618ee3752bed447f192802895921a7d45a60875927adfedc93a68bcbe05';
// const UNI2_UNI3_ARB_TX = '0x88e99b372a7524a750bb846b91cd9433a22c7cce886edee4879b70cb47f0d0fe';
// const SUSHI_UNI3_ARB_TX = '0xd53808dc31c908b7acad610d5efa726afe67e7c9739083be9c1b4cb6d2cdaeac';
// const UNI2_UNI3_BAL_ARB_TX = '0x0ec1a4297b198c61598307ed92aa254a234abe8a6ee9415713f8f35a491e9d01';
// const BAL_BAL_ARB_TX = '0x355864b3e11f4fb83b231cbfbf53e964010f21ee720948c25776804ff64a91f6';
// const BAL_SUSHI_ARB_TX = '0xc9f1ebca7b22e1561b3488105b52ada628c0dc38f3eda5e7b5a84952fb5a0c63';
// const TRIPLE_ARB_TX = '0xa99c50336025abfaf8fa7df3e3617f77c4c99319d1173ce4cc86e730d3eb283a';

// const BAL_V1_BAL_V2_UNI_V2_SUSHI_SPLIT_TX = '0x93812ac129372837e1cee00bd09e9404fe604983181a457f8aaac41a645d0af8';
// const BAL_V2_UNI_V2_SPLIT_TX = '0x7054b0a671d433a0309f58bea26afc3c45d8a6af6472996a5eb2acd8a3da2eca';
// const BAL_V1_BAL_V2_0X_SPLIT_TX = '0x15db3882045da8df942d1d9c5069575d920002254b79c9d7b5c3ce4a385f1b83';

async function run(): Promise<void> {
  const provider = getProvider(CHAIN_ID);
  const inspector = new Inspector(CHAIN_ID, provider);
  const mevA = await inspector.tx(UNI_V2_SINGLE_SWAP_TX);
  const mevB = await inspector.tx(UNI_V2_MULTI_PATH_TX);
  const mevC = await inspector.tx(SUSHI_UNI_V2_ARB_TX);
  const mevD = await inspector.tx(SUSHI_SUSHI_SUSHI_ARB_TX);
  console.log(mevA, mevB, mevC, mevD);
}

run();
