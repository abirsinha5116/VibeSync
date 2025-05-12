from flask import Flask, render_template, jsonify, url_for
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# Home page
@app.route('/')
def index():
    songs = []
    song_folder = os.path.join(app.static_folder, 'songs')
    cover_folder = os.path.join(app.static_folder, 'covers')

    for filename in os.listdir(song_folder):
        if filename.endswith('.mp3'):
            base = os.path.splitext(filename)[0]
            cover_filename = base + '.jpg'
            songs.append({
                'name': base.replace('_', ' ').title(),
                'file_url': f'songs/{filename}',
                'cover_url': f'covers/{cover_filename}'
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
@app.route('/playlist')
def playlist():
    return render_template('playlist.html')

# Optional API endpoint if needed
@app.route('/api/songs')
def api_songs():
    songs = []
    song_folder = os.path.join(app.static_folder, 'songs')
    for filename in os.listdir(song_folder):
        if filename.endswith('.mp3'):
            base = os.path.splitext(filename)[0]
            songs.append({
                'name': base.replace('_', ' ').title(),
                'file_url': f'songs/{filename}',
                'cover_url': f'covers/{base}.jpg'
            })
    return jsonify(songs)

if __name__ == '__main__':
    app.run(debug=True)
