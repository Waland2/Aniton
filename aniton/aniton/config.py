
TELEGRAM_BOT_TOKEN = '7436211293:AAHTikMLW_Ci2gEuCX3B_YRWV1DgAgegMoU'

DAILY_REWARDS = {1: [1, 2], 2: [2, 3], 3: [3, 4], 4: [4, 5], 5: [6, 6]}

REVIEWS_PER_ANIME = 2

INFLUENCE_DIVISION_RATIO = 15

RATING_PROBABILITY = { # format: rating: probality
    1: 2, 
    2: 100,
    3: 150,
    4: 200,
    5: 400,
    6: 800,
    7: 1200, 
    8: 650,
    9: 100,
    10: 1
} 

RATING_MULTIPLIES_ON_PROFIT = { # format: rating: [min_mul, max_mul]
    1: [3, 5],
    2: [3, 5],
    3: [5, 10],
    4: [5, 10],
    5: [10, 13],
    6: [11, 15],
    7: [15, 20],
    8: [20, 25],
    9: [25, 50],
    10: [50, 150]
}

TIMEOUT_AFTER_CREATING = 60 # minutes