import { dirname } from "https://deno.land/std@0.224.0/path/mod.ts";
import * as acorn from "npm:acorn@8.12.0";
import { ValidationManager } from "./ValidationManager.js";

export class Validation {
  static typesForScopeLevel = [
    "MethodDefinition",
    "FunctionDeclaration",
    "BlockStatement",
    "ForStatement",
    "ForInStatement",
    "ForOfStatement",
    "ArrowFunctionExpression",
  ];

  constructor(path, depth = 0) {
    this.path = Deno.realPathSync(path);
    this.depth = depth;
    if (ValidationManager.paths.includes(this.path)) {
      return;
    }
    ValidationManager.paths.push(this.path);

    // console.log(" ".repeat(this.depth * 2), `# ${this.path}`);

    this.scopeLevel = 0;
    this.identifiers = [[
      ...["undefined"],
      ...["Object"],
      ...["Number", "Math"],
      ...["String", "RegExp"],
      ...["Array"],
      ...["Proxy"],
    ]];
    this.inClass = false;

    const ast = acorn.parse(Deno.readTextFileSync(path), {
      ecmaVersion: 2022,
      sourceType: "module",
      locations: true,
    });

    // console.dir(ast, { depth: null });

    this.validate(ast);
  }

  validate(node) {
    /*
    console.log(
      " ".repeat(this.depth * 2),
      node.loc.start.line,
      node.loc.start.column,
      this.scopeLevel,
      node.type,
    );
    */

    // インポート定義なら登録して再帰
    if (node.type === "ImportDeclaration") {
      const name = node.specifiers[0].local.name;
      this.pushIdentifier(this.scopeLevel, name);
      const path = `${dirname(this.path)}/${node.source.value}`;
      new Validation(path, this.depth + 1);
    }

    // エクスポート定義なら再帰
    if (node.type === "ExportNamedDeclaration") {
      if (node.source) {
        const path = `${dirname(this.path)}/${node.source.value}`;
        new Validation(path, this.depth + 1);
      }
    }

    // クラス定義なら登録してクラスに入る
    if (node.type === "ClassDeclaration") {
      const name = node.id.name;
      this.pushIdentifier(this.scopeLevel, name);
      this.inClass = true;
    }

    // プロパティ定義ならなにもせず再帰しない
    if (node.type === "PropertyDefinition") {
      return;
    }

    // メソッド定義なら自身のキーをチェックさせない
    if (node.type === "MethodDefinition") {
      delete node.key;
      for (const param of node.value.params) {
        if (param.type === "Identifier") {
          const name = param.name;
          this.pushIdentifier(this.scopeLevel + 1, name);
        }
        if (param.type === "AssignmentPattern") {
          const name = param.left.name;
          this.pushIdentifier(this.scopeLevel + 1, name);
        }
      }
    }

    // 関数定義なら登録
    if (node.type === "FunctionDeclaration") {
      const name = node.id.name;
      this.pushIdentifier(this.scopeLevel, name);
      for (const param of node.params) {
        if (param.type === "Identifier") {
          const name = param.name;
          this.pushIdentifier(this.scopeLevel + 1, name);
        }
        if (param.type === "AssignmentPattern") {
          const name = param.left.name;
          this.pushIdentifier(this.scopeLevel + 1, name);
        }
      }
    }

    // 変数定義なら登録
    if (node.type === "VariableDeclaration") {
      for (const declaration of node.declarations) {
        const name = declaration.id.name;
        this.pushIdentifier(this.scopeLevel, name);
      }
    }

    // 識別子が定義済みかチェック
    if (node.type === "Identifier") {
      if (!this.identifiers.flat().includes(node.name)) {
        this.pushError(node.name, node.loc.start);
      }
    }

    // メンバ式はオブジェクトとしてのみチェックして再帰しない
    if (node.type === "MemberExpression") {
      if (node.object.type === "ThisExpression") {
        if (!this.inClass) {
          this.pushError("this", node.loc.start);
        }
      } else if (
        node.object.name && !this.identifiers.flat().includes(node.object.name)
      ) {
        this.pushError(node.object.name, node.loc.start);
      }
      return;
    }

    // アロー関数式なら登録
    if (node.type === "ArrowFunctionExpression") {
      for (const param of node.params) {
        const name = param.name;
        this.pushIdentifier(this.scopeLevel + 1, name);
      }
    }

    // プロパティならなにもせず再帰しない
    if (node.type === "Property") {
      return;
    }

    // インポート指定子なら登録
    if (node.type === "ImportSpecifier") {
      delete node.imported;
      const name = node.local.name;
      this.pushIdentifier(this.scopeLevel, name);
    }

    // エクスポート指定子なら登録
    if (node.type === "ExportSpecifier") {
      delete node.imported;
      const name = node.local.name;
      this.pushIdentifier(this.scopeLevel, name);
    }

    // 必要ならスコープレベルを上げる
    if (Validation.typesForScopeLevel.includes(node.type)) {
      this.scopeLevel++;
    }

    // 再帰
    for (const key in node) {
      if (Array.isArray(node[key])) {
        for (const i in node[key]) {
          this.validate(node[key][i]);
        }
      } else if (node[key]?.constructor.name === "Node") {
        this.validate(node[key]);
      }
    }

    // 必要ならスコープレベルを下げる
    if (Validation.typesForScopeLevel.includes(node.type)) {
      while (this.identifiers.length > this.scopeLevel) {
        this.identifiers.pop();
      }
      this.scopeLevel--;
    }

    // 必要ならクラスから抜ける
    if (node.type === "ClassDeclaration") {
      this.inClass = false;
    }
  }

  // 識別子を追加
  pushIdentifier(scopeLevel, name) {
    this.identifiers[scopeLevel] ??= [];
    this.identifiers[scopeLevel].push(name);
  }

  // エラーを追加
  pushError(name, start) {
    ValidationManager.errors.push({ path: this.path, name, start });
  }
}
