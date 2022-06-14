export const addHours = (time, hours) => {
    return new Date(new Date(time).getTime() - hours * 60 * 60 * 1000).toISOString();
}

import { addDays, format, isWeekend } from "date-fns";
import { number_format } from "locutus/php/strings";

export const getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});




export const due_date = (days = 3, date = false) => {
    if (!date) date = new Date();
    date = addDays(date, days);

    if (isWeekend(new Date(date))) date = due_date(1, date);

    return format(new Date(date), "yyyy-MM-dd");
}

export const extractInt = (string) => {
    return string.toString().replace(/[^0-9]+/g, '');
}

export const mask = function (m, str) {
    var m,
        l = (m = m.split("")).length,
        s = str.split(""),
        j = 0,
        h = "";

    for (var i = -1; ++i < l;)
        if (m[i] != "#") {
            if (m[i] == "\\" && (h += m[++i])) continue;
            h += m[i];
            i + 1 == l && (s[j - 1] += h, h = "");
        }
        else {
            if (!s[j] && !(h = "")) break;
            (s[j] = h + s[j++]) && (h = "");
        }
    return s.join("") + h;
};

export const reverse = (s) => {
    return s.split("").reverse().join("");
}

export const priceMask = (value, decimals = 2) => {
    if (!value) return '';

    value = extractInt(value);
    value = value.padStart(decimals + 1, '0');
    value = value.replace(/^0+/, '');

    value = reverse(mask("##,###.###.###.###", reverse(value)));

    return value;
};


export const floatMask = (value, decimals = 2) => {
    value = value.replace(/[^0-9]/g, "");
    value = value.padStart(decimals + 1, "0");

    value = value.split("").reverse().join("");
    let floated = value.substring(0, decimals);
    let reals = value.substring(decimals);
    value = `${floated}.${reals}`.split("").reverse().join("");

    value = parseFloat(value).toFixed(decimals);

    return value;
}
export const nameCapitalize = (string) => {
    if (!string) return null;
    const joint = ["de", "da", "do", "das", "dos",];
    var formated_name = "";

    const name = string.split(" ");
    const name_parts = [];
    for (let part of name) name_parts.push((joint.includes(part)) ? part : (part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()))
    formated_name = name_parts.join(" ");
    return formated_name;
}

export const nameFormat = (string, joint) => {
    if (!string) return null;
    joint = ["de", "da", "do", "das", "dos"];
    var formated_name = "";
    const name = string.split(" ");
    const name_parts = [];
    name_parts.push(name[0]);
    if (name.length > 1) {
        name.reverse();
        if (joint.includes(name[1].toLowerCase())) name_parts.push(name[1]);
        name_parts.push(name[0]);
    }
    if (name_parts.length > 1) if (name_parts[0] == name_parts[name_parts.length - 1]) name_parts.pop();
    formated_name = name_parts.join(" ");
    return formated_name.trim();
}

export const normalizeString = (string) => string.toString().normalize('NFD').replace(/[^a-zA-Z0-9 ]+/g, '').replace(/\s+/g, ' ');
export const slugify = (string, separator = "-") => string.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]separator/g, '').replace(/\s+/g, separator);

export const base64Encode = (string) => new Buffer.from(string).toString("base64");
export const base64Decode = (string) => new Buffer.from(string, "base64").toString("ascii");


export const validateCnpj = (value) => {
    if (!value) return false
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
    if (!validTypes) return false
    if (isString) {
        if (value.length > 18) return false
        const digitsOnly = /^\d{14}$/.test(value)
        const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
        if (digitsOnly || validFormat) true
        else return false
    }
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []
    if (numbers.length !== 14) return false
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
    const calc = (x) => {
        const slice = numbers.slice(0, x)
        let factor = x - 7
        let sum = 0

        for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
        }

        const result = 11 - (sum % 11)

        return result > 9 ? 0 : result
    }

    const digits = numbers.slice(12)
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false

    const digit1 = calc(13)
    return digit1 === digits[1]
}

export const validateCpf = (strCPF) => {
    if (new Set(strCPF).size == 1) return false

    let cpf = Array.from(strCPF).map(Number);

    return [9, 10].every(pos => {
        let multiplier = pos + 1

        let vd = cpf.slice(0, pos).reduce((total, amount, index) => total + amount * (multiplier - index), 0);
        vd = (vd * 10) % 11;
        vd = (vd > 9) ? 0 : vd

        if (vd == cpf[pos]) return true
    })
}

export const validateDocument = (document) => {
    document = extractInt(document);
    if (!document) return false;

    if (document.toString().length == 11) {
        return validateCpf(document);
    } else if (document.toString().length == 14) {
        return validateCnpj(document);
    } else {
        return false;
    }
}

export const search = (list, keyword, options) => {
    const results = [];
    if (options === undefined) options = {};

    if (typeof list === "object") {
        Object.keys(list).map(item_index => {
            const item = list[item_index];
            if (typeof item === "object") {
                var keys = Object.keys(item);

                if ("fields" in options)
                    keys = options["fields"];

                let found = false;

                keys.map(key => {
                    if (item[key] !== null) {
                        var field = item[key].toString();

                        if ("ignoreCase" in options) {
                            if (field.search(keyword) === 0) found = true;
                        } else {
                            if (field.toLowerCase().search(keyword.toString().toLowerCase()) === 0) found = true;
                        }
                    }
                });

                if (found) results.push(item);
            } else {
                if (item.toString().search(keyword) !== -1) results.push(item);
            }
        });
    } else {
        list.map(item => {
            if (typeof item === "object") {
                var keys = Object.keys(item);

                if ("fields" in options)
                    keys = options["fields"];

                let found = false;

                keys.map(key => {
                    if (item[key] !== null) {
                        var field = item[key].toString();

                        if ("ignoreCase" in options) {
                            if (field.search(keyword) !== -1) found = true;
                        } else {
                            if (field.toLowerCase().search(keyword.toString().toLowerCase()) !== -1) found = true;
                        }
                    }
                });

                if (found) results.push(item);
            } else {
                if (item.toString().search(keyword) !== -1) results.push(item);
            }
        });
    }

    return results;
};