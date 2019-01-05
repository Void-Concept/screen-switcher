const { getMousePos, keyToggle } = require('robotjs');

const screens = require("./screens.json");

let currentScreen = 0;

function withinRange(position, coordinates) {
    return coordinates[0] <= position && position <= coordinates[1];
}

function switchScreen(screen) {
    const keyButton = screen + 1;

    keyToggle("control", 'down');
    keyToggle('alt', 'down');
    keyToggle(keyButton.toString(), 'down');

    setTimeout(() => {
        keyToggle("control", 'up');
        keyToggle('alt', 'up');
        keyToggle(keyButton.toString(), 'up');
    });
}

setInterval(() => {
    const mousePosition = getMousePos();
    let screen = currentScreen;

    screens.forEach(({ coordinates }, index) => {
        if (withinRange(mousePosition.x, coordinates.x) && withinRange(mousePosition.y, coordinates.y)) {
            screen = index;
        }
    });

    if (screen !== currentScreen) {
        console.log(`Switching from screen ${currentScreen} to ${screen}`);

        currentScreen = screen;
        switchScreen(currentScreen);
    }
}, 10)
