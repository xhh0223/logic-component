const path = require("path");
const { Project } = require("ts-morph");
(async () => {
    const project = new Project({
        tsConfigFilePath: path.resolve(__dirname, "tsconfig.types.json"),
    });

    project.getPreEmitDiagnostics();

    const r = await project.emit();

    // 将解析完的文件写到内存中，便于读取文件路径
    project.emitToMemory();
})();
