import typedRegExp, { TypedRegExp } from "./index";

test("example", () => {
  const urlPattern = typedRegExp(
    "^(?:(?<protocol>https?:)(?:\\/\\/\\/?)(?:(?<auth>(?<user>[\\w]*)(?::(?<pass>[\\w]*))?)@)?(?<hostname>[\\d\\w\\.-]+)(?::(?<port>\\d+))?)?(?<pathname>[\\/\\\\\\w\\.()-]*)?(?:(?<search>[?](?<query>[^#]*))?(?<hash>#.*)?)*$",
    "i"
  );
  const matches = urlPattern.exec(
    "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
  );
  if (matches) {
    const { user, pass, hostname, port } = matches.groups;
    expect({ user, pass, hostname, port }).toMatchInlineSnapshot(`
Object {
  "hostname": "sub.example.com",
  "pass": "pass",
  "port": "8080",
  "user": "user",
}
`);
  } else {
    fail("This should not be seen");
  }
});

function equals<A, B>(_expect: Equals<A, B>): void {}

type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type Names<T extends TypedRegExp<any>> = T extends TypedRegExp<infer U>
  ? keyof U
  : never;

{
  const regexp = typedRegExp("");
  equals<Names<typeof regexp>, never>(true);
}
{
  const regexp = typedRegExp("(?<name>.)");
  equals<Names<typeof regexp>, "name">(true);
  equals<Names<typeof regexp>, "name" | "other">(false);
  equals<Names<typeof regexp>, "unknown">(false);
}
{
  const regexp = typedRegExp("(?<outside>.(?<inside>.))");
  equals<Names<typeof regexp>, "outside" | "inside">(true);
}
{
  const regexp = typedRegExp("(?<first>.)(?<second>.)");
  equals<Names<typeof regexp>, "first" | "second">(true);
}
