from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/ptable')
def ptable():
    return render_template('ptable.html')

@app.route('/lattice/<structure>')
def lattice_structure(structure):
    return render_template('lattice_structure.html', structure=structure)

if __name__ == '__main__':
    app.run(debug=True)
