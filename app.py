import os
import random
import subprocess
import sys
from flask import Flask, render_template, request, jsonify, url_for

app = Flask(__name__)

def get_songs_for_mood(mood):
    music_dir = os.path.abspath(os.path.join(app.static_folder, 'music', mood))
    try:
        files = [f for f in os.listdir(music_dir) if f.lower().endswith('.mp3')]
    except FileNotFoundError:
        files = []
    songs = [
        {
            'title': os.path.splitext(fname)[0].replace('_', ' ').title(),
            'file': url_for('static', filename=f'music/{mood}/{fname}')
        }
        for fname in files
    ]
    return songs


@app.route('/')
def home():
    return render_template('Playlist.html', mood='', songs=[], autoplay=None)

@app.route('/playlist.html', methods=['POST'])
def playlist():
    mood = request.form.get('mood')
    songs = get_songs_for_mood(mood)
    autoplay_url = random.choice(songs)['file'] if songs else None
    return render_template('Playlist.html', mood=mood, songs=songs, autoplay=autoplay_url)

@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    result = subprocess.run([sys.executable, 'emotion_detector.py'], capture_output=True, text=True)
    print("RAW OUTPUT:", result.stdout)
    mood = result.stdout.strip().split('\n')[-1].lower()
    songs = get_songs_for_mood(mood)
    autoplay_url = random.choice(songs)['file'] if songs else None
    return jsonify({'mood': mood, 'songs': songs, 'autoplay': autoplay_url})

if __name__ == '__main__':
    app.run(debug=True)