from utils.helpers import calculate_accuracy

def extract_features(data):
    keystrokes = data.get("keystrokes", [])
    mouse_data = data.get("mouseData", [])
    words = data.get("words", 0)
    time_taken = data.get("timeTaken", 1)
    target_text = data.get("targetText", "")
    typed_text = data.get("typedText", "")
    wpm = words / (time_taken / 60) if time_taken > 0 else 0
    hold_times = [
        k.get("holdTime", 0)
        for k in keystrokes
        if k.get("type") == "up"
    ]
    avg_hold = sum(hold_times) / len(hold_times) if hold_times else 0
    intervals = [
        k.get("delayFromLastKey", 0)
        for k in keystrokes
        if k.get("type") == "down"
    ]
    avg_interval = sum(intervals) / len(intervals) if intervals else 0
    mouse_activity = len(mouse_data)

    accuracy = calculate_accuracy(target_text, typed_text)
    return {
        "wpm": wpm,
        "avgHoldTime": avg_hold,
        "avgInterval": avg_interval,
        "mouseActivity": mouse_activity,
        "accuracy": accuracy
    }