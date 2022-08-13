"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryBuilder(baseUrl, filters) {
    if (!filters || Object.keys(filters).length < 1) {
        return baseUrl;
    }
    var newUrl = baseUrl;
    Object.keys(filters).forEach(function (filter) {
        newUrl = "".concat(newUrl, "&").concat(filter, "=").concat(filters[filter]);
    });
    newUrl = newUrl.replace(/&/, "?");
    return newUrl;
}
exports.default = queryBuilder;
//# sourceMappingURL=queryBuilder.js.map