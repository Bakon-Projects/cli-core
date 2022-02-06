"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIError = exports.addOclifExitCode = void 0;
const chalk_1 = require("chalk");
const indent_string_1 = require("indent-string");
const clean_stack_1 = require("clean-stack");
const wrap_ansi_1 = require("wrap-ansi");
const screen = require("../../screen");
const config_1 = require("../config");
/**
 * properties specific to internal oclif error handling
 */
function addOclifExitCode(error, options) {
    if (!("oclif" in error)) {
        error.oclif = {};
    }
    error.oclif.exit = (options === null || options === void 0 ? void 0 : options.exit) === undefined ? 2 : options.exit;
    return error;
}
exports.addOclifExitCode = addOclifExitCode;
class CLIError extends Error {
    constructor(error, options = {}) {
        super(error instanceof Error ? error.message : error);
        this.oclif = {};
        addOclifExitCode(this, options);
        this.code = options.code;
    }
    get stack() {
        return (0, clean_stack_1.default)(super.stack, { pretty: true });
    }
    /**
     * @deprecated `render` Errors display should be handled by display function, like pretty-print
     * @return {string} returns a string representing the dispay of the error
     */
    render() {
        if (config_1.config.debug) {
            return this.stack;
        }
        let output = `${this.name}: ${this.message}`;
        output = (0, wrap_ansi_1.default)(output, screen.errtermwidth - 6, {
            trim: false,
            hard: true,
        });
        output = (0, indent_string_1.default)(output, 3);
        output = (0, indent_string_1.default)(output, 1, {
            indent: this.bang,
            includeEmptyLines: true,
        });
        output = (0, indent_string_1.default)(output, 1);
        return output;
    }
    get bang() {
        try {
            return chalk_1.default.red(process.platform === "win32" ? "»" : "›");
        }
        catch { }
    }
}
exports.CLIError = CLIError;
(function (CLIError) {
    class Warn extends CLIError {
        constructor(err) {
            super(err instanceof Error ? err.message : err);
            this.name = "Warning";
        }
        get bang() {
            try {
                return chalk_1.default.yellow(process.platform === "win32" ? "»" : "›");
            }
            catch { }
        }
    }
    CLIError.Warn = Warn;
})(CLIError = exports.CLIError || (exports.CLIError = {}));
