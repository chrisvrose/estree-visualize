# estree-visualize

View a ECMAScript module AST, and generate code from it.

Hovering over a AST Node in graphical mode selects the corresponding /source in the editor.

### Progress 

- [X] View AST text
- [X] View Errors
- [X] Graph viewing
- [X] Highlight code from AST (Graphical) 
- [ ] ~~Highlight code from AST (Text)~~ Not needed
- [X] Generate JS Code from ESTree spec trees

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> This app uses the `static` adapter, and is deployed using Github Pages at [https://viz.kekvrose.me](https://viz.kekvrose.me)