import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';


import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import uploadPlaceholder from '../../assets/img/default-placeholder.png'

const MultipleImageUpload = (props) => {
    const [featuredImgId, setFeaturedImgId] = useState("");

    const selectFile = (e) => {
        if (e.target.files.length > props.maxFileLength) {
            toast.error(`You can't add more than ${props.maxFileLength} images per product`);
            return;
        }

        const newFiles = [...props.files];

        console.log(newFiles);

        for (let i = 0; i < e.target.files.length; i++) {
            let fileSize = e.target.files[i].size;
            fileSize = Math.round(fileSize / 1024);

            if (fileSize > 5000) {
                toast.error("Max file size is 5mb");
                return;
            }

            if (newFiles.length < props.maxFileLength) {
                newFiles.push({
                    file: e.target.files[i],
                    preview: URL.createObjectURL(e.target.files[i]),
                    id: uuid(),
                    is_feature: false
                })
            } else {
                toast.error(`You can't add more than ${props.maxFileLength} images per product`);
                break;
            }

        }

        props.setFiles(newFiles);
    }

    const deleteFile = (id) => {
        let newFiles = [...props.files];
        newFiles = newFiles.filter(file => file.id !== id);
        props.setFiles(newFiles);
    }

    const setFeaturedImage = (e) => {
        setFeaturedImgId(e.target.value);
        const newFiles = props.files.map(file => {
            if (file.id === e.target.value) {
                const newFile = {
                    ...file,
                    is_feature: true
                }
                return newFile;
            } else {
                const newFile = {
                    ...file,
                    is_feature: false
                }
                return newFile;
            }
        });
        props.setFiles(newFiles);
    }

    return (
        <div>
            <input
                onChange={selectFile}
                accept="image/*"
                style={{ display: "none" }}
                type="file"
                id="file-upload"
                multiple
            />
            <label htmlFor="file-upload">
                <p style={{ color: "#d23f57" }}>Click here to add images</p>
            </label>
            <RadioGroup value={featuredImgId} onChange={setFeaturedImage}>
                <Grid container spacing={2}>
                    {[...Array(props.maxFileLength).keys()].map(number => {
                        const currentFile = props.files[number];

                        return (
                            <Grid item xs={12} sm={4} md={4}>
                                {typeof currentFile === 'undefined' ? (
                                    <Paper variant="outlined">
                                        <img className="upload-preview" src={uploadPlaceholder} />
                                    </Paper>
                                ) : (
                                    <React.Fragment>
                                        <Paper variant="outlined" style={{ position: "relative" }}>
                                            <HighlightOffIcon
                                                onClick={() => deleteFile(currentFile.id)}
                                                color="error"
                                                style={{ position: "absolute", left: "90%", top: "10px" }}
                                            />
                                            <img className="upload-preview" src={currentFile.preview} />
                                        </Paper>
                                        <Box sx={{ mt: 1 }}>
                                            <FormControlLabel control={<Radio value={currentFile.id} />} label="Set as featured image" />
                                        </Box>
                                    </React.Fragment>
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
            </RadioGroup>
        </div>
    )
}

export default MultipleImageUpload;
