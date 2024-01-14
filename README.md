# My Language Practices

Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax,
to expression ideas clearly.

**lang0** -- An implementation of [(Untyped) Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus).
- Implement call-by-need lazy evaluation.
- Allow recursive in top-level definitions.
  - No mutual recursion, a name must be defined before used.
- A simple module system with only one API -- `(import)`.
  - It can import module from local file or remote URL.
- Two simple testing statements `(assert-equal)` and `(assert-not-equal)`.
  - They can handle beta and eta equivalence.
- Note that, when implementing lambda calculus as an interpreter,
  the depth of the call stack is limited by the hosting language.
  To avoid this limitation we should implement lambda calculus by machine like SECD.

**lang1** -- De Bruijn notation with explicit substitution.
- With explicit name as comment.

## Usages

### Command line tool

Install it by the following command:

```sh
npm install -g @cicada-lang/lang-practices
```

The command-line program is called `lang`.

## Development

```sh
npm install     # Install dependencies
npm run build   # Compile `src/` to `lib/`
npm run test    # Run test
```

## Community

GitHub:

- Organization: [github.com/cicada-lang](https://github.com/cicada-lang)

Telegram:

- English chat group: [CicadaLanguage](https://t.me/CicadaLanguage)
- Chinese chat group: [CicadaLanguageCN](https://t.me/CicadaLanguageCN)

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
