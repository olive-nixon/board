import Button from "@components/shared/Button"
import TextInput from "@components/shared/TextInput";
import { useBoards } from "@src/context";
import { FieldArray, Form, Formik } from "formik"
import * as Yup from 'yup';
import { useEffect, useRef, useState } from "react";

const AddNewBoardModal = ({onClose}) => {
    const { createBoard } = useBoards();

    const [isBrowser, setIsBrowser] = useState(false);
    const closeOnEscapeKeyDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    };
  
    useEffect(() => {
      setIsBrowser(true);
      document.body.addEventListener("keydown", closeOnEscapeKeyDown);
      return () => {
        document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
      };
    }, []);

    const validate = Yup.object({
        name: Yup.string().required("Can't be empty"),
        columns: Yup.array().of(
                Yup.string().required("Can't be empty"),
        )
    })


    return (
        <Formik
        initialValues={{
            name: "",
            columns: ['Todo', 'Doing'],
        }}
        validationSchema={validate}
        onSubmit={ (values) => {
            createBoard(values);
            onClose();
        }}
        >
        { formik => (
                <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
                    <h1 className="heading-lg mb-6">Add New Board</h1>
                    <Form>
                        <TextInput label="Board Name" name="name" type="text" placeholder="e.g. Web Design" />

                        <label className="body-md capitalize text-mediumGrey dark:text-white mt-6 block">
                            Board Columns
                        </label>

                        <FieldArray name="columns"
                            render={arrayHelpers => (
                                <div>
                                    <div className="scrollbar-thin scrollbar-thumb-mainPurple scrollbar-track-transparent overflow-y-scroll h-[120px]">
                                    {formik.values.columns.map((_, i) => (
                                        <div key={i} className="flex">
                                            <TextInput name={`columns[${i}]`} type="text" placeholder="e.g. Archived"/>
                                            <Button onClick={() => arrayHelpers.remove(i)} className="text-mediumGrey hover:text-mainRed ml-4">
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="currentColor" fillRule="evenodd">
                                                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/>
                                                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/>
                                                    </g>
                                                </svg>
                                            </Button>
                                        </div>
                                    ))}
                                    </div>
                                <Button onClick={() => arrayHelpers.push('')}
                                className="w-full bg-mainPurple bg-opacity-10 text-mainPurple font-bold rounded-full p-2 pt-3 mt-3 transition duration-200 hover:bg-opacity-25 dark:bg-opacity-100 dark:bg-white">+ Add New Column</Button>
                                </div>
                            )}
                        />

                        <Button type="submit" className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover">Create New Board</Button>

                    </Form>
                </div>
        )}
        </Formik>
      )
}
export default AddNewBoardModal
