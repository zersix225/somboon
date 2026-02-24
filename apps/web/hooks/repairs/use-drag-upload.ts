import { useState, useRef, DragEvent, ChangeEvent } from "react";

type UploadImage = {
  metaData: File;
  url: string;
};

export const useDragUpload = () => {
  const [image, setImage] = useState<UploadImage[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef(0);

  const addFiles = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const mapped = fileArray.map((file) => ({
      metaData: file,
      url: URL.createObjectURL(file),
    }));

    console.log(files);
    setFile(fileArray);
    console.log(file);
    setImage((prev) => [...prev, ...mapped]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current = 0;
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragRef.current--;
    if (dragRef.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    addFiles(e.target.files);

  const handleDelete = (index: number) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
  };

  const onButtonClick = () => {
    inputFileRef.current?.click();
  };

  return {
    image,
    file,
    setFile,
    isDragging,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDelete,
    onChangeInput,
    inputFileRef,
    onButtonClick,
  };
};
