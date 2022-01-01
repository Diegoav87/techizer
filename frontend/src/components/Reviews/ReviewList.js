import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

import moment from "moment";

const ReviewList = (props) => {
    return (
        <Box>
            {props.reviews.map((review, index) => {
                return (
                    <Box sx={{ mb: 4 }} key={index}>
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold" component="h6">{review.user.username}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", mb: 1, alignItems: "center" }}>
                            <Rating sx={{ pr: 1 }} value={review.rating} readOnly />
                            <Typography variant="body2" color="textSecondary" component="span">{moment(review.updated_at).fromNow()}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="textSecondary">{review.text}</Typography>
                        </Box>
                    </Box>
                )

            })}

        </Box>
    )
}

export default ReviewList;
