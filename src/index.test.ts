import {getLanguageInfo, getLanguageRegionsData} from "./index";

describe("languageData", () => {
    test('returns territory by language', () => {
        const territories = getLanguageRegionsData("cs")
        expect(territories).toEqual(["CZ"])
    });

    test('returns territory from parsed region', () => {
        const territories = getLanguageRegionsData("en-US")
        expect(territories).toEqual(["US"])
    });

    test('returns correct territories for english', () => {
        const territories = getLanguageRegionsData("en")
        expect(territories.length).toEqual(89)
        expect(territories[0]).toEqual("GB")
        expect(territories[1]).toEqual("US")
    });

    test('returns territories for spanish', () => {
        const territories = getLanguageRegionsData("es")
        expect(territories.length).toEqual(23)
        expect(territories[0]).toEqual("ES")
    });

    test('returns territories for french', () => {
        const territories = getLanguageRegionsData("fr")
        expect(territories.length).toEqual(45)
        expect(territories[0]).toEqual("FR")
    });

    test('returns correct language info for czech', () => {
        console.log(getLanguageInfo("cs"))
    })
})
