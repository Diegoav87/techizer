import { toast } from "react-toastify";

const handleError = (err) => {
    console.log(err.response);

    if (err.response.status === 400) {
        if (typeof err.response?.data === "string") {
            toast.error(err.response.data);
        } else {
            if (Object.keys(err.response.data).includes("errors")) {
                Object.keys(err.response?.data.errors).forEach(key => {
                    err.response.data.errors[key].forEach(error => {
                        toast.error(error);
                    })
                })
            } else {
                Object.keys(err.response?.data).forEach(key => {
                    err.response.data[key].forEach(error => {
                        toast.error(error);
                    })
                })
            }

        }
    } else {
        toast.error("Something went wrong, please try again later")
    }


}

export default handleError;