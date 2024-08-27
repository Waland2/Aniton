import hmac
import hashlib
import uuid

from aniton.config import *

def hmac_hash256(a, b):
    return hmac.new(b, a, digestmod=hashlib.sha256)

def is_valid(query_params: dict):
    hash = query_params['hash']

    tg_init_data = sorted([f"{key}={query_params[key]}" for key in query_params.keys() if key != 'hash'])
    data_string = "\n".join(tg_init_data)

    secret_key = hmac_hash256(TELEGRAM_BOT_TOKEN.encode(), "WebAppData".encode())
    calculated_hash = hmac_hash256(data_string.encode(), secret_key.digest()).hexdigest()
    return hash == calculated_hash

def get_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def convert_num(num, base):
    alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"
    converted_num = ""
    while num != 0:
        converted_num = alphabet[num % base] + converted_num
        num //= base
    return converted_num

def generate_ref_code(id):
    return convert_num(id, 36)
