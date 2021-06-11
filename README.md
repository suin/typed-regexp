# @suin/typed-regexp

A TypeScript utility to write type-safe regular expressions using named capture groups.

## Installation

```bash
yarn add @suin/typed-regexp
# or
npm install @suin/typed-regexp
```

## Usage

```ts
import typedRegExp from "@suin/typed-regexp";

const urlPattern = typedRegExp(
  "^(?:(?<protocol>https?:)(?:\\/\\/\\/?)(?:(?<auth>(?<user>[\\w]*)(?::(?<pass>[\\w]*))?)@)?(?<hostname>[\\d\\w\\.-]+)(?::(?<port>\\d+))?)?(?<pathname>[\\/\\\\\\w\\.()-]*)?(?:(?<search>[?](?<query>[^#]*))?(?<hash>#.*)?)*$",
  "i"
);
const matches = urlPattern.exec(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);
if (matches) {
  const { user, pass, hostname, port } = matches.groups;
  console.log({ user, pass, hostname, port });
  //=> {
  //  "hostname": "sub.example.com",
  //  "pass": "pass",
  //  "port": "8080",
  //  "user": "user",
  // }
}
```

## API Reference

https://suin.github.io/typed-regexp/
