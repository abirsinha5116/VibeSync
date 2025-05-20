import cv2
import mediapipe as mp
import math
import time
from pynput.keyboard import Key, Controller
import socketio
import signal
import sys

sio = socketio.Client()                # unchanged

#––– Graceful shutdown handler –––
def _cleanup_and_exit(signum, frame):
    print("⚠️  Received signal, disconnecting…")
    sio.disconnect()
    sys.exit(0)

# Catch Ctrl+C and terminate() from your Flask toggle
signal.signal(signal.SIGINT, _cleanup_and_exit)
signal.signal(signal.SIGTERM, _cleanup_and_exit)

# Now connect (after signal handlers)
sio.connect('http://localhost:5000')

keyboard = Controller()

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.6, min_tracking_confidence=0.6)

def to_3d_point(landmark, w, h):
    return (landmark.x * w, landmark.y * h, landmark.z * w)

def angle_3points(a, b, c):
    ba = (a[0] - b[0], a[1] - b[1], a[2] - b[2])
    bc = (c[0] - b[0], c[1] - b[1], c[2] - b[2])
    dot = ba[0]*bc[0] + ba[1]*bc[1] + ba[2]*bc[2]
    mag_ba = max(math.sqrt(sum(v*v for v in ba)), 1e-5)
    mag_bc = max(math.sqrt(sum(v*v for v in bc)), 1e-5)
    cos_angle = dot / (mag_ba * mag_bc)
    cos_angle = max(min(cos_angle, 1.0), -1.0)
    return math.degrees(math.acos(cos_angle))

def finger_state(angle):
    return "extended" if angle >= 160 else "folded" if angle <= 120 else "neutral"

def get_index_direction(pts, hand_label):
    tip_x = pts[8][0]
    base_x = pts[5][0]
    dx = tip_x - base_x

    #print(f"Index dx: {dx:.2f} | Hand: {hand_label} | Tip: {tip_x:.2f}, Base: {base_x:.2f}")

    threshold = 10  # pixel threshold on 640px width
    if dx > threshold:
        return "right"
    elif dx < -threshold:
        return "left"
    return "neutral"

def get_thumb_direction(pts):
    tip_y = pts[4][1]
    wrist_y = pts[0][1]
    if tip_y < wrist_y - 10:
        return "up"
    elif tip_y > wrist_y + 10:
        return "down"
    return "neutral"

def detect_fingers(lm, w, h, hand_label):
    pts = [to_3d_point(lm.landmark[i], w, h) for i in range(21)]
    thumb_angle = angle_3points(pts[1], pts[2], pts[3])
    index_angle = angle_3points(pts[0], pts[5], pts[8])
    middle_angle = angle_3points(pts[0], pts[9], pts[12])
    ring_angle = angle_3points(pts[0], pts[13], pts[16])
    pinky_angle = angle_3points(pts[0], pts[17], pts[20])
    index_dir = get_index_direction(pts, hand_label)
    thumb_dir = get_thumb_direction(pts)
    states = {
        "thumb": finger_state(thumb_angle),
        "index": finger_state(index_angle),
        "middle": finger_state(middle_angle),
        "ring": finger_state(ring_angle),
        "pinky": finger_state(pinky_angle)
    }
    # print("Finger States →", states, "| Index Dir:", index_dir, "| Thumb Dir:", thumb_dir)
    return states, index_dir, thumb_dir, hand_label

def detect_gesture(fingers, index_dir, thumb_dir, hand_label, landmarks=None):
    if all(f == "extended" for f in fingers.values()):
        return "PLAY"
    if fingers["thumb"] == "extended" and thumb_dir in ["up", "down"] and all(fingers[f] == "folded" for f in ["index", "middle", "ring", "pinky"]):
        return "VOLUME_UP" if thumb_dir == "up" else "VOLUME_DOWN"

    if all(fingers[f] == "folded" for f in ["index", "middle", "ring", "pinky"]) and fingers["thumb"] == "folded":
        return "PAUSE"
    if fingers["thumb"] == "extended" and thumb_dir == "up" and all(fingers[f] == "folded" for f in ["index", "middle", "ring", "pinky"]):
        return "VOLUME_UP"
    if fingers["thumb"] == "extended" and thumb_dir == "down" and all(fingers[f] == "folded" for f in ["index", "middle", "ring", "pinky"]):
        return "VOLUME_DOWN"
    if fingers["index"] == "extended":
        # Hard spatial check for index-only gesture
        index_tip = landmarks[8]
        wrist = landmarks[0]
        def tip_close_to_wrist(tip_id):
            tip = landmarks[tip_id]
            dist = math.sqrt((tip.x - wrist.x)**2 + (tip.y - wrist.y)**2)
            #print(f"Distance of tip {tip_id} to wrist: {dist:.3f}")
            return dist < 0.2  # relaxed threshold for backfaced hands

        # if all(tip_close_to_wrist(i) for i in [4, 12, 16, 20]):
        #     #print(" Spatial index-only detected")
        # else:
        #     print(" Spatial check failed for index-only gesture")
        #     return None

        #print("Checking for track gesture: index_dir =", index_dir, "| Hand =", hand_label)
        if (hand_label == "Right" and index_dir == "left") or (hand_label == "Left" and index_dir == "left"):
            return "PREVIOUS_TRACK"
        elif (hand_label == "Right" and index_dir == "right") or (hand_label == "Left" and index_dir == "right"):
            return "NEXT_TRACK"
    return None

