//constants
const M1Stations = 15
const M2Stations = 15

const M1LineSelector = [["Renens", "renens"], ["Epenex", "epenex"],  ["crochy"], ["cerisaie"], ["bassenges", "bassenge"], ["epfl"],
    ["unil-sorge", "sorge"], ["unil-mouline", "mouline"], ["unil-chamberonne", "chamberonne"],
    ["bourdonnette", "bourdonette", "bourdo"], ["malley"], ["provence"], ["montelly"], ["vigie"], ["lausanne-flon", "flon"]]


const M2LineSelector = []

const destinationPrefixSelector = ["direction", "diréction", "dir", "vers", "pour", "->"]

const departurePrefixSelector = ["à", "au", "a", "at", "on part de", "débarque"]

const stationarySelector = ["attendent", "attends", "attend", "chill", ] //stationary controllers

const controllerCountSelector = ["1", "2", "3", "4", "5"]

const controllerCountSuffixSelector = [ "controleurs", "contrôleurs", "keufs", "qui"]
//const controllerSelector = ["controle", "controleur", "controleurs", "contrôle", "contrôleur", "contrôleurs", "keuf", "keufs"]

const wordType = {
    NONE : 0,
    M1STATION : 1,
    M2STATION : 2,
    DESTINATION_PREFIX : 3,
    DEPARTURE_PREFIX : 4,
    STATIONARY : 5,
    CONTROLLER_COUNT : 6,
    CONTROLLER_COUNT_SUFFIX : 7
}

//helper functions
const toWords = (text) => {
    return text.split(" ")
}

const isWordIncluded = (word, selector) => {
    return selector.flat().includes(word.toLowerCase())
}

const getMetroLine = (word) => {
    if(isWordIncluded(word, M1LineSelector)) return 1
    else if(isWordIncluded(word, M2LineSelector)) return 2
    else return 0
}

const findStationNumber = (word, stationSelector) => { //give M1/2LineSelector and will return index of station
    stationSelector.findIndex(arr => isWordIncluded(word, arr));
}

const classifyWord = (word) => {
    if(isWordIncluded(word, M1LineSelector)) return wordType.M1STATION
    else if(isWordIncluded(word, M2LineSelector)) return wordType.M2STATION
    else if(isWordIncluded(word, destinationPrefixSelector)) return wordType.DESTINATION_PREFIX
    else if(isWordIncluded(word, departurePrefixSelector)) return wordType.DEPARTURE_PREFIX
    else if(isWordIncluded(word, stationarySelector)) return wordType.STATIONARY
    else if(isWordIncluded(word, controllerCountSelector)) return wordType.CONTROLLER_COUNT
    else if(isWordIncluded(word, controllerCountSuffixSelector)) return wordType.CONTROLLER_COUNT_SUFFIX
    else return wordType.NONE
}

//TODO: check if at least one of destination or departure stations are found, if not:
// 1.in switch delete station if found
// 2.search for stations on same line in text -> will be the other (destination or departure station)
const scrapeMessage = (text) => {
    const NONE_STATION = ""
    let destinationStation= NONE_STATION, departureStation=NONE_STATION;
    let metroLine = 0; //1 or 2

    const words = toWords(text)
    words.forEach((word, i) => {
        console.log(classifyWord(word))

        switch (classifyWord(word)) {
            case wordType.DESTINATION_PREFIX:
                if(i!==words.length-1){
                    destinationStation = words[i + 1]
                    metroLine = getMetroLine(destinationStation)
                    if(metroLine===0)destinationStation = NONE_STATION
                }
                break

            case wordType.DEPARTURE_PREFIX:
                if(i!==words.length-1){
                    departureStation = words[i + 1]
                    metroLine = getMetroLine(departureStation)
                    if(metroLine===0)departureStation = NONE_STATION
                }
                break

            default:
                break
        }
    })

    return [departureStation, destinationStation]
}

module.exports = {
    scrapeMessage
}