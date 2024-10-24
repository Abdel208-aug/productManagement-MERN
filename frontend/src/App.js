import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Card, CardContent, Typography, Grid, Box, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: 0, description: '', quantity: 0 });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);



  const handleDialogOpen = (action) => {
    setDialogAction(action);
    setDialogOpen(true);
  };

  const handleDialogClose = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      if (dialogAction === 'addOrUpdate') {
        addOrUpdateProduct();
      } else if (dialogAction === 'delete') {
        deleteProduct(currentProductId);
      }
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOrUpdateProduct = () => {
    if (form.price <= 0) {
      alert('Price must be a positive number');
      return;
    }

    if (editMode) {
      /* Modifier un produit */
      axios.put(`http://localhost:8080/products/${currentProductId}`, form)
        .then(res => {
          setProducts(products.map(p => (p._id === currentProductId ? res.data : p)));
          setSnackbar({ open: true, message: 'Product updated successfully!', severity: 'success' });
          resetForm();
        })
        .catch(err => {
          console.error(err);
          setSnackbar({ open: true, message: 'Error updating product.', severity: 'error' });
        });
    } else {
      /* Ajouter un produit */
      axios.post('http://localhost:8080/products', form)
        .then(res => {
          setProducts([...products, res.data]);
          setSnackbar({ open: true, message: 'Product added successfully!', severity: 'success' });
        })
        .catch(err => {
          console.error(err);
          setSnackbar({ open: true, message: 'Error adding product.', severity: 'error' });
        });
    }
  };

  const editProduct = (product) => {
    setForm(product);
    setEditMode(true);
    setCurrentProductId(product._id);
  };

  const resetForm = () => {
    setForm({ name: '', price: 0, description: '', quantity: 0 });
    setEditMode(false);
    setCurrentProductId(null);
  };

  /* Supprimer un produit */
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
        setSnackbar({ open: true, message: 'Product deleted successfully!', severity: 'success' });
      })
      .catch(err => {
        console.error(err);
        setSnackbar({ open: true, message: 'Error deleting product.', severity: 'error' });
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDialogOpen('addOrUpdate');
  }
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Product Management
      </Typography>

      <Box component="form" onSubmit={handleFormSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color={editMode ? "secondary" : "primary"} sx={{ mt: 2 }}>
          {editMode ? 'Update Product' : 'Add Product'}
        </Button>
        {editMode && (
          <Button variant="outlined" color="default" onClick={resetForm} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{product.name}</Typography>
                <Typography>{product.description}</Typography>

                <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold', mt: 1 }}>
                  Price: ${product.price.toFixed(2)}
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: product.quantity > 0 ? 'blue' : 'red', 
                    fontWeight: 'bold',
                    mt: 1 
                  }}
                >
                  {product.quantity > 0 ? `Quantity: ${product.quantity}` : "Rupture de stock"}
                </Typography>

                <Button 
                  variant="outlined" 
                  color="secondary" 
                  startIcon={<EditIcon />} 
                  onClick={() => editProduct(product)} 
                  sx={{ mt: 1 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<DeleteIcon />} 
                  onClick={() => { setCurrentProductId(product._id); handleDialogOpen('delete'); }} 
                  sx={{ mt: 1, ml: 1 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>{"Confirm Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {dialogAction === 'delete' ? 'delete this product?' : editMode ? 'update this product?' : 'add this product?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;