
TELEGRAM_BOT_TOKEN = '7436211293:AAHTikMLW_Ci2gEuCX3B_YRWV1DgAgegMoU'

DAILY_REWARDS = {
    1: [200_000, 200],
    2: [500_000, 1000],
    3: [1_000_000, 2500],
    4: [5_000_000, 3500],
    5: [10_000_000, 5000]
}

REVIEWS_PER_ANIME = 4

INFLUENCE_DIVISION_RATIO = 125

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
    1: [2, 6],
    2: [6, 10],
    3: [10, 20],
    4: [10, 20],
    5: [20, 26],
    6: [25, 30],
    7: [30, 40],
    8: [40, 50],
    9: [50, 140],
    10: [200, 300]
}

TIMEOUT_AFTER_CREATING = 30 # minutes