"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { app } from "../../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";

const Admin = () => {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const metadata = {
    contentType: file?.type,
  };

  const uploadFile = async () => {
    // Get a reference to the storage service, which is used to create references in your storage bucket

    // Create a storage reference from our storage service
    const storageRef = ref(storage, "documents/" + file?.name);

    // Upload file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Register observers to listen for when the upload is finished or fails
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            alert("User does not have permission to access the object");
            break;
          case "storage/canceled":
            // User canceled the upload
            alert("Operation Cancled by User");
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            alert("Unknown error occurred");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            saveInfo(file, downloadURL);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    );
  };

  // const saveInfo = async (file, fileUrl) => {
  //   // const docId = Date.now().toString();

  //   // Add a new document in collection "cities"
  //   await setDoc(doc(db, "uploadedFile", crypto.randomUUID), {
  //     fileName: file?.name,
  //     fileType: file?.type,
  //     fileSize: file?.size,
  //     fileUrl: fileUrl,
  //     userEmail: user?.primaryEmailAddress.emailAddress,
  //     userName: user?.fullName,
  //   });
  // };

  return (
    <section className="grid w-full place-items-center overflow-hidden overflow-y-auto pt-20">
      <div className="mx-auto flex w-[60%] items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 size-12 text-primary-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <p className="mb-2 text-base text-gray-500">
              <span className="font-semibold text-primary-100">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              DOC, DOCX, PPT or PDF (MAX. 10MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>

      {file ? (
        <div className="mt-6 flex items-center gap-6 rounded-lg border border-primary-100 p-3">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-xl font-semibold">{file?.name}</h2>
            <p className="text-sm text-gray-400">
              {file?.type} / {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <X
            onClick={() => setFile(null)}
            className="cursor-pointer text-2xl font-semibold text-red-600"
          />
        </div>
      ) : (
        ""
      )}

      {progress > 0 ? (
        <div class="w-full rounded-full bg-gray-200">
          <div
            class="rounded-full bg-secondary-100 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
            style={{ width: `${progress}%` }}
          >
            {Number(progress).toFixed(0) + "%"}
          </div>
        </div>
      ) : (
        <button
          disabled={!file}
          onClick={() => uploadFile()}
          className="mx-auto mt-6 inline-block rounded-lg bg-primary-200 px-8 py-3 font-semibold text-white disabled:bg-gray-200"
        >
          Upload
        </button>
      )}
    </section>
  );
};
export default Admin;