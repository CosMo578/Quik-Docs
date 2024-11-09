"use client";
import {
  getStorage,
  ref,
  listAll,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { storage } from '@/app/config/firebase';
const PastQuestions = () => {
  const [allDocs, setAllDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  // Create a reference under which you want to list
  const storageRef = ref(storage, "pastQuestions/");

  useEffect(() => {
    const fileList = [];

    const listFiles = async () => {
      try {
        // List all items (files) in the 'documents/' directory
        const res = await listAll(storageRef);

        // Loop through each item (file)
        for (const itemRef of res.items) {
          // Get file metadata
          const metadata = await getMetadata(itemRef);
          const downloadURL = await getDownloadURL(itemRef);

          // Store file details
          fileList.push({
            name: metadata.name,
            size: metadata.size, // in bytes
            contentType: metadata.contentType,
            timeCreated: metadata.timeCreated,
            downloadURL: downloadURL,
          });
        }

        setAllDocs(fileList);
      } catch (error) {
        console.error("Error listing files:", error);
      }
    };

    listFiles();
  }, [storageRef]);

  useEffect(() => {
    const filterDocuments = () => {
      if (searchValue === "") {
        setFilteredDocs(allDocs); // Show all documents when search is empty
      } else {
        const filtered = allDocs.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setFilteredDocs(filtered);
      }
    };
    filterDocuments();
  }, [searchValue, allDocs]);

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  return (
    <div className="space-y-8 px-10 py-16">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

      <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full max-w-max text-left text-sm text-gray-500 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="w-32 px-6 py-3">
                Course Title
              </th>
              <th scope="col" className="w-32 px-6 py-3">
                Document Size
              </th>
              <th scope="col" className="w-32 px-6 py-3">
                Uploaded At
              </th>
              <th scope="col" className="w-32 px-6 py-3">
                Download
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredDocs?.map((doc, index) => {
              return (
                <tr
                  className="border-b odd:bg-white even:bg-gray-50"
                  key={index + 1 * 3}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium uppercase text-gray-900"
                  >
                    {doc?.name}
                  </th>
                  <td className="px-6 py-4">
                    {(doc?.size / 1024 / 1024).toFixed(2)} MB
                  </td>
                  <td className="px-6 py-4">{formatDate(doc?.timeCreated)}</td>
                  <td className="px-6 py-4">
                    <Link href={doc?.downloadURL}>
                      <button className="flex items-center rounded-lg bg-primary-300 px-6 py-2.5 font-medium text-white hover:bg-primary-500 sm:w-auto">
                        Download
                        <Download className="ms-2" />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};
export default PastQuestions;
