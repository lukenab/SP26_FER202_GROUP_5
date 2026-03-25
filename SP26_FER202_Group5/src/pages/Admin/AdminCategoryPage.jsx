import { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { getAllCategories, addCategory, updateCategory, deleteCategory, getAllBook } from '../../service/api';
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")

    const fetchCategories = async () => {
        const data = await getAllCategories();
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
        setCategories(sorted);
    }

    useEffect(() => { fetchCategories(); }, [])

    // MODAL STATES
    const [showDelete, setShowDelete] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [editName, setEditName] = useState("")

    const capitalizeWords = (text) => {
        return text
            .toLowerCase()
            .trim()
            .split(" ")
            .filter(word => word !== "")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    // ADD CATEGORY
    const handleAdd = async () => {
        if (!name.trim()) return;
        await addCategory({
            name: capitalizeWords(name).trim(),
        });
        setName("");
        fetchCategories();
    }

    // EDIT CATEGORY
    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setEditName(category.name);
        setShowEdit(true);
    }

    const handleUpdate = async () => {
        if (!editName.trim()) return;
        await updateCategory(selectedCategory.id, {
            id: selectedCategory.id,
            name: capitalizeWords(editName).trim()
        });
        setShowEdit(false);
        fetchCategories();
    }

    // DELETE CATEGORY
    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setShowDelete(true);
    }

    const confirmDelete = async () => {
        const books = await getAllBook(); // lấy danh sách book
        // kiểm tra có book thuộc category này không
        const hasBooks = books.some(
            (book) => Number(book.category_id) === Number(selectedCategory.id)
        )
        if (hasBooks) {
            alert("Cannot delete category because there are books in this category!");
            return;
        }
        await deleteCategory(selectedCategory.id);
        setShowDelete(false);
        fetchCategories();
    }

    return (
        <div className="p-4">
            <h2>Manage Categories</h2>
            <div className="d-flex mb-3">
                <Form.Control
                    placeholder="New category" value={name} onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleAdd();
                        }
                    }} />
                <Button className="ms-2 d-flex align-items-center" onClick={handleAdd}><FiPlus className="me-1" /> Add</Button>
            </div>

            <Table bordered>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((c, index) => (
                        <tr key={c.id}>
                            <td>{index + 1}</td>
                            <td>{c.name}</td>

                            <td>
                                <Button size="sm" variant="warning" onClick={() => handleEditClick(c)}>
                                    <FiEdit className="me-1" /> Edit </Button>

                                <Button size="sm" variant="danger" className="ms-2" onClick={() => handleDeleteClick(c)}>
                                    <FiTrash2 className="me-1" /> Delete </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        value={editName} onChange={(e) => setEditName(e.target.value)}
                        placeholder="Enter category name"
                    />
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

        </div>
    )
}

export default AdminCategoryPage;