def map_action(gesture):
    print(f"Detected Gesture: {gesture}")
    sio.emit('gesture', {'gesture': gesture})

    # if gesture == "PLAY":
    #     print(" Action: Playing")
    #     keyboard.press(Key.media_play_pause)
    #     keyboard.release(Key.media_play_pause)
    # elif gesture == "PAUSE":
    #     print(" Action: Pausing")
    #     keyboard.press(Key.media_play_pause)
    #     keyboard.release(Key.media_play_pause)
    # elif gesture == "NEXT_TRACK":
    #     print(" Action: Next Track")
    #     keyboard.press(Key.ctrl)
    #     keyboard.press(Key.right)
    #     keyboard.release(Key.right)
    #     keyboard.release(Key.ctrl)
    # elif gesture == "PREVIOUS_TRACK":
    #     print(" Action: Previous Track")
    #     keyboard.press(Key.ctrl)
    #     keyboard.press(Key.left)
    #     keyboard.release(Key.left)
    #     keyboard.release(Key.ctrl)
    # elif gesture == "VOLUME_UP":
    #     print(" Action: Volume Up")
    #     keyboard.press(Key.media_volume_up)
    #     keyboard.release(Key.media_volume_up)
    # elif gesture == "VOLUME_DOWN":
    #     print(" Action: Volume Down")
    #     keyboard.press(Key.media_volume_down)
    #     keyboard.release(Key.media_volume_down)

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

last_gesture = None
last_trigger_times = {}
gesture_hold_start = {}
last_gesture_time = 0
cooldowns = {
    "PLAY":0,
    "PAUSE":0,
    "NEXT_TRACK":5,
    "PREVIOUS_TRACK":5,
    "VOLUME_UP":0,
    "VOLUME_DOWN":0
}

# Smoothing counter
gesture_counter = {}
gesture_threshold = 5

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue

    frame = cv2.flip(frame, 1)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    brightened = cv2.convertScaleAbs(rgb_frame, alpha=1.1, beta=20)
    results = hands.process(brightened)

    if results.multi_hand_landmarks:
        for hand_idx, lm in enumerate(results.multi_hand_landmarks):
            hand_label = results.multi_handedness[hand_idx].classification[0].label
            # Flip hand label due to webcam mirror
            hand_label = "Right" if hand_label == "Left" else "Left"
            mp_drawing.draw_landmarks(frame, lm, mp_hands.HAND_CONNECTIONS)
            fingers, index_dir, thumb_dir, hand_label = detect_fingers(lm, 640, 480, hand_label)
            gesture = detect_gesture(fingers, index_dir, thumb_dir, hand_label, lm.landmark)
            current_time = time.time()

            if gesture:
                current_time = time.time()
                gesture_counter[gesture] = gesture_counter.get(gesture, 0) + 1

                if gesture_counter[gesture] >= gesture_threshold:
                    gesture_cooldown = cooldowns.get(gesture, 0)
                    last_trigger = last_trigger_times.get(gesture, 0)
                    is_volume = gesture in ["VOLUME_UP", "VOLUME_DOWN"]

                    # Detect if gesture was re-shown (i.e., came back after being gone)
                    is_new = (gesture != last_gesture)

                    if is_new:
                        print(" Detected Gesture:", gesture)
                        map_action(gesture)
                        last_trigger_times[gesture] = current_time
                        gesture_counter.clear()
                    elif not is_volume and (current_time - last_trigger > gesture_cooldown):
                        print(" Detected Gesture:", gesture)
                        map_action(gesture)
                        last_trigger_times[gesture] = current_time
                        gesture_counter.clear()
                    elif is_volume:
                        print(" Detected Gesture:", gesture)
                        map_action(gesture)
                        last_trigger_times[gesture] = current_time
                        gesture_counter.clear()

                    last_gesture = gesture
                    last_gesture_time = current_time
            else:
                # No gesture in frame → reset state so gesture is treated fresh next time
                gesture_counter.clear()
                last_gesture = None

            if gesture:
                cv2.putText(frame, f'Gesture: {gesture}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Gesture Control", frame)
    if cv2.waitKey(5) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()