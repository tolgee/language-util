import {isStructurallyValidLanguageTag, parseUnicodeLanguageId} from "@formatjs/intl-getcanonicallocales";
import * as languageData from 'cldr-core/supplemental/languageData.json'
import * as territoryInfoData from 'cldr-core/supplemental/territoryInfo.json'
import {languageTerritoryOrder} from "./languageTerritoryOrder";


export const getLanguageRegions = (locale: string): string[] => {
    const parsed = parseUnicodeLanguageId(locale)
    if (parsed.region) {
        return [parsed.region]
    }

    if (parsed.lang) {
        const info = languageData.supplemental.languageData
        const langInfo = info[parsed.lang as keyof typeof info] as { _territories?: string[] };
        const territories = langInfo?._territories;
        if (!territories) {
            return []
        }
        return sortTerritoriesByLanguage(territories as any, parsed.lang) || []
    }

    return []
}

export const isValidLanguageTag = (tag: string) => {
    return isStructurallyValidLanguageTag(tag)
}

function getTerritoriesLanguagePopulations(territories: (keyof typeof info)[], language: string) {
    const info = territoryInfoData.supplemental.territoryInfo
    const territoriesLanguagePopulation = {} as { [key: string]: LanguagePopulation & TerritoryPopulation }
    territories.forEach((t) => {
        const territoryData = info[t] as TerritoryInfo | undefined
        const languagePopulation = territoryData?.languagePopulation?.[language]
        if (languagePopulation) {
            territoriesLanguagePopulation[t] = languagePopulation
            territoriesLanguagePopulation[t].territoryTotalPopulation = territoryData?._population
        }
    })
    return territoriesLanguagePopulation;
}

const sortTerritoriesByLanguage = (territories: (keyof typeof territoryInfoData.supplemental.territoryInfo)[], language: string): string[] => {
    const customOrder = (languageTerritoryOrder as any)[language] || [] as string[]
    territories = territories.filter(t => customOrder.indexOf(t) === -1)
    const territoriesLanguagePopulation = getTerritoriesLanguagePopulations(territories, language);

    territories.sort((a, b) => {
        const aOfficialStatus = territoriesLanguagePopulation[a]?._officialStatus
        const bOfficialStatus = territoriesLanguagePopulation[b]?._officialStatus
        if ((aOfficialStatus == "official" || aOfficialStatus == "de_facto_official") &&
            (bOfficialStatus != "official" && bOfficialStatus !== "de_facto_official")) {
            return -1
        }

        if ((bOfficialStatus == "official" || bOfficialStatus == "de_facto_official") &&
            (aOfficialStatus != "official" && aOfficialStatus !== "de_facto_official")) {
            return -1
        }

        if (aOfficialStatus == "official_regional" && bOfficialStatus != "official_regional") {
            return -1
        }

        if (bOfficialStatus == "official_regional" && aOfficialStatus != "official_regional") {
            return 1
        }

        const aPercent = territoriesLanguagePopulation[a]?._populationPercent
        const bPercent = territoriesLanguagePopulation[b]?._populationPercent
        const aTotalPopulation = territoriesLanguagePopulation[a]?.territoryTotalPopulation
        const bTotalPopulation = territoriesLanguagePopulation[b]?.territoryTotalPopulation

        if (aPercent === bPercent) {
            return 0
        }

        if (aPercent && !bPercent) {
            return -1
        }

        if (bPercent && !aPercent) {
            return 1
        }

        if (!aTotalPopulation || !bTotalPopulation) {
            return 0
        }

        return parseFloat(bPercent as string) * parseInt(bTotalPopulation) - parseFloat(aPercent as string) * parseInt(aTotalPopulation)
    })

    return [...customOrder, ...territories]
}

interface TerritoryInfo {
    languagePopulation?: {
        [key: string]: LanguagePopulation
    },
    _population?: string
}

interface LanguagePopulation {
    "_populationPercent"?: string,
    "_officialStatus"?: "official" | "official_regional" | "de_facto_official",
}

interface TerritoryPopulation {
    territoryTotalPopulation?: string
}
