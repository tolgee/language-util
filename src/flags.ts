import countryFlagEmoji from "country-flag-emoji";

export const getCountryFlagEmoji = (country: string): string | undefined => {
    return countryFlagEmoji.get(country)?.emoji
}

export const symbolToHex = function (str: string) {
    const parts = []
    for (let i = 0; i < str.length; i = i + 2) {
        parts.push(str.codePointAt(i)?.toString(16))
    }
    return parts.join("-")
};

