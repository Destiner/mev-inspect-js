import { Inspector, getTransaction } from '../src/index.js';

import getProvider from './utils.js';

const CHAIN_ID = 1;

// Runs inspector across a range of blocks
// Compares found MEV with data from Flashbots dashboard

const START_BLOCK = 14713405;
const END_BLOCK = 14713514;

const flashbots: Record<string, number> = {
  '0x685e9b9ac4183eab8151803cc1ccd24d36e8f87c96417a7838ba4fe33867f976': 1,
  '0x203041ae46dd05c9ce547fa9f2734f9e686200884a7abd1c52d1b1883cf6cce8': 2,
  '0x1dbcdd3d995670101dc82cd9dffde62cfcc9cc795b6c7f314ba5ac9075b6953c': 1,
  '0xbd63f455eb7b11ea8a537189f04937dced3523d3ad59c654822e6e66d2d3b67a': 1,
  '0x4833085b258f6608d72b63a2b417fe850e6789d968553253e7b82b20c45b69c6': 1,
  '0xb83fc3583d9afd7988a087c4d5802506f9d4ce25048e164aedd566e2e1b07038': 1,
  '0x872d594f4ab99a866982db7c18dd4909f4a5e590b5ed537b3e435048630bc536': 1,
  '0xe712d9d9806c7e9333a574dd63814b9fe57d37f4f26ce30ed8067709b8ee3cd5': 1,
  '0x08b606f3c528907688cdcab26a70cea2b9dd409850838662eb4b98a30ac33900': 1,
  '0xcce82565d597057f6d0391fecb139e773cd9cac9a5f9d9ee5a21f7aa2b912bd3': 1,
  '0xc3e670f60c54f18f9d6d6fd02e5e9670682921cd4f3928a6f378e144d8389ce3': 1,
  '0x6af7ee48183a39042b6002de65b5215c91c2a5812a35287a16ee50ddf7d4e1a6': 1,
  '0x7664dbe6d2294382493f40a1faac16ab6720555122798df3c701c9944a8f744c': 1,
  '0xf07d25b5a268e13fee6e882c39930f7f89fbb1a9c0167e9282984c4fb7246325': 1,
  '0xe4481253f3b42d669f884f5fe1b8452942a1f1dba9f46e4dcbd34300cceb832d': 1,
  '0xa8c44882a0991f6c02cc6923a756c2b469d1d781e8df680c17f141207041691e': 1,
  '0x1c2bc096c780f1c21d0159bd81467d9f4fdb54d94d364c998094be8be105ffc6': 1,
  '0x187bcbe3fd8ff6584320f16ae51c8ec6243dd2d083507f37e5175ca02369675e': 1,
  '0xf29bcf34eb8d6cba380e481808a61d8b345935d30e91a23af0043965552bdd30': 1,
  '0x13bf57fe2a8b840b287be6e181a4a0735f3de3b37761e53c0e2a5ccca6932e20': 1,
  '0x8db7af20a6c19206fa7dfa287c6a313869f9fd9f9dc71047cebfe89752546750': 1,
  '0x70bc4665becd494547fe4d222f9be0d51bec06db37e85527f33120fbd446d979': 1,
  '0xb96cd125a2960e7a5ebb85e4197ed189b11ae1f1110e7ca66aaa411794207ffd': 1,
  '0x8c3bdc810c45decbd902166a819b42f18fcd042722cf345496d66b9782748377': 3,
  '0xf67c6cf9148b0a4976260860af1a2dccfea6d53b3b7903a32630497fa97b4a0b': 1,
  '0x464c3ce36372d94fd037bad2ed0c8a11d5a293a633bcfdfe6eaef8185b74aece': 1,
  '0x70496de79740d5962fa30af821a39fd1acebad19aa67b0021531a6d672677e04': 3,
  '0xc924da5f0cdcc10dcd6c07c93839e4b4b242d1c6e540dbe7a3b0b0b5bb255a30': 1,
  '0xe72ad56e862b8bd295712520189861ae7e1715883f98c9c8d4aeabbed2690ed2': 1,
  '0x93173e59cef1c38b52cbbf689dc047d48350afab56d5719c7dd589868335418f': 1,
  '0xda0beb01cedba3ce76e7b462c1e98a2de4f5e461f9da1a8e747aeff876d15f73': 1,
  '0xf2d1c036b7770fc4fc8f02a3e80df349b9685e6d329ef9836abb969dfcd61435': 1,
  '0x049203fdfaafbcaeff7dc5efdaec928d1f77fa4c8d3dbf9b6c545c5b7a9f7807': 1,
};

async function run(): Promise<void> {
  const provider = getProvider(CHAIN_ID);
  const inspector = new Inspector(CHAIN_ID, provider);
  const mevTxSet: Record<string, number> = {};
  for (let block = START_BLOCK; block <= END_BLOCK; block++) {
    console.log(`Inspecting block #${block}`)
    const blockMev = await inspector.block(block);
    for (const mev of blockMev) {
      const tx = getTransaction(mev);
      if (!tx) {
        continue;
      }
      if (!mevTxSet[tx.hash]) {
        mevTxSet[tx.hash] = 0;
      }
      mevTxSet[tx.hash] += 1;
    }
  }

  console.log(`Total MEV txs found: ${Object.keys(mevTxSet).length}`);

  const sameTxSameAmount: string[] = [];
  const sameTxMoreMev: string[] = [];
  const sameTxLessMev: string[] = [];
  const notFound: string[] = [];

  for (const tx in mevTxSet) {
    const flashbotCount = flashbots[tx] || 0;
    const count = mevTxSet[tx];
    if (count === flashbotCount) {
      sameTxSameAmount.push(tx);
    }
    if (count > flashbotCount) {
      sameTxMoreMev.push(tx);
    }
    if (count < flashbotCount) {
      sameTxLessMev.push(tx);
    }
  }
  for (const tx in flashbots) {
    if (!mevTxSet[tx]) {
      notFound.push(tx);
    }
  }

  console.log(`Equal transactions: ${sameTxSameAmount.length}`);
  console.log(`Transactions with more MEV found than Flashbots: ${sameTxMoreMev.length}`);
  for (const tx of sameTxMoreMev) {
    console.log(tx);
  }
  console.log(`Transactions with less MEV found than Flashbots: ${sameTxLessMev.length}`);
  for (const tx of sameTxLessMev) {
    console.log(tx);
  }
  console.log(`Transactions with MEV not found: ${notFound.length}`);
  for (const tx of notFound) {
    console.log(tx);
  }
}

run();
