type Node = {
  type: string;
  lang?: string | null;
  value?: string | null;
  children?: Node[];
};

export function remarkAsHtml() {
  return (tree: Node) => {
    function visit(node: Node | undefined) {
      if (!node) return;

      if (node.type === 'code' && node.lang === 'ashtml') {
        node.type = 'html';
        // The value remains as the HTML snippet inside the code block
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          visit(child);
        }
      }
    }

    visit(tree);
  };
}
