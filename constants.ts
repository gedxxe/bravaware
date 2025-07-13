
import { Founder } from './types';

export const APP_NAME = "bravaware";
export const ONNX_MODEL_NAME = 'multi_task_unet_dynamic.onnx'; // Ensure this model is in /public (removed leading slash)
export const ONNX_MODEL_PATH = `/${ONNX_MODEL_NAME}`; // Adds leading slash correctly


export const FOUNDERS_DATA: Founder[] = [
  {
    id: "founder1",
    name: "I Gede Bagus Jayendra",
    role: "Founder & Lead AI Developer",
    imageUrl: "/gede.jpg",
    description: "Electrical Engineering Student of UNNES 2022."
  },
  {
    id: "founder2",
    name: "Nasywa Khairunnisa Febriyanka",
    role: "Co-founder & UI/UX Advisor",
    imageUrl: "/nasywa.jpg",
    description: "Education Technology Student of UNNES 2022."
  }
];

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']; // DICOM might need special handling for ONNX
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const CONTACT_INFO = {
  founder1: { // I Gede Bagus Jayendra
    instagram: "https://www.instagram.com/gedebagus_jayendra/",
    linkedin: "https://www.linkedin.com/in/igede/",
    email: "gedeelectro@gmail.com"
  },
  founder2: { // Nasywa Khairunnisa Febriyanka
    instagram: "https://www.instagram.com/huntedbyschafer/",
    linkedin: "http://linkedin.com/in/nasywa-kf",
    email: "nasywafebriyanka79@gmail.com"
  }
};
