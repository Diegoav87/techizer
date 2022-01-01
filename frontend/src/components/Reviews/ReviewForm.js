import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import axiosInstance from '../../helpers/axios';
import handleError from '../../helpers/axiosErrorHandler';
import * as yup from "yup";
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ReviewForm = (props) => {
    const auth = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        rating: 0
    });

    const reviewFormSchema = yup.object().shape({
        rating: yup.number().required("Rating is required").min(1, "Rating must be greater than 0").max(5, "Rating can't be more than 5"),
        text: yup.string().max(500, "Your review can not have more than 500 characters").required("Your review is required"),
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const submitReview = (e) => {
        e.preventDefault();

        if (!auth.user) {
            navigate("/login");
            return
        }

        reviewFormSchema
            .validate(formData)
            .then(valid => {
                if (valid) {
                    axiosInstance
                        .post(`products/reviews/${props.product.slug}/`, formData)
                        .then(res => {
                            console.log(res.data);
                            toast.success("Review added");
                            props.getProduct();
                        })
                        .catch(err => {
                            handleError(err);
                        })
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    return (
        <Box>
            <Typography sx={{ mb: 2 }} component="h6" variant="h6" fontWeight={"bold"} color="textPrimary">Write a Review</Typography>
            <form onSubmit={submitReview}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Rating</FormLabel>
                        <Rating value={formData.rating} onChange={(e, value) => {
                            setFormData({ ...formData, rating: value })
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel sx={{ mb: 1 }} component="legend">Review</FormLabel>
                        <TextField onChange={handleInputChange} type="text" name="text" placeholder="Write your review..." variant="outlined" required fullWidth multiline rows={5} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default ReviewForm;
