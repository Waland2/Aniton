import hmac
import hashlib

from aniton.config import *

def hmac_hash256(a, b):
    return hmac.new(b, a, digestmod=hashlib.sha256)

def is_valid(params):
    referral_code = params['referralCode']
    referral_id = params['referralId']
    hash = params['hash']

    data_string = f"{referral_code}_{referral_id}"
    secret_key = hmac_hash256(TELEGRAM_BOT_TOKEN.encode(), "AnitonData".encode())
    calculated_hash = hmac_hash256(data_string.encode(), secret_key.digest()).hexdigest()
    
    return calculated_hash == hash
