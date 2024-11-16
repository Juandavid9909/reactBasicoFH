# Snippet para Slices de Redux

```json
{
	// Place your snippets for javascript here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }

	"Crear un slice de Redux": {
		"prefix": "redux-slice",
		"body": [
			"import { createSlice } from '@reduxjs/toolkit';",
			"",
			"export const ${1:template}Slice = createSlice({",
			"   name: 'name',",
			"   initialState: {",
			"       counter: 10",
			"   },",
			"   reducers: {",
			"       increment: (state, /* action */ ) => {",
			"           state.counter += 1;",
			"       },",
			"   }",
			"});",
			"",
			"export const { increment } = ${1:template}Slice.actions;"
		],
		"description": "Crear un slice de Redux"
	}
}
```