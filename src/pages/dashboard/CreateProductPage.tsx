// CreateProductPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/FormInputs/TextInput2";
import FileUpload from "../../components/FormInputs/FileUpload";
import { FormikProvider, useFormik } from "formik";
import { useMutation } from "react-query";
import { ProductService } from "../../services/product.service";
import toast from "react-hot-toast";

const CreateProductPage = () => {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission
    };

    const form = useFormik({
        initialValues: {
            name: "",
            description: "",
            weight: "",
            price: "",
            image: "",
        },
        onSubmit: (val: any) => {
            submitClient.mutate(val)
        }
    })

    const submitClient = useMutation(
        async (values: any) => {
            return await ProductService.createProduct(values);
        },
        {
            onSuccess: (response) => {

                form.setSubmitting(false)
                requestAnimationFrame(() => {
                    navigate(-1);
                });

                toast.success("Product created successfull")



            },
            onError: (err: any) => {
                form.setSubmitting(false)
                toast.error(err.response.data.message)

            },
        }
    );

    return (
        <div className="container px-8 mx-auto mt-8">

            <button className="font-bold" onClick={() => navigate(-1)} >Back to Products</button>

            <FormikProvider value={form}>
                <form onSubmit={form.handleSubmit} className="max-w-lg mx-auto">
                    <h1 className="text-3xl font-bold mb-4">Create Product</h1>
                    <div className="mb-4">
                        <TextInput placeholder="product name" name="name" />
                    </div>
                    <div className="mb-4">
                        <TextInput placeholder="product description" name="description" />
                    </div>
                    <div className="mb-4">
                        <TextInput placeholder="product weight" name="weight" />
                    </div>
                    <div className="mb-4">
                        <TextInput placeholder="product price" name="price" />
                    </div>
                    <div className="mb-4">
                        <FileUpload name="image" />
                    </div>
                    <button type="submit" className="bg-black w-full hover:bg-gray-800 text-white px-6 py-3 rounded-lg">
                        Create Product
                    </button>
                </form>
            </FormikProvider>
        </div>
    );
};

export default CreateProductPage;
