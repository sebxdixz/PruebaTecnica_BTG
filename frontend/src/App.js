import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Container, Row, Col } from "react-bootstrap";

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

  // Eliminar un post por ID
  const handleDeletePost = (id) => {
    console.log("Eliminando post con id:", id); // Asegúrate de que el id esté definido
    if (id) { // Verificar que el id no sea undefined o null
      fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then(() => {
          // Actualizar el estado local sin depender de la lista de posts actual
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        })
        .catch((error) => console.error("Error al eliminar post:", error));
    } else {
      console.error("No se proporcionó un id válido para eliminar el post.");
    }
  };

  // Cargar posts desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error al cargar posts:", error));
  }, []); // Solo se ejecuta una vez al montar el componente

  // Crear un nuevo post
  const handleAddPost = () => {
    if (name.trim() && description.trim()) {
      const newPost = { name, description };
      fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          // Asegúrate de que el nuevo post incluya el id
          const postWithId = { ...newPost, id: data.id };
          setPosts((prevPosts) => [...prevPosts, postWithId]); // Añadir el post con id
          setName("");
          setDescription("");
        })
        .catch((error) => console.error("Error al crear post:", error));
    } else {
      alert("Por favor, completa ambos campos antes de agregar un post.");
    }
  };

  // Manejar el filtro
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtrar posts
  const filteredPosts = posts.filter(
    (post) =>
      post.name.toLowerCase().includes(filter.toLowerCase()) ||
      post.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-light p-4 rounded shadow-sm vh-100" style={{backgroundColor: '#FAF9F6'}}>
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="text-center">Gestión de Posts</h1>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre del Post</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción del Post</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Ingresa la descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="me-2" onClick={handleAddPost}>
              Crear Post
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Filtrar posts por nombre o descripción"
            value={filter}
            onChange={handleFilterChange}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>Lista de Posts:</h5>
          {filteredPosts.length > 0 ? (
            <ListGroup>
              {filteredPosts.map((post) => (
                <ListGroup.Item key={post.id}>
                  <h6>{post.name}</h6>
                  <p>{post.description}</p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Eliminar
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No hay posts disponibles.</p>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
