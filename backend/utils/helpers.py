import time

def get_current_timestamp():
    return int(time.time() * 1000)

def calculate_accuracy(target, typed):
    correct = sum(1 for a, b in zip(target, typed) if a == b)
    return (correct / len(target)) * 100 if target else 0