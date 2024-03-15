import { glob } from "glob";
import path from "node:path";
import os from "node:os";
import bplist from 'bplist-parser'
import fs from 'node:fs'
import { fileURLToPath } from 'url';

const { dirname } = path

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export const scan = async (handleProcess: any) => {
  try {
    const userHome = os.homedir();
    const basePath = path.join(
      userHome,
      "Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9"
    );

    const stickersPattern = path.join(basePath, "*/Stickers/fav.archive");
    console.time('scan')
    const files = await glob(stickersPattern);
    console.timeEnd('scan')
    
    for (let file of files) {
      const obj = await bplist.parseFile(file);
      // write obj to file with random filename
      const items = obj[0]['$objects']
      for (let item of items) {
        if (typeof item === 'string' && item.startsWith('http://vweixinf.tc.qq.com')) {
          handleProcess?.(item)
        }
      }
    }

  } catch (e) {
    console.log("error", e);
  }
};