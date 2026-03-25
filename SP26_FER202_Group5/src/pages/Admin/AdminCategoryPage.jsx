import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { getAllCategories, addCategory, updateCategory, deleteCategory, getAllBook } from '../../service/api';

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const fetchCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

    useEffect(() => { fetchCategories(); }, []);

    // ADD CATEGORY
    const handleAdd = async () => {
        if (!name.trim()) return;
        await addCategory({
            name: name.trim(),
        });
        setName("");
        fetchCategories();
    };

    // EDIT CATEGORY
    const handleEdit = async (id) => {
        const newName = prompt("Enter new category name");
        if (!newName || !newName.trim()) return;
        await updateCategory(id, {
            id: id,
            name: newName.trim()
        });
        fetchCategories();
    };

    // DELETE CATEGORY
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this category?");
        if (!confirmDelete) return;
        const books = await getAllBook(); // lấy danh sách book
        // kiểm tra có book thuộc category này không
        const hasBooks = books.some(
            (book) => Number(book.category_id) === Number(id)
        );
        if (hasBooks) {
            alert("Cannot delete category because there are books in this category!");
            return;
        }
        await deleteCategory(id);
        fetchCategories();
    };

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
                <Button className="ms-2" onClick={handleAdd}>Add</Button>
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
                    {categories.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>

                            <td>
                                <Button size="sm" variant="warning" onClick={() => handleEdit(c.id)}>
                                    Edit
                                </Button>
                                <Button size="sm" variant="danger" className="ms-2" onClick={() => handleDelete(c.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminCategoryPage;