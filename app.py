from flask import Flask, render_template, jsonify, url_for, request, redirect
import os
import sys
app = Flask(__name__, static_folder='static', template_folder='templates')

# Home page
@app.route('/')
def index():
    songs = []
    song_folder  = os.path.join(app.static_folder, 'songs')
    cover_folder = os.path.join(app.static_folder, 'covers')

    for filename in os.listdir(song_folder):
        if not filename.lower().endswith('.mp3'):
            continue
        base = os.path.splitext(filename)[0]
        songs.append({
            'name':      base.replace('_', ' ').title(),
            'file_url':  f'songs/{filename}',
            'cover_url': f'covers/{base}.jpg'
        })

    return render_template('index.html', songs=songs)

# About page
@app.route('/about')
def about():
    return render_template('about.html')

# Library page
@app.route('/library')
def library():
    return render_template('library.html')

# Playlist page
@app.route('/playlist', methods=['GET', 'POST'])
def playlist():
    return render_template('playlist.html')  # Mood handled via JS API

@app.route('/api/mood-songs', methods=['POST'])
def mood_songs():
    mood = request.json.get('mood', '').lower()
    folder = os.path.join(app.static_folder, 'music', mood)

    if not os.path.exists(folder):
        return jsonify({'mood': mood, 'songs': [], 'autoplay': None}), 404

    files = [f for f in os.listdir(folder) if f.endswith('.mp3')]
    songs = [
        {
            'title': os.path.splitext(f)[0].replace('_', ' ').title(),
            'file': f'/static/music/{mood}/{f}'
        } for f in files
    ]
    return jsonify({'mood': mood, 'songs': songs, 'autoplay': songs[0]['file'] if songs else None})

@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    emotion = detect()  # Stub: Replace with actual detection
    return redirect(url_for('playlist', mood=emotion))

def detect():
    # Dummy detector for testing
    return 'angry'

# API endpoint for client-side JS
@app.route('/api/songs')
def api_songs():
    songs = []
    song_folder  = os.path.join(app.static_folder, 'songs')
    cover_folder = os.path.join(app.static_folder, 'covers')

    for filename in os.listdir(song_folder):
        if not filename.lower().endswith('.mp3'):
            continue
        base = os.path.splitext(filename)[0]
        songs.append({
            'name':      base.replace('_', ' ').title(),
            'file_url':  f'songs/{filename}',
            'cover_url': f'covers/{base}.jpg'
        })

    return jsonify(songs)

if __name__ == '__main__':
    app.run(debug=True)
