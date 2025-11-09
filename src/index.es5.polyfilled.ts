import "core-js/stable";
import "regenerator-runtime/runtime";

export * from "./index";

/*
Instead of core-js/stable, import only what you need, e.g.:

import 'core-js/es/array/from';
import 'core-js/es/object/assign';

Each adds only a few kilobytes.

You can check what features you’re using via:

npx browserslist
npx core-js-compat
*/