import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, ListGroup, Container, Row, Col } from "react-bootstrap";

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

    // Eliminar un post por ID
  const handleDeletePost = useCallback((id) => {
      fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" })
        .then((response) => response.json())
        .then(() => {
          setPosts(posts.filter((post) => post.id !== id)); // Actualizar el estado local
        })
        .catch((error) => console.error("Error al eliminar post:", error));
    }, [posts]); // No necesitamos volver a definir la función si no cambia
  // Cargar posts desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error al cargar posts:", error));
  }, [handleDeletePost]); // This dependency will trigger useEffect after handleDelete is called

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
        .then(() => {
          setPosts([...posts, newPost]); // Actualizar el estado local
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
  );
}

export default App;
