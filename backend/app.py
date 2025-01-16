from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import inflection  # Para convertir entre snake_case y camelCase

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost:3306/posts_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo de Post
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)

# Crear las tablas en la base de datos (solo la primera vez)
with app.app_context():
    db.create_all()

# Función para convertir dict de snake_case a camelCase
def to_camel_case(data):
    if isinstance(data, list):  # Si es una lista, aplica recursivamente
        return [to_camel_case(item) for item in data]
    elif isinstance(data, dict):  # Si es un diccionario, convierte las claves
        return {inflection.camelize(key, False): to_camel_case(value) for key, value in data.items()}
    else:  # Si no es lista ni dict, retorna el valor tal cual
        return data

# Ruta para obtener todos los posts
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    response = [{'id': post.id, 'name': post.name, 'description': post.description} for post in posts]
    return jsonify(to_camel_case(response))  # Convierte las claves a camelCase

# Ruta para crear un nuevo post
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json  # El frontend envía datos en camelCase
    new_post = Post(
        name=data['name'],
        description=data['description']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post creado correctamente'})

# Ruta para eliminar un post por ID
@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post eliminado correctamente'})
    return jsonify({'message': 'Post no encontrado'}), 404

if __name__ == '__main__':
    app.run(debug=True)
