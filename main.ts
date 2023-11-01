datalogger.onLogFull(function () {
    logning = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    logning = true
    basic.showIcon(IconNames.Yes)
})
function LED_test (talværdi: number) {
    for (let index = 0; index < talværdi; index++) {
        zipLEDs.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Red))
        zipLEDs.show()
        basic.pause(100)
        zipLEDs.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Green))
        zipLEDs.show()
        basic.pause(100)
        zipLEDs.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Blue))
        zipLEDs.show()
        basic.pause(100)
        zipLEDs.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Black))
        zipLEDs.show()
        basic.pause(100)
    }
}
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "Temp.",
    "Tryk",
    "Luftfugt."
    )
})
input.onButtonPressed(Button.B, function () {
    logning = false
    basic.showIcon(IconNames.No)
})
let zipLEDs: kitronik_smart_greenhouse.greenhouseZIPLEDs = null
let logning = false
logning = false
zipLEDs = kitronik_smart_greenhouse.createGreenhouseZIPDisplay(5)
let Tid = 1
zipLEDs.setBrightness(255)
LED_test(1)
basic.showIcon(IconNames.No)
kitronik_smart_greenhouse.setTime(0, 0, 0)
datalogger.setColumnTitles(
"Temp.",
"Tryk",
"Luftfugt."
)
let Tidms = Tid * 60000
loops.everyInterval(Tidms, function () {
    if (logning == true) {
        zipLEDs.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.Blue))
        basic.showIcon(IconNames.Chessboard)
        datalogger.log(
        datalogger.createCV("Tryk", kitronik_smart_greenhouse.pressure(PressureUnitList.Pa)),
        datalogger.createCV("Luftfugt.", kitronik_smart_greenhouse.humidity()),
        datalogger.createCV("Temp.", kitronik_smart_greenhouse.temperature(TemperatureUnitList.C))
        )
        basic.clearScreen()
        zipLEDs.showColor(kitronik_smart_greenhouse.colors(ZipLedColors.White))
        basic.showIcon(IconNames.Yes)
    }
})
