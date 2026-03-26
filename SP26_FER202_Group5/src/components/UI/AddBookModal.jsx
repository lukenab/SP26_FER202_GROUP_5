import React, { useState } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap'
const AddBookModal = ({show, onClose, onAdd, ListCategory, ListBook}) => {
    
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const handleUploadImage =(e) =>{
        const file = e.target.files[0];
        if(file) {
            const path = `/images/${file.name}`;
            setFileName(file.name)
            setNewBook({
                ...newBook,
                image:path
            });
        }
    }
    const[newBook, setNewBook] = useState({
        id:"",
        title:"",
        author:"",
        country:"",
        price:"",
        image: "",
        category_id: "",
        publication_year: "",
        stock: "",
        description: ""
    })

    const handleChange =(e)=>{
        setError("");
        setNewBook({
            ...newBook,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const priceNumber = Number(newBook.price.replace("$", ""));
        const stockNumber = Number(newBook.stock);
        const yearNumber = Number(newBook.publication_year);
        const currentYear = new Date().getFullYear();

        // publication ko được lớn hơn năm hiện tại
        if(yearNumber > currentYear) {
        setError("Publication year cannot be in the future!")
        return;
        }
        if(stockNumber <= 0) {
        setError("Stock must be positive number!");
        return;
        }

        // check them sach cung. neu cung sach => + stock, nguoc lai them moi
        const existingBook = ListBook.find((b)=>
            b.title.trim().toLowerCase() === newBook.title.trim().toLowerCase() &&
            b.author.trim().toLowerCase() === newBook.author.trim().toLowerCase()
        )
        if(existingBook) {
            const updatedBook = {
                ...existingBook,
                ...newBook,
                id: existingBook.id.toString(),
                stock: Number(existingBook.stock) + stockNumber,
                price:`$${priceNumber}`
            }
            onAdd(updatedBook, true)  // true = update stock
            console.log("ID gửi lên:", newBook.id);
console.log("Type:", typeof newBook.id);
            onClose();
            //reset form sau khi add
            setNewBook({
                    id:"",
                    title:"",
                    author:"",
                    country:"",
                    price:"",
                    image:"",
                    category_id:"",
                    publication_year:"",
                    stock:"",
                    description:""
                });
        return;
        }
        // nếu chưa tồn tại => add mới
        const newId = ListBook.length > 0 ? Math.max(...ListBook.map(b => Number(b.id))) + 1 : 1;
        
        // cho ngta nhap so roi => chuyen string add vao db.json
        const priceString = `$${priceNumber}`;
        const bookToAdd = {
            ...newBook,
            id:newId.toString(),
            price: priceString
        }
        onAdd(bookToAdd, false);
        onClose();
    }
return (
    <>
    <Modal show={show} onHide={onClose} size="lg" scrollable>
        <Modal.Header closeButton> <h4>Add Book</h4> </Modal.Header>

        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-2'>
                <Form.Label className='fw-bold'>Title</Form.Label>
                <Form.Control  name="title" placeholder='Enter Title Book'  onChange={handleChange} required/>
            </Form.Group>

            <div className='d-flex justify-content-between mb-2 gap-2'>
                <Form.Group className='w-100'>
                    <Form.Label className='fw-bold'>Author</Form.Label>
                    <Form.Control name="author" placeholder='Enter the name of Author' onChange={handleChange}required />
                </Form.Group>

                <Form.Group className='w-100'>
                    <Form.Label className='fw-bold'>Country</Form.Label>
                    <Form.Control name="country" placeholder='Enter Country' onChange={handleChange} required/>
                </Form.Group>
            </div>

            <div className='d-flex justify-content-between mb-2 gap-2'>
                <Form.Group className='w-100'>
                    <Form.Label className='fw-bold'>Price</Form.Label>
                    <Form.Control name="price" placeholder='Enter Price' min="0" type='Number' onChange={handleChange} required/>
                </Form.Group>

                <Form.Group className='w-100'>
                    <Form.Label className='fw-bold'>Stock</Form.Label>
                    <Form.Control name="stock" placeholder='Enter Stock' min="0" type='Number' onChange={handleChange} required/>
                </Form.Group>
            </div>
            
            <div className='d-flex justify-content-between mb-2 gap-2'>
                <Form.Group className='w-100'>
                    <Form.Label className='fw-bold'>Category</Form.Label>
                    <Form.Select name="category_id" onChange={handleChange}>
                        <option value="">Choose Category</option>
                        {ListCategory.map((cate)=>(
                            <option key={cate.id} value={cate.id}>
                                {cate.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className='w-100'>
                        <Form.Label className='fw-bold'>Year of Publication</Form.Label>
                        <Form.Control name="publication_year" placeholder='Enter Year of publication of the book' onChange={handleChange} required/>
                </Form.Group>
            </div>

            <Form.Group className='mb-2'>
                <Form.Label className='fw-bold'>Description</Form.Label>
                <Form.Control name="description"  as="textarea" rows={3} placeholder="Enter book description..." onChange={handleChange} required/>
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label className='fw-bold'>Upload image file</Form.Label>
                <Form.Control type='file' accept="image/*" name='image' onChange={handleUploadImage} required />
            </Form.Group>
            {error !== "" ? (<Alert variant="danger"> {error}  </Alert>): ""}
            <Button style={{ background: '#1e3d52', border: "none" }} type='submit' className='mt-3'>Add Book</Button>
          
        </Form>
        </Modal.Body>
    </Modal>

    </>
  )
}

export default AddBookModal
