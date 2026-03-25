import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Badge } from "react-bootstrap";
import { getAllCategories, addCategory, updateCategory, deleteCategory, getAllBook } from '../../service/api';
import { FiEdit, FiTrash2, FiPlus, FiEye } from "react-icons/fi";

const AdminCategoryPage = () => {
    // State
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [books, setBooks] = useState([])
    const [showView, setShowView] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [addDescription, setAddDescription] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [status, setStatus] = useState("Active")
    const [search, setSearch] = useState('');
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [editName, setEditName] = useState("")
    const [editStatus, setEditStatus] = useState("Active")

    // Function
    const fetchCategories = async () => {
        const data = await getAllCategories()
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
        setCategories(sorted)
    }
    const fetchBooks = async () => {
        const data = await getAllBook()
        setBooks(data)
    }

    useEffect(() => {
        fetchCategories()
        fetchBooks()
    }, [])

    const handleViewClick = (category) => {
        setSelectedCategory(category)
        setShowView(true)

    }

    const capitalizeWords = (text) => {
        return text
            .toLowerCase()
            .trim()
            .split(" ")
            .filter(word => word !== "")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    // ADD CATEGORY
    const handleAdd = async () => {
        if (!name.trim()) return
        await addCategory({
            name: capitalizeWords(name).trim(),
            description: addDescription.trim(),
            status: status

        })
        setName("")
        setAddDescription("")
        setStatus("Active")
        setShowAdd(false)
        fetchCategories()
    }


    // EDIT CATEGORY
    const handleEditClick = (category) => {
        setSelectedCategory(category)
        setEditName(category.name)
        setEditDescription(category.description || "")
        setEditStatus(category.status || "Active")
        setShowEdit(true)
    }
    //Update
    const handleUpdate = async () => {
        if (!editName.trim()) return
        await updateCategory(selectedCategory.id, {
            id: selectedCategory.id,
            name: capitalizeWords(editName).trim(),
            description: editDescription.trim(),
            status: editStatus
        });
        setShowEdit(false)
        fetchCategories()
    }

    // DELETE CATEGORY
    const handleDeleteClick = (category) => {
        setSelectedCategory(category)
        setShowDelete(true)
    }

    const confirmDelete = async () => {
        const books = await getAllBook()

        const hasBooks = books.some(
            (book) => Number(book.category_id) === Number(selectedCategory.id)
        )
        if (hasBooks) {
            alert("Cannot delete category because there are books in this category!");
            setShowDelete(false)
            return
        }
        await deleteCategory(selectedCategory.id);
        setShowDelete(false)
        fetchCategories()
    }

    const filteredCategory = categories.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4">
            <h2>Manage Categories</h2>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <Button variant="primary" className="mb-3 d-flex align-items-center" onClick={() => setShowAdd(true)}> <FiPlus className="me-1" />Add Category</Button>

                <div className="search-box">
                    <Form.Control
                        type="text"
                        placeholder="Search category name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
            </div>

            <div className="table-wrapper">
                <Table bordered className="custom-table">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Books</th>
                            <th>Status</th>
                            <th>Category Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCategory.map((c, index) => (
                            <tr key={c.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>{c.name}</td>
                                <td className="text-center">
                                    {books.filter(book => Number(book.category_id) === Number(c.id)).length}
                                </td>

                                <td className="text-center">
                                    <Badge bg={c.status === "Active" ? "success" : "secondary"}>{c.status}</Badge>
                                </td>
                                <td>
                                    {c.description?.length > 40 ? c.description.slice(0, 40) + "..." : c.description}
                                </td>
                                <td className="d-flex justify-content-center gap-2">
                                    <Button size="sm" variant="info" className="me-1 d-flex align-items-center" onClick={() => handleViewClick(c)}> <FiEye className="me-1" /> View </Button>
                                    <Button size="sm" variant="warning" className="me-1 d-flex align-items-center" onClick={() => handleEditClick(c)}> <FiEdit className="me-1" /> Edit </Button>
                                    <Button size="sm" variant="danger" className="d-flex align-items-center" onClick={() => handleDeleteClick(c)}> <FiTrash2 className="me-1" /> Delete </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Add Modal */}
            <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter category name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={addDescription} onChange={(e) => setAddDescription(e.target.value)} placeholder="Enter category description" />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAdd(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter category name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Enter description" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}> Cancel </Button>
                    <Button variant="primary" onClick={handleUpdate}> Update </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the category{" "} <strong>{selectedCategory?.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}> Cancel </Button>
                    <Button variant="danger" onClick={confirmDelete}> Delete </Button>
                </Modal.Footer>
            </Modal>

            {/* View Modal */}
            <Modal show={showView} onHide={() => setShowView(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCategory?.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <p>
                            <b>Books:</b>{" "}
                            {books.filter(book => Number(book.category_id) === Number(selectedCategory?.id)).length}
                        </p>

                        <p>
                            <b>Status:</b>{" "}
                            <Badge bg={selectedCategory?.status === "Active" ? "success" : "secondary"}>{selectedCategory?.status}</Badge>
                        </p>

                        <p>
                            <b>Description: </b>{selectedCategory?.description}
                        </p>

                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default AdminCategoryPage;