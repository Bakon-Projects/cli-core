/// <reference types="node" />
import * as args from "./args";
import * as flags from "./flags";
import { Input, ParserOutput } from "../interfaces";
export { args };
export { flags };
export { flagUsages } from "./help";
export declare function parse<
	TFlags,
	TArgs extends {
		[name: string]: string;
	}
>(argv: string[], options: Input<TFlags>): Promise<ParserOutput<TFlags, TArgs>>;
declare const boolean: typeof flags.boolean,
	integer: import("@xibakon/cli-core/src/interfaces/parser").Definition<number>,
	url: import("@xibakon/cli-core/src/interfaces/parser").Definition<
		import("url").URL
	>;
export { boolean, integer, url };
