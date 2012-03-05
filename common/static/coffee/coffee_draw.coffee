$(document).ready ->
    battle = new Battle({
        'squareHeight': 30,
        'gameHolder': $('#gameHolder'),
    })
    battle.init()

