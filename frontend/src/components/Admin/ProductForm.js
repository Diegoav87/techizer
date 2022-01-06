import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import axiosInstance from '../../helpers/axios';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import handleError from '../../helpers/axiosErrorHandler';
import useCategories from '../../hooks/useCategories';

import { useNavigate } from 'react-router-dom';

const ProductForm = (props) => {
    const navigate = useNavigate();
    const categories = useCategories();

    const productData = props.editing ? {
        category: props.product.category.name,
        title: props.product.title,
        description: props.product.description,
        regular_price: props.product.regular_price,
        discount_price: props.product.discount_price,
        weight: props.product.weight,
        stock_count: props.product.stock_count,
    } : {
        category: categories.categories[0].name,
        title: "",
        description: "",
        regular_price: "",
        discount_price: "",
        weight: "",
        stock_count: "",
    }

    const [formData, setFormData] = useState(productData);

    const productFormSchema = yup.object().shape({
        category: yup.string().required("Category is required"),
        title: yup.string().max(255, "Title can't be longer than 255 characters").required("Title is required"),
        description: yup.string().max(1000, "Description can't be longer than 1000 characters").required("Description is required"),
        regular_price: yup.number().max(999, "Regular price can't be more than 999").min(1, "Regular price can't be less than 1").required("Regular price is required"),
        discount_price: yup.number().max(999, "Discount price can't be more than 999").min(1, "Discount price can't be less than 1").required("Discount price is required"),
        weight: yup.number().max(20, "Weight can't be more than 20").min(1, "Weight can't be less than one").required("Weight is required"),
        stock_count: yup.number().required("Stock is required")
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitProduct = (e) => {
        e.preventDefault();

        const url = props.editing ? `products/edit/${props.product.slug}/` : "products/create/";

        productFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    if (props.editing) {
                        axiosInstance
                            .put(url, formData)
                            .then(res => {
                                console.log(res.data);
                                toast.success("Product edited");
                                navigate("/admin/products");
                            })
                            .catch(err => {
                                handleError(err);
                            })
                    } else {
                        axiosInstance
                            .post(url, formData)
                            .then(res => {
                                console.log(res.data);
                                toast.success("Product created");
                                navigate("/admin/products");
                            })
                            .catch(err => {
                                handleError(err);
                            })
                    }
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    return (
        <form>
            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Title</FormLabel>
                        <TextField size="small" value={formData.title} onChange={handleInputChange} type="text" name="title" placeholder="Enter Title" variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} >
                        <FormLabel sx={{ mb: 1 }} component="legend">Category</FormLabel>
                        <Select fullWidth onChange={handleInputChange} size='small' name="category" value={formData.category}>
                            {categories.categories.map(category => {
                                return (
                                    <MenuItem value={category.name}>{category.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Description</FormLabel>
                        <TextField size="small" value={formData.description} onChange={handleInputChange} type="text" name="description" placeholder="Enter Description" variant="outlined" required fullWidth multiline rows={5} />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Regular Price</FormLabel>
                        <TextField size="small" value={formData.regular_price} onChange={handleInputChange} type="number" name="regular_price" placeholder="Enter Regular Price" variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Discount Price</FormLabel>
                        <TextField size="small" value={formData.discount_price} onChange={handleInputChange} type="number" name="discount_price" placeholder="Enter Discount Price" variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Weight</FormLabel>
                        <TextField size="small" value={formData.weight} onChange={handleInputChange} type="number" name="weight" placeholder="Enter Weight" variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Stock</FormLabel>
                        <TextField size="small" value={formData.stock_count} onChange={handleInputChange} type="number" name="stock_count" placeholder="Enter Stock" variant="outlined" required fullWidth />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12} alignSelf={"end"}>
                        <Button variant="contained" fullWidth onClick={submitProduct}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    )
}

export default ProductForm;
