import {getLanguageInfo, getLanguageInfoForAvailableLanguages} from "./languageInfo";

describe("languageInfo", () => {
    test('returns correct language info for en', () => {
        const result = getLanguageInfo("en")
        expect(result?.englishName).toEqual("English")
        expect(result?.originalName).toEqual("English");
        ["GB", "US", "IN"].forEach((region: string) => {
            expect(result?.regions).toContain(region)
        });
        ["🇬🇧", "🇺🇸", "🇮🇳"].forEach((region: string) => {
            expect(result?.flags).toContain(region)
        })
    });

    test('returns correct language info for en_US', () => {
        const result = getLanguageInfo("en-US")
        expect(result?.englishName).toEqual("English (United States)")
        expect(result?.originalName).toEqual("English (United States)");
        expect(result?.regions).toEqual(["US"])
        expect(result?.flags).toEqual(["🇺🇸"])
    });

    test('returns correct language info for cs', () => {
        const result = getLanguageInfo("cs")
        expect(result?.englishName).toEqual("Czech")
        expect(result?.originalName).toEqual("čeština");
        expect(result?.regions).toEqual(["CZ"])
        expect(result?.flags).toEqual(["🇨🇿"])
    });

    test('returns correct languages for everything', () => {
        const result = getLanguageInfoForAvailableLanguages()
        console.log(result)
        expect(Object.keys(result).length).toBeGreaterThan(300)
        expect(result["en"]).toBeTruthy()
        expect(result["cs"]).toBeTruthy()
        expect(result["de"]).toBeTruthy()
        expect(result["sk"]).toBeTruthy()
        Object.values(result).forEach(i => {
            expect(it).toBeTruthy()
        })
    })
})
