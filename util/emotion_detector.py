import os
import time
import cv2
from ultralytics import YOLO

# Load the trained YOLO model
model = YOLO(r"C:\Users\Dell\Desktop\IC_Prod\VibeSync\util\best.pt")

# Initialize webcam
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # 0 means the default camera

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

# Define the emotions we're interested in
emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

# Initialize a dictionary to accumulate the confidence scores and counts
emotion_stats = {emotion: {"total": 0.0, "count": 0} for emotion in emotion_labels}

# Set a 3 minute (180 seconds) timer
start_time = time.time()
duration = 30  # seconds

while True:
    success, img = cap.read()
    if not success:
        print("Error: Could not read frame.")
        break

    # Use the YOLO model to make predictions on the current frame
    results = model(img)

    # Iterate over the results and update emotion statistics
    for result in results:
        # Retrieve the top predicted class and its confidence
        class_id = result.probs.top1        # Assumed to be the index for the top prediction
        confidence = result.probs.top1conf    # Confidence score for the prediction
        class_name = result.names[class_id]   # Obtain the class (emotion) name

        # Create a label and display it on the frame
        label = f"{class_name} {confidence*100:.2f}%"
        cv2.putText(img, label, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        # Update the statistics for the recognized emotion if it's in our list
        if class_name in emotion_stats:
            emotion_stats[class_name]["total"] += confidence
            emotion_stats[class_name]["count"] += 1

    # Show the live feed
    cv2.imshow("Live Feed", img)

    # Exit loop if 'q' is pressed
    if cv2.waitKey(1) == ord('q'):
        break

    # Check if 3 minutes have elapsed
    if time.time() - start_time >= duration:
        break

# Release the webcam and close the windows
cap.release()
cv2.destroyAllWindows()

# Calculate the average confidence for each emotion
avg_emotions = {}
for emotion, stats in emotion_stats.items():
    if stats["count"] > 0:
        avg_emotions[emotion] = stats["total"] / stats["count"]
    else:
        avg_emotions[emotion] = 0.0


results = model(img, verbose=False)

# Identify the emotion with the highest average confidence score
dominant_emotion = max(avg_emotions, key=avg_emotions.get)

# Final result should be only the mood
print(dominant_emotion)
