import 'brace/mode/java';

export class CustomHighlightRules extends window.ace.acequire("ace/mode/text_highlight_rules").TextHighlightRules {
	constructor() {
		super();
		this.$rules = {
			"start": [{
				token: "comment",
				regex: "\\*(.*)"
			}, {
				token: "string",
				regex: `".*?"|'.*?'`
			}, {
				token: "keyword.operator",
				regex: '/^\\+|\\-|\\*|\\/|\\=|>|<|>\\=|<=|%|&|\\=\\=|<>|\\(|\\)|AND|OR|NOT{1,2}/gi'
			}, {
				token: "variable.language",
				regex: '[_a-z][\\w$]*(\\.[\\w$]+)?(\\[\\d+])?'
			}]
		};
	}
}

export default class CustomMode extends window.ace.acequire('ace/mode/java').Mode {
	constructor() {
		super();
		this.HighlightRules = CustomHighlightRules;
	}
}