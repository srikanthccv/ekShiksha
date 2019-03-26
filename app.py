from flask import Flask, render_template

application = Flask(__name__)


@application.route('/')
def home():
    return render_template('home.html')


@application.route('/ptable')
def ptable():
    return render_template('ptable.html')


@application.route('/lattice/<structure>')
def lattice_structure(structure):
    return render_template('lattice_structure.html', structure=structure)


@application.route('/geometry/<model>')
def geometric_model(model):
    return render_template('geometric_model.html', model=model)


if __name__ == '__main__':
    application.run(host='0.0.0.0')
