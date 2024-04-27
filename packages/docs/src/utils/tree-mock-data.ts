export interface TreeNode {
  id: string;
  parentId: string;
  value: any;
  children?: TreeNode[];
}

export function genTreeData(args) {
  const tempArgs = args.slice(1, args.length);
  const result: string[] = [];
  Array.from({ length: args[0] }).forEach((_, index) => {
    result.push(`${index + 1}`);
  });

  let lastResult = [...result];
  while (tempArgs.length) {
    const temp = tempArgs.shift();
    const tempLastResult: string[] = [];
    for (const item of lastResult) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Array.from({ length: temp! }).forEach((_, index) => {
        result.push(`${item}-${index + 1}`);
        tempLastResult.push(`${item}-${index + 1}`);
      });
    }
    lastResult = tempLastResult;
  }

  const listTree = result.map((item) => ({
    id: item,
    parentId: item.split("-").slice(0, -1).join("-"),
    value: item,
  }));

  const listTreeMap: Record<string, TreeNode> = {};
  listTree.forEach((item) => {
    listTreeMap[item.id] = item;
  });

  const tree: TreeNode[] = [];
  for (const node of listTree) {
    if (listTreeMap[node.parentId]) {
      if (listTreeMap[node.parentId].children) {
        listTreeMap[node.parentId].children?.push(listTreeMap[node.id]);
      } else {
        listTreeMap[node.parentId].children = [listTreeMap[node.id]];
      }
    } else {
      listTreeMap[node.id].parentId = "root";
      tree.push(listTreeMap[node.id]);
    }
  }
  return tree;
}

export function genListTree(result = [], data) {
  data.forEach((i) => {
    result.push({
      id: i.id,
      parentId: i.parentId,
      children: i.children,
      value: i.value,
    });
    if (i.children) {
      genListTree(result, i.children);
    }
  });
  return result;
}
