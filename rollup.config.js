import clear from "rollup-plugin-clear";
import screeps from "rollup-plugin-screeps";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from 'rollup-plugin-typescript2' // <== 新增这一行
import fs from "fs";

const secret = JSON.parse(fs.readFileSync("./.secret.json", "utf-8"));
let config = secret[process.env.DEST];

// 根据指定的目标获取对应的配置项
if (!process.env.DEST) console.log("未指定目标, 代码将被编译但不会上传");
else if (!config)
{
    throw new Error("无效目标，请检查 secret.json 中是否包含对应配置");
}
// 根据指定的配置决定是上传还是复制到文件夹
const pluginDeploy = () =>
{
    if (config && config.copyPath)
    {
        // 复制到指定路径
        return copy({
            targets: [
                {
                    src: "dist/main.js",
                    dest: config.copyPath,
                },
                {
                    src: "dist/main.js.map",
                    dest: config.copyPath,
                    rename: (name) => name + ".map.js",
                    transform: (contents) => `module.exports = ${contents.toString()};`,
                },
            ],
            hook: "writeBundle",
            verbose: true,
        });
    } else
    {
        // 更新 .map 到 .map.js 并上传
        return screeps({ config, dryRun: !config });
    }
};

const scupload =
    config && config.copyPath
        ? // 复制到指定路径
        copy({
            targets: [
                {
                    src: "dist/main.js",
                    dest: config.copyPath,
                },
                {
                    src: "dist/main.js.map",
                    dest: config.copyPath,
                    rename: (name) => name + ".map.js",
                    transform: (contents) => `module.exports = ${contents.toString()};`,
                },
            ],
            hook: "writeBundle",
            verbose: true,
        })
        : // 更新 .map 到 .map.js 并上传
        screeps({ config, dryRun: !config });

export default {
    input: "src/main.ts",
    output: {
        file: "dist/main.js",
        format: "cjs",
        sourcemap: true,
    },
    plugins: [
        // 清除上次编译成果
        clear({ targets: ["dist"] }),
        // 打包依赖
        resolve(),
        // 模块化依赖
        commonjs(),
        //编译 ts
        typescript({ tsconfig: "./tsconfig.json" }), // <== 新增这一行，注意先后顺序不要搞错了
        // 执行上传或者复制
        pluginDeploy(),
    ],
};